---
date: 2021-12-16 00:00
title: Solidity for Swift developers: File Structure and Functions
tags: swift, Solidity
description: 
---

Solidity is an object-oriented language to write smart contracts that can be deployed on the blockchain, for instance, Ethereum. The syntax is similar to Javascript, but on the other hand, semantics is closer to C++. We will dig into Solidity language structure and functions from a Swift developer's perspective.

##  Pragma and file extension

Before we jump to the Solidity language structure, we need to know what a `pragma` keyword is and what it means.

Unlike the Objective-C `#pragma` and Swift `MARK`, the' pragma' keyword in Solidity describes what version of the compiler should use. Keep in mind that it instructs the compiler to check if the versions do match. It does not turn on or off any language features.

For instance, if we would like to tell the Solidity compiler that we want to use the 0.8.x version, we can start the source file like this:

```
pragma solidity ^0.8.0;
```

We can also use greater or smaller operations to describe even the version interval, which could be handy.

There are other ways to use the `pragma` keyword, but we won't look into that this time.

Solidity source files are saved with the `.sol` extension.

![Solidity file](/assets/solidity-swift-developers-structure/solidity-file.png)

## Everything starts with a Contract

Contracts in Solidity language are similar to classes in Swift. Contracts contain state variables, functions, function modifiers, events, errors, structs, and enums. This time we are going to look into only function structure.

Like classes, we need to name it and open and close with braces.

```
contract HelloSwiftFromSolidity {

}
```

## State Variables

State variables are variables that are declared inside the `contract`. Be aware that this information is stored on the blockchain contract storage once you deploy it. We don't need to worry about getters and setters. Solidity compiler generates that for us.

```
contract HelloSwiftFromSolidity {
  string hello;
}
```

You can notice now that each execution line should end with the semicolon `;`. That is not the case for the Swift language.

## Functions

Functions can be declared inside and outside the `contract`, similar to Swift. It can execute a piece of code.

```
contract HelloSwiftFromSolidity {
  // visibility = public because access from outside
  string public hello = "Hello Swift";

  // visibility = public because access from outside
  // view = just view the data
  function helloSwift() public view returns(string memory) {
      return hello;
  }
}
```

It is going on a lot, so let's break it down. If we want to access the state variable from outside, we need to set the visibility type to `public` and do the same for the function. In our case, the function returns something, and we can mark it as `view`. It returns a string that is stored in the memory and removed after the execution is finished.

The places where the function variables and return data can be stored are:

* `memory` - the lifetime of the variable is limited to the function scope, it isn't saved anywhere;
* `storage` - data is stored in the smart contract storage on the blockchain;
* `calldata` - data is stored outside from where the function is being called, about this we will discuss in the future and how to use it.

### Function types

Functions in Solidity can execute instructions, view data. It can be a `view` or `pure` when we view the data. The difference between these two is that pure functions don't modify nor read the state variables.

```
function helloWorld() public pure returns(string memory) {
  return "Hello World";
}
```

In the code above, we are not reading nor changing anything on the blockchain but just returning some data.

## TL;DR

Solidity is a language to write the smart contracts that can be deployed on the blockchain. The most popular currently is Ethereum. From a Swift developer's perspective, language is quite similar syntax-wise but very different semantics-wise. First of all, every execution line should end with a semicolon. In Solidity equivalent to the Swift classes are contracts that can contain state variables, functions, and other structures.

## Links

* [Layout of a Solidity Source File](https://docs.soliditylang.org/en/v0.8.10/layout-of-source-files.html)
* [Structure of a Contract](https://docs.soliditylang.org/en/v0.8.10/structure-of-a-contract.html)
* [Ethereum Developer Resources](https://ethereum.org/en/developers/)