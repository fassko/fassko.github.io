---
date: 2024-01-06 00:00
title: Understanding tx.origin and msg.sender in Solidity
tags: ethereum, solidity
description: Developers need to understand the difference between `tx.origin` and `msg.sender` in Solidity. These two global variables often need clarification with each other despite their fundamental differences. While they may appear similar at first glance, `tx.origin` and `msg.sender` represent distinct addresses in the context of a transaction. In this blog post, we will delve deeper into the meanings of each of these variables.
---

Developers need to understand the difference between `tx.origin` and `msg.sender` in Solidity. These two global variables often need clarification with each other despite their fundamental differences. While they may appear similar at first glance, `tx.origin` and `msg.sender` represent distinct addresses in the context of a transaction. In this blog post, we will delve deeper into the meanings of each of these variables.

## What is `tx.origin`?

In Solidity, `tx.origin` identifies the original sender of a transaction. It points to the external account initiating the transaction and remains constant throughout subsequent smart contract interactions (full call chain).

When a transaction is initiated through the MetaMask wallet, the address of the user's MetaMask wallet is stored in `tx.origin`. This address remains the same, even if the transaction passes through multiple contracts. The consistency of this address is essential for tracing the initial sender of the transaction.

## What is `msg.sender`?

In smart contract development, `msg.sender` identifies the sender of the current call. This variable is dynamic and can change throughout the transaction process. 

When a transaction moves through several smart contracts, the `msg.sender` value changes to indicate the most recent contract address in the call chain. For example, if Contract A calls Contract B, then the `msg.sender` value within Contract B will be recognized as Contract A.

## Coding it up

To demonstrate how the `tx.origin` and `msg.sender` change between smart contract calls, we will create an `EntryContract` smart contract that references the `UnderlyingContract` contract.

Let's add a `printTxOriginAndMsgSender` function that prints each address.

Here we have the `Entry` smart contract:

```solidity
contract EntryContract {
  IUnderlyingContract private underlyingContract;

  constructor(IUnderlyingContract _underlyingContract) {
    underlyingContract = _underlyingContract;
  }

  function printTxOriginAndMsgSender() public view {
    console.log("tx.origin", tx.origin);
    console.log("msg.sender", msg.sender);
  }

  function callUnderlyingContract() external {
    underlyingContract.printTxOriginAndMsgSender();
  }
}
```

Now let's define the `UnderlyingContract` and it's interface:

```solidity
interface IUnderlyingContract {
  function printTxOriginAndMsgSender() external ;
}

contract UnderlyingContract is IUnderlyingContract {
  function printTxOriginAndMsgSender() external view {
    console.log("tx.origin", tx.origin);
    console.log("msg.sender", msg.sender);
  }
}
```

To execute the test, we must first deploy the `UnderlyingContract` and use its address when deploying the `EntryContract`.

When we call the `printTxOriginAndMsgSender` function of the `EntryContract` contract, we see that both addresses are the same.

![tx.origin and msg.sender are the same](/assets/tx.origin-vs-msg.sender/tx.origin-msg.sender-same.png)

Let's call the `callUnderlyingContract` function on the `EntryContract` contract. We can see that `tx.origin` and `msg.sender` are different now. `tx.origin` is the original caller address and `msg.sender` is the `EntryContract` smart contract address.

![tx.origin and msg.sender are not the same](/assets/tx.origin-vs-msg.sender/tx.origin-msg.sender-not-same.png)

## TL;DR

In Solidity, `tx.origin` and `msg.sender` are two variables that serve different but crucial purposes. `tx.origin` always refers to the address that initially initiated the transaction and remains constant throughout the transaction chain. On the other hand, `msg.sender` represents the sender of the current message or contract interaction and changes with each call. It is crucial to be cautious when using `msg.sender`, as it may not always represent the initial caller of the transaction.

## Links

- [Demo code](https://gist.github.com/fassko/814206e679499e5ce465fcead119ee55)

- [Solidity documentation: Special Variables and Functions](https://docs.soliditylang.org/en/v0.8.23/units-and-global-variables.html#block-and-transaction-properties)
- [Solidity documentation: Block and Transaction Properties](https://docs.soliditylang.org/en/v0.8.23/cheatsheet.html#block-and-transaction-properties)
- [Unraveling Solidity Mysteries: Demystifying tx.origin and msg.sender](https://solidity101.substack.com/p/unraveling-solidity-mysteries-demystifying)