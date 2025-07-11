---
date: 2025-07-05 00:00
title: Understanding approve() in ERC-20: Why It Matters and How to Use It Safely
tags: Solidity, web3, ERC-20
description: This post takes a closer look at the `approve()` function in the ERC-20 token standard. While commonly used in DeFi applications, it introduces a huge risk if not handled correctly. Learn how to use it safely and avoid known vulnerabilities.
---

In a [previous post](/blog/solidity-erc-20/), I gave a quick overview of ERC-20 — the fungible token standard used across EVM-compatible chains.
Like how one dollar bill is interchangeable with another, ERC-20 tokens are designed to be equal in value and function.

Today, I want to dig deeper into one function in this standard that often goes unnoticed - but is critical for interacting with dApps and smart contracts: `approve()`.

## What `approve()` does?

The `approve(address spender, uint256 amount)` function lets the token holder (caller) authorize another address (the spender) to spend tokens on their behalf — up to a defined limit.

This is essential when interacting with DeFi protocols, DEXes like Uniswap, or any smart contract that requires moving tokens from your wallet. Instead of transferring tokens directly, you first give the smart contract permission to pull tokens from your balance when needed.

```solidity
IERC20(token).approve(spender, amount);
```

## Why You Should Care: Security Implications

The naive implementation of approve() can be risky.

Let's say you initially approve 100 tokens, then later decide to reduce it to 50.
If you call `approve(spender, 50)`, there is a chance that the spender sees both approvals before the new one takes effect — and spends both amounts.

This race condition is well-documented and can be exploited. See the issue on [GitHub](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).

The best practice is to first set the allowance to 0 and only then set it to the desired value.

```solidity
token.approve(spender, 0);
token.approve(spender, newAmount);
```

You can also use the OpenZeppelin's `SafeERC20` library with methods like `safeApprove()`, `safeIncreaseAllowance()`, and `safeDecreaseAllowance()` instead of manually calling `approve()`.
Looking at this library is outside the scope of this blog post.

## TL;DR

The `approve()` function of the ERC-20 standard permits a smart contract (or another address) to spend your tokens.
It is a key part of token transfers in DeFi applications.
Be careful and always reset to 0 before updating allowances to avoid race conditions.

The ERC-20 standard may seem simple, but subtle details like this one can expose users to a real risk of losing money.

## Links

* [Sample code](https://github.com/fassko/erc-20-approve-attack)

* [EIP-20: Token Standard](https://eips.ethereum.org/EIPS/eip-20)
* [ERC-20 - Ethereum documentation](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)
* [ERC20 - OpenZeppelin documentation](https://docs.openzeppelin.com/contracts/4.x/erc20)
* [ERC20 - OpenZeppelin implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)