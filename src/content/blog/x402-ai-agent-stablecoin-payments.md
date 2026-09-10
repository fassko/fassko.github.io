---
date: 2026-09-10 00:00
updated: 2026-09-10 00:00
title: "What is x402? How I charged a weather API in stablecoins so an AI agent could pay"
tags: x402, AI agents, stablecoins, web3, flare
description: "x402 turns HTTP 402 into a payment handshake. I used it on Flare so an AI agent could pay per weather API call in an ERC-20, with the API key locked inside a TEE."
faq:
  - question: What is x402?
    answer: "x402 is an open protocol that reuses HTTP 402 Payment Required for on-chain payments. A server returns 402 with price, token, and payee. The client pays, retries the request, and gets 200. It is meant for APIs and AI agents that cannot walk through a card checkout."
  - question: How does an AI agent pay with x402?
    answer: "The agent is just an HTTP client. It calls a paid route, reads the 402 body, signs or approves the ERC-20 spend, and retries. In the weather insurance demo the same tools are exposed as an in-app chat agent and as an MCP server at /api/mcp, so Cursor or Claude Code can pay the same way."
  - question: Do x402 payments use stablecoins?
    answer: "Usually yes. The protocol is token-agnostic, but stablecoins are the practical unit because an agent needs a predictable price per call. On this Flare demo the per-call fee is any ERC-20 you configure, including test USDT0 or FXRP. Premiums and payouts use a separate pay token."
  - question: Why put the weather API key in a TEE?
    answer: "OpenWeatherMap still requires a secret. If that key sits in a Next.js route, anyone who reads the server can drain the quota. Flare Confidential Compute keeps the key in the enclave. The TEE only calls the API after it sees a FeeCollected event on-chain."
  - question: Is this the same as Coinbase x402 with EIP-3009?
    answer: "Same idea, different settlement. The Coinbase spec and the Flare Hardhat starter settle with EIP-3009 transferWithAuthorization, which is gasless for the payer. This insurance demo uses HTTP 402 as a pre-check, then feeToken.approve and transferFrom in the same contract transaction as getWeather."
---

x402 is an open payment protocol that reuses the long-idle HTTP 402 Payment Required status. When a client asks for a paid resource, the server answers 402 with the price, the token, and who to pay. The client pays on-chain, retries, and gets 200. That handshake is useful for APIs and for AI agents, because neither of them can click through Stripe.

I wanted that for a real call, not a `/premium-data` stub. The demo is [parametric rainfall insurance on Flare](/projects/x402-agent/): an agent pays per weather fetch, a TEE checks the payment, then OpenWeatherMap runs with the API key still inside the enclave.

## What is x402?

x402 takes the HTTP status that was reserved for "Payment Required" and makes it a machine-readable invoice. The original [x402 spec](https://x402.org/) and [Flare's walkthrough](https://dev.flare.network/fxrp/token-interactions/x402-payments) use EIP-3009 (`transferWithAuthorization`) so the payer signs off-chain and a facilitator settles. No gas for the buyer, unique nonces, stablecoins as the unit.

The pattern is always:

1. Client requests a protected resource.
2. Server returns **402** with what it will accept (scheme, network, amount, token, payee).
3. Client pays, or proves it already paid.
4. Client retries. Server returns **200** and the resource.

An AI agent can do those four steps. A human checkout form cannot be called from a tool loop.

## The demo: weather in, insurance out

The dApp lives in a [Flare Confidential Compute](https://dev.flare.network/fcc/overview) extension. Buy a rainfall policy for a city. Fetch live weather. Settle against OpenWeatherMap inside the TEE. Premiums and payouts are ERC-20.

Two extra pieces sit on top:

- An **x402 gateway** as Next.js routes at `/x402/weather/fetch` and `/x402/weather/settle`.
- An **insurance assistant** (OpenAI tool calling) plus an **MCP server** at `/api/mcp`, so the same paid tools work from the UI, Cursor, or Claude Code.

`getWeather` and `requestSettlement` are `onlyGateway`. The browser never talks to those functions directly. The gateway wallet is the only address the contract trusts.

## How the 402 handshake actually moves tokens

HTTP 402 in this repo is a **pre-check**. `approve` only sets allowance. Tokens move later, on Coston2, in the same transaction as `getWeather` / `requestSettlement`, via `feeToken.transferFrom`. The TEE does not take the money. It waits for `FeeCollected`, then calls OpenWeatherMap.

That is the important split:

| Layer | What it does | What it does not do |
| --- | --- | --- |
| HTTP 402 | Tells the client the fee and blocks the retry until allowance is enough | Transfer tokens |
| `feeToken.approve` | Lets the contract pull the fee | Charge the call |
| `transferFrom` | Pulls the ERC-20 from the payer in the same tx as `getWeather` | Talk to OpenWeatherMap |
| TEE | Verifies `FeeCollected`, holds the API key, fetches weather | Settle the payment |

The fetch looks like this:

1. Client `POST /x402/weather/fetch` with city and payer.
2. Gateway reads `fetchFee`. If allowance is short, it returns **402**.
3. Wallet calls `approve` on the fee token. No transfer yet.
4. Client retries the same POST.
5. Gateway sends `getWeather(city, payer)`.
6. The contract runs `_collectFee` (`transferFrom`) in that transaction.
7. The FETCH instruction enters FCC. The enclave checks `FeeCollected`.
8. The enclave calls OpenWeatherMap over HTTPS and returns a signed report.

Settle is the same loop against `/x402/weather/settle` and `requestSettlement`. The later `settle()` confirmation does not charge again.

The per-call fee is any ERC-20 you set (`setFeeToken` / `setFetchFee` / `setSettleFee`). In practice that is a test USDT0 or FXRP. Policy premiums use a separate `PAY_TOKEN` (WPT on Coston2 in the sample env).

## API keys vs Stripe vs x402

| | API key | Stripe / cards | x402 |
| --- | --- | --- | --- |
| Who can pay | Whoever holds the secret | A human with a browser | Any HTTP client with a wallet |
| Unit | Monthly quota | Fiat, invoices, 3DS | ERC-20, usually a stablecoin |
| Per-call price | Awkward | Fees eat micropayments | Native |
| Secrets | Key in env or client | PCI + customer accounts | Key can stay in a TEE |
| Agent-friendly | Poor (key sharing) | Poor (no card for the agent) | Designed for it |

I still [reset ERC-20 allowances](/blog/solidity-erc-20-approve/) before bumping them. The 402 retry in this demo is the same `approve` footgun, just with an agent driving the wallet.

## Gasless x402 on Flare (EIP-3009)

If you want the payer to sign and not send a gas transaction, use the [Flare Hardhat x402 guide](https://dev.flare.network/fxrp/token-interactions/x402-payments). That path deploys MockUSDT0 (EIP-3009) and an `X402Facilitator`. The client puts a signed authorization in an `X-Payment` header. The server calls `settlePayment()`, which runs `transferWithAuthorization`.

FXRP is not on that path yet. The docs say it needs `transferWithAuthorization` first.

I used `approve` + `transferFrom` in the insurance extension because the fee has to be atomic with `getWeather`. The gateway already pays gas. The TEE needs an on-chain event it can attest, not only an HTTP header.

## The agent

Once the routes exist, the model does not need a special "crypto SDK". It needs tools:

- read pool stats
- fetch TEE weather (paid)
- list / buy policies
- request settlement (paid)

Those tools hit the same gateway the UI uses. Point Cursor at `http://localhost:3000/api/mcp` and the agent is a payer.

That is the part I keep repeating in workshops: **agents need a payment rail and a place to keep secrets**. x402 is the rail. The TEE is the place.

## What broke

OpenWeatherMap's One Call `day_summary` is often slower than the 2s window tee-node allows for a synchronous extension response. FETCH and SETTLE had to go async, with a longer timeout, or settlement just died with `context deadline exceeded`.

cloudflared quick tunnels change hostname on every restart. `EXT_PROXY_URL` and `register-tee` have to be redone or the TEE is registered to a dead URL.

The indexer DB credentials are chain-specific. Mix Coston and Coston2 and the proxy never sees instruction responses, so `test.sh` fails after a "successful" fetch.

Demo only. A production weather oracle would not trust a single API.

## TL;DR

x402 is HTTP 402 plus an on-chain pay-and-retry. I wired it to a Flare weather-insurance extension so an AI agent can pay per API call in an ERC-20. The TEE will not talk to OpenWeatherMap until `FeeCollected` is on-chain, which keeps the API key out of the app server. The Coinbase-style flow settles with EIP-3009; this demo settles with `transferFrom` in the same transaction as the gated call.

Code: [flare-foundation/fce-weather-insurance-x402-agent](https://github.com/flare-foundation/fce-weather-insurance-x402-agent).

## Links

* [x402 weather insurance agent (project page)](/projects/x402-agent/)
* [x402 weather insurance agent (source)](https://github.com/flare-foundation/fce-weather-insurance-x402-agent)
* [Flare Builder workshop: Paid AI APIs with x402](https://www.youtube.com/watch?v=Kk5vuiGZGto)
* [x402 on Flare (EIP-3009 starter)](https://dev.flare.network/fxrp/token-interactions/x402-payments)
* [Flare Confidential Compute](https://dev.flare.network/fcc/overview)
* [x402 protocol](https://x402.org/)
* [EIP-3009](https://eips.ethereum.org/EIPS/eip-3009)
* [Understanding ERC-20 approve()](/blog/solidity-erc-20-approve/)
