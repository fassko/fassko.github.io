---
date: 2022-06-20 00:00
title: Storage and memory secrets in Solidity 
tags: Solidity, web3, memory, storage
description: This time, we will talk about storage locations in Solidity programming language, specifically about the `storage` and `memory` locations. Not knowing what they represent and how they work can cause issues in our smart contracts.
---

This time, we will talk about storage locations in Solidity programming language, specifically about the `storage` and `memory` locations. Not knowing what they represent and how they work can cause issues in our smart contracts.

## Storage

Storage in smart contracts holds data between function calls. We can imagine that `storage` would be as a hard drive in the computer. Even if we turn it off, the data stays and isn't erased. On the blockchain, what we write in storage is stored.

### Storage by default

#### State variables

By default, Solidity will keep in storage smart contract's state variables.

```solidity
contract StorageContract {
  struct LuckyNumber {
    uint256 number;
    string reason;
  }

  mapping(address => LuckyNumber) luckyNumbers;
}
```

In this example smart contract's state variables `luckyNumbers` are kept in storage, and data will persist between function calls.

When we add and get the lucky number, we have a predictable outcome.

```solidity
function addLuckyNumber(LuckyNumber memory luckyNumber) external {
  require(luckyNumber.number != 0, "Lucky number can't be 0!");
  require(luckyNumbers[msg.sender].number == 0, "You already have set lucky number. Edit it if you have another one.");

  luckyNumbers[msg.sender] = luckyNumber;
}

function getMyLuckyNumber() external view returns(uint256) {
  require(luckyNumbers[msg.sender].number != 0, "You don't have a lucky number set yet.");

  LuckyNumber memory luckyNumber = luckyNumbers[msg.sender];

  return luckyNumber.number;
}
```

#### Local function variables

Local function variables of struct, array, or mapping are saved in storage by default. It means that if we declare these values in our functions, they are kept in storage, which can cause unexpected issues that are hard to track.

If we add a function `editLuckyNumber` to our code example and mark a local copy as `storage` it will edit the state variable that we expect.

```solidity
function editLuckyNumber(uint256 luckyNumber) external {
  require(luckyNumber != 0, "Lucky number can't be 0!");
  require(luckyNumbers[msg.sender].number != 0, "You don't have a lucky number set yet.");

  LuckyNumber storage _luckyNumber = luckyNumbers[msg.sender];
  _luckyNumber.number = luckyNumber;
}
```

## Memory

In memory, Solidity keeps all locally defined value types, which can be uint, string, etc., but not an array, a struct, or a mapping. Function arguments are kept in memory as well. Remember that `memory` can't be used at the smart contract level, only locally in functions.

```solidity
function multiplyByItself(uint256 number) external pure returns(uint256) {
  uint256 result = number * number;

  return result;
}
```

In this example, the function argument `number` that we pass in our function is stored in memory. Also, locally defined variable of the `result` is stored in memory and will be released as soon as the function's execution ends.

## Pitfall using memory and storage

One of the major pitfalls of wrong usage of the `storage` and `memory` keywords in the Solidity programming language is that we declare a variable either `storage` or `memory` without thinking it through. First, keeping data in `storage` will consume more gas because we need to pay for the block space. Second, we should ask ourselves whether we need to access data that we keep between the function calls. By function calls, there can be even two different functions.

If we define the `_luckyNumber` in function `editLuckyNumber` using the `memory` keyword, it will edit this function locally only, and changes won't be written to the blockchain.

```solidity
function editLuckyNumber(uint256 luckyNumber) external {
  require(luckyNumber != 0, "Lucky number can't be 0!");
  require(luckyNumbers[msg.sender].number != 0, "You don't have a lucky number set yet.");

  LuckyNumber memory _luckyNumber = luckyNumbers[msg.sender];
  _luckyNumber.number = luckyNumber;
}
```

This function's outcome will result in editing the lucky number not working because we update it only locally.

## TL;DR

Storing data using Solidity language in our smart contracts is a crucial thing. Life is easier with value types, but with arrays, structs, and mappings, it is more tricky. That's why it is essential to ask whenever we want to save these variables. Do we want data to persist between calling the smart contract or being saved locally while executing the function?

## Links

* [Sample code](https://gist.github.com/fassko/5b19bee0c78e3e41aa5d52573b2e696e)

* [What is the memory keyword? What does it do?](https://docs.soliditylang.org/en/v0.3.3/frequently-asked-questions.html#what-is-the-memory-keyword-what-does-it-do)
* [Storage vs Memory in Solidity](https://www.geeksforgeeks.org/storage-vs-memory-in-solidity/)
* [In Ethereum Solidity, what is the purpose of the "memory" keyword?](https://stackoverflow.com/questions/33839154/in-ethereum-solidity-what-is-the-purpose-of-the-memory-keyword)
