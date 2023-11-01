---
date: 2023-10-31 00:00
title: Understanding ERC-4337 and the Future of Ethereum User Experience: Account Abstraction
tags: ethereum, solidity
description: In Ethereum Improvement Proposal 4337 (ERC-4337), account abstraction simplifies user interaction and the blockchain. It eliminates the need for users to deal with the complexities of wallets, making blockchain applications (dApps) more accessible to users. For instance, users can use social login to interact with dApps, and there is no need for private keys or seed phrases anymore. In this series of posts, I will provide a high-level overview of the topic in this post and dive into the code in the following ones.
---

In Ethereum Improvement Proposal 4337 (ERC-4337), account abstraction simplifies user interaction and the blockchain. It eliminates the need for users to deal with the complexities of wallets, making blockchain applications (dApps) more accessible to users. For instance, users can use social login to interact with dApps, and there is no need for private keys or seed phrases anymore. In this series of posts, I will provide a high-level overview of the topic in this post and dive into the code in the following ones.

## What is Account Abstraction?

In the current Ethereum framework, there are two different types of accounts:

* **Externally Owned Accounts (EOAs)** - controlled by user private keys, for instance Metamask;
* **Contract Accounts** - controlled by the smart contract code.

The new account abstraction proposal aims to combine two types of accounts, as explained in the ERC-4337 proposal. This addition will provide our users with better recovery options, an easier way to pay transaction fees, and the ability to enjoy multi-signatory rights. Ultimately, it will make Ethereum more accessible to a larger audience without dealing with private keys and seed phrase management.

## ERC-4337

An account abstraction proposal 4337, or in short ERC-4337, describes how the account abstraction works in the Ethereum Virtual Machine.

Let's see it all together in a diagram that is taken from [https://twitter.com/ProbablyNoam](https://twitter.com/probablynoam/status/1648080136439488513?s=61&t=tfKGnxF3fow02GH1cn2qLQ):

![ERC-4337](/assets/account-abstraction/account-abstraction.png)

1. Users can interact with the blockchain through a pseudo transaction object, `UserOperation`, containing the necessary information, such as data and signatures.
2. Bundlers group together user intents and merge multiple `UserOperation` objects into one transaction.
3. When multiple user operations are included in a transaction, it is sent to the `EntryPoint` contract for execution on the chain.
4. When a bundle of user operations is executed on the blockchain, it is done on behalf of an external account (EOA). It is important to note that the sender address `from` is the Bundler address, while the recipient `to` address is the `EntryPoint` smart contract address.
5. Users can pay transaction fees through the `EntryPoint` smart contract, which outlines the rules for such payments. For example, paying gas fees using tokens other than ETH or having the Paymaster fully fund the transaction is possible.

## Benefits and hurdles of the Account Abstraction

The ERC-4337 enables blockchain interaction with familiar logins, like two-factor authentication, biometrics, or bank login, eliminating the need for seed phrases and private keys.

Users do not interact with smart contracts directly but through an intermediary layer. This helps to mitigate the risk of user funds being stolen by a hacker.

Coworkers and DAO members can share accounts, simplifying multi-signature interactions.

When implementing account abstraction, it is crucial to thoroughly test and ensure that the smart contracts are written securely and accurately. Smart contracts are inherently more susceptible to hacks than externally owned accounts that rely on private keys for security. This poses a significant risk when employing a sophisticated mechanism to pay for transaction fees on behalf of users.

## TL;DR

Proposed in ERC-4337, account abstraction is a paradigm shift for Ethereum's usability, security, and user-friendliness. It's success is dependent on the community's adoption rate.

## Links

- [ERC-4337: Account Abstraction Using Alt Mempool](https://eips.ethereum.org/EIPS/eip-4337)
- [What is account abstraction: A beginner's guide to Ethereum’s ERC-4337 standard](https://cointelegraph.com/learn/account-abstraction-guide-to-ethereums-erc-4337-standard)
- [You Could Have Invented Account Abstraction](https://www.alchemy.com/blog/account-abstraction)
