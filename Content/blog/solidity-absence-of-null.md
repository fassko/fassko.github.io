---
date: 2022-07-29 00:00
title: Absence of null in Solidity
tags: Solidity, web3, null
description: One of the weirdest Solidity programming language's quirks is the absence of null. Coming from Swift, where nullability is one of the core building blocks, it felt foreign. At first, I didn't understand how to code without such a useful feature. This post elaborates on how to find a way around that in Solidity when building smart contracts.
---

One of the weirdest Solidity programming language's quirks is the absence of null. Coming from Swift, where nullability is one of the core building blocks, it felt foreign. At first, I didn't understand how to code without such a useful feature. This post elaborates on how to find a way around that in Solidity when building smart contracts.

## Concept of undefined

The concept of `undefined`, `null`, `nil`, `None`, etc. exists in languages like JavaScript, Java, Python, Swift, .etc. but it does not exist in Solidity.

In Solidity, we can call it zero or default value concept instead. That is because each value gets a slot in the memory once it is created, and should contain something.

## Default values

To talk about default values, we should split the Solidity types into two blocks:

* **dynamically** sized types like `string`, `bytes`, and arrays;
* **non dynamically** sized types like `int`, `bool` and `address`.

### Non dynamically sized types

With non-dynamically sized types, the game is pretty straightforward. Here are the default values for those:

* `int` or `uint256` default value is zero `0`;
* for `bool` it is `false`;
* `address` type default value is zero address `0x0000000000000000000000000000000000000000`.

If we want to create a `struct`, the default value is a tuple of all its member's default values.

For an `enum` default value is the first case. This can be a very foreign approach, but that is because all the `enum` cases behind the scenes are an array of `uint8` integers.

### Dynamically sized types

With dynamically sized types, it is a different story: 

* default value for `string` is an empty `string`;
* array's default value is an empty array;
* `bytes` default value is empty or no bytes.

## Code along

To illustrate default values in the code, let's create an Employee `struct` with an `enum` `EmployeeType`.

```solidity
enum EmployeeType {
  Employee,
  Contractor,
  PartTime
}

struct Person {
  EmployeeType employeeType;
  bool deleted;
  string name;
  uint256 yearOfBirth;
  address walletAddress;
  uint256[] doorAccess;
}
```

Now we can initialize a new instance of the `Employee` `struct`. Remember, we don't need to provide any member values but allocate them in the memory.

```solidity
Person person;
```

If we print out the `person` value, we will get a tuple of default values for each `Person` `struct` member.

```
tuple(uint8,bool,string,uint256,address,uint256[]): 0,false,,0,0x0000000000000000000000000000000000000000,
```

## Checking nullability

Now that we know the default values, we can check if something is "null" or, to precisely say, it has the default value.

```solidity
function check() external view {
  console.log(person.deleted == false);
  console.log(bytes(person.name).length == 0);
  console.log(person.yearOfBirth == 0);
  console.log(person.walletAddress == address(0));
  console.log(person.employeeType == EmployeeType.Employee);
  console.log(person.doorAccess.length == 0);
}
```

Once we execute this function, we get `true` for all the checks. This is how we can understand that there is no value defined.

```
 Deleted true
 Name true
 Year of birth true
 Wallet address true
 Employee type true
 Door access true
```

Worth mentioning is that we converted it to `bytes` for the' string' type and checked its length. There is another way to achieve that, but that we are going to talk about in one of the future posts.

## TL;DR

Solidity programming language doesn't have the nullability feature, which is common in many languages like Swift and JavaScript. Instead, types have the default values, like zero `0` for `uint`. It is vital to know the default values because it comes in handy once we want to check if something is or isn't defined.

## Links

* [Sample code](https://gist.github.com/fassko/86af7e7598ae950ad5ed2fdba7b66309)

* [Official Documentation - Types](https://docs.soliditylang.org/en/v0.8.16/types.html)
* [Scoping and Declarations](https://docs.soliditylang.org/en/v0.8.16/control-structures.html#default-value)
* [StackOverflow discussion](https://ethereum.stackexchange.com/questions/93109/how-to-set-a-require-for-a-string-to-not-be-null)
