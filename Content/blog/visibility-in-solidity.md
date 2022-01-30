---
date: 2022-01-29 00:00
title: Accessibility in Solidity
tags: solidity
description: Solidity language allows specifying accessibility for contract functions and state variables. That will enable us to set constraints on constructing the smart contract and whether other contracts or addresses can access the data. Contract state variables and functions have a slight difference that we're going to check out. I want to mention that accessibility and visibility are different things in blockchain development context.
---

Solidity language allows specifying accessibility for contract functions and state variables. That will enable us to set constraints on constructing the smart contract and whether other contracts or addresses can access the data. Contract state variables and functions have a slight difference that we're going to check out. I want to mention that accessibility and visibility are different things in blockchain development context.

## Function visibility

Functions in smart contracts can have four accessibility levels.

### Public

When a function is defined as `public` it can be called from any other contract, including a smart contract that contains it or address.

```solidity
function publicFunction() public {
  publicInt += 1;
}
```

### External

Keyword `external` means that a function can be called by other contracts or addresses. If we want to call an `external` function, we can do it using `this` keyword.

```solidity
function externalFunction() external {
  externalInt += 1;
}

function callExternalFunction() public {
  this.externalFunction();
}
```

### Internal

Internal functions can be called from the same smart contract or any other inherited from it.

```solidity
function internalFunction() internal {
  internalInt += 1;
}
```

### Private

Private functions aren't visible and can't be accessed from other smart contracts or addresses. These functions aren't accessible in contracts that inherit a smart contract where this function is defined.

```solidity
function internalFunction() internal {
  internalInt += 1;
}
```

## Contract state variable visibility

Smart contract state variables can be `public`, `internal` and `private`.

### Public

Public state variables can be accessed from any smart contract, including those that hold them or any address. Solidity generates for the `public` state variable a getter function.

```solidity
contract Accessibility {
  uint public publicInt;
}

// can get and set from other smart contracts
contract AccessPublic {
  Accessibility accessibility = new Accessibility();

  function accessPublicInt() public view returns(uint) {
    uint publicInt = accessibility.publicInt();
    return publicInt;
  }
}

```

### Internal

Similar to functions, `internal` state variables can be accessed from a contract that defined them or any other that inherits from a smart contract. Important to note that smart contract state variables are `internal` by default.

```solidity
uint internal internalInt;
```

### Private

A `private` state variable has the same characteristics as functions. It can be accessed only within the same contract, not any other contracts.

```solidity
uint private privateInt;
```

## Visibility and accessibility

In blockchain development, visibility and accessibility have a different meaning. Everything inside a smart contract can be visible because all transactions are open in a ledger that anyone can see. Private or internal prevents other contracts or addresses from modifying the data. It can be visible from the outside because nothing can be hidden on the blockchain. It means that you can restrict access to a state variable or a function, but it is visible.

## TL;DR

Solidity programming language has multiple options to define access levels for smart contract functions and state variables. In blockchain development, visibility and accessibility aren't the same. We can restrict access to the functions or state variables, but it can be viewed from the outside.

## Links

* [Sample code](https://gist.github.com/fassko/5b73bdb38f0184f0b54b2f6f5cfda095)

* [Official documentation](https://docs.soliditylang.org/en/v0.8.11/contracts.html#visibility-and-getters)
* [Solidity by Example](https://solidity-by-example.org/visibility/)
* [How to hide a function of all but visible to the owner](https://ethereum.stackexchange.com/questions/11393/how-to-hide-a-function-of-all-but-visible-to-the-owner)
* [Solidity functions - private visibility](https://ethereum.stackexchange.com/questions/6547/solidity-functions-private-visibility)