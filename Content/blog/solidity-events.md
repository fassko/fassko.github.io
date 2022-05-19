---
date: 2022-05-17 00:00
title: How events in Solidity work, and why are they needed
tags: swift, Solidity, web3, events
description: Events in Solidity programming language help inform when something has happened in the smart contract. Parties like a web frontend, data gathering tools, and more can listen to specific events and react accordingly. In this post, we will dig deeper into Events and how to use them when developing smart contracts on Ethereum-like blockchains.
---

Events in Solidity programming language help inform when something has happened in the smart contract. Parties like a web frontend, data gathering tools, and more can listen to specific events and react accordingly. In this post, we will dig deeper into Events and how to use them when developing smart contracts on Ethereum-like blockchains.

## Define an event

We need to start with the `event` keyword to define an event.

```solidity
event TicketContractCreated();
```

An event can have additional parameters. It means that it is a struct that can hold data. Data types are the same that we are using in Solidity language.

```solidity
event TicketCreated(address ticketHolder);
```

### Parameters

Event struct can hold multiple parameters. We can name these parameters, but that is optional, and we can provide just the data type.

```solidity
event TicketCreated(address ticketHolder, uint256 ticketId);
```

Suppose we want to filter the logs when listening to the specific events. We need to specify which of the parameters should be indexed. There is a limit that only up to 3 parameters can be indexed. Keep in mind that indexing parameters are cost-efficient and will take more gas fees for the transaction to be mined.

```solidity
event TicketCreated(address indexed ticketHolder, uint256 ticketId);
```

## Emit the event

When a specific action has happened, we can release the event with the `emit` keyword followed by the event name.

```solidity
emit TicketContractCreated();
```

If an event does have any parameters, we can specify those in the parenthesis in the same order as to how we defined them.

```solidity
emit TicketCreated(msg.sender);
```

## See emitted events

To see emitted events can use [Remix IDE](https://remix.ethereum.org/), [Etherscan](https://etherscan.io/) block explorer, or any library to interact with Ethereum like chains like [Ethers.js](https://docs.ethers.io/v5/), [web3.js](https://web3js.readthedocs.io) or any other. How to do that is out of the scope of this blog post.

## TL;DR

Events in Solidity programming language are a great way to inform other parties that something has happened. We can't just rely on the transaction status. An event can hold data, and others can filter events and react upon that, for instance, in the web app.

## Links

* [Sample code](https://gist.github.com/fassko/56c1b327f34c3deb2900df4f090af555)

* [Official documentation](https://docs.soliditylang.org/en/v0.8.14/abi-spec.html#events )
* [Solidity by Example - Events](https://solidity-by-example.org/events)
* [Logging data from smart contracts with events](https://ethereum.org/en/developers/tutorials/logging-events-smart-contracts/)
* [How To Use Events In Solidity](https://hackernoon.com/how-to-use-events-in-solidity-pe1735t5)