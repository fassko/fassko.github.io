---
date: 2022-07-29 00:00
title: Mistery revealed about delegatecall in Solidity
tags: Solidity, web3, proxy, delegatecall
description: This time we will talk about the critical lower-level function `delegatecall`. It is widely used in a proxy pattern, for instance, when using [OpenZepplin upgrades pattern](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies). Essentially this function executes code in another contract but uses data from the caller concept. Let's dig deeper and explore more.
---

This time we will talk about the critical lower-level function `delegatecall`. It is widely used in a proxy pattern, for instance, when using [OpenZepplin upgrades pattern](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies). Essentially this function executes code in another contract but uses data from the caller concept. Let's dig deeper and explore more.

## Storage clash

When using `delegatecall` function, it is vital to note that state variables should be in the same order in both contracts. If it isn't, then bizarre things can happen. For instance, data will be overwritten.

## Data labyrinth

Let's have a contract, `Executor`, that will save our lucky number, sender address, and Ether value sent to it.

```solidity
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Executor {
  uint256 public luckyNumber;
  address public sender;
  uint256 public value;

  function setLuckyNumber(uint256 _luckyNumber) public payable {
    luckyNumber = _luckyNumber;
    sender = msg.sender;
    value = msg.value;
  }
}
```

Let's deploy the `Executor` contract and get the deployed address.

![Deployed `Executor` contract](/assets/solidity-delegatecall/deployed-executor-contract.png)

After that, we can create the `Caller` smart contract.

![Deploy `Caller` contract](/assets//solidity-delegatecall/interact-caller-executor.png)

```solidy
contract Caller {
  uint256 public luckyNumber;
  address public sender;
  uint256 public value;

  function setLuckyNumber(address executor, uint256 _luckyNumber) public payable {
    (bool success, bytes memory data) = executor.delegatecall(
      abi.encodeWithSignature("setLuckyNumber(uint256)", _luckyNumber)
    );

    console.log(success);
  }
}
```

Now when we interact with the `Caller` contract and set the lucky number, we can see that data has been changed only in this contract, not in the `Executor` contract. To verify that, we can get the lucky number from both contracts.

![Interaction with the `Caller` and `Executor` smart contracts](/assets/solidity-delegatecall/deploy-caller-contract.png)

## Potential vulnerability

Using the `delegatecall` function is a compelling feature in Solidity programming language. With great power comes great responsibility. It can be perilous when misused.

Two major vulnerability attacks are mistakes preserving caller context and storage layout mismatch. We won't go into details this time but will follow up on that in future posts.

## TL;DR

The `delegatecall` is a lower-level function in Solidity programming language. It unlocks the possibility to interact from one smart contract with another by using the caller's context. When using `delegatecall` we should be super careful because misusing it can cause serious vulnerabilities.

## Links

* [Sample code](https://gist.github.com/fassko/8af2cca1a71895a03cb28198fe57315f)

* [Official documentation](https://docs.soliditylang.org/en/v0.8.15/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries)
* [Delegatecall - Solidity by Example](https://solidity-by-example.org/delegatecall/)
* [EIP-1967: Standard Proxy Storage Slots](https://eips.ethereum.org/EIPS/eip-1967)
* [OpenZepplin upgrades](https://docs.openzeppelin.com/contracts/4.x/upgradeable)
* [Delegatecall Vulnerabilities](https://solidity-by-example.org/hacks/delegatecall/)
* [https://blockchain-academy.hs-mittweida.de/courses/solidity-coding-beginners-to-intermediate/lessons/solidity-5-calling-other-contracts-visibility-state-access/topic/delegatecall/](https://blockchain-academy.hs-mittweida.de/courses/solidity-coding-beginners-to-intermediate/lessons/solidity-5-calling-other-contracts-visibility-state-access/topic/delegatecall/)
