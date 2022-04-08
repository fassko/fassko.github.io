---
date: 2022-04-07 00:00
title: The Story behind Mapping in Solidity
tags: swift, Solidity, web3, mapping
description: Mappings in Solidity programming language play a significant role. These are hash tables that can have a key and value. When we use them, there are some caveats, especially from other programming languages. Let's explore them in this article.
---

Mappings in Solidity programming language play a significant role. These are hash tables that can have a key and value. When we use them, there are some caveats, especially from other programming languages. Let's explore them in this article.

## Mapping Keys and Values

Mappings essentially are hash tables, so it means that the key is saved as a hash. To access the value, key is hashed and found in the mapping table.

### Limitations

Mappings can be state variables, storage reference types in functions, or parameters for library functions. A mapping can't be returned, and it can't be used in structs or arrays that contain arrays.

The key type can be any built-in type, bytes, string, or enum value. Our defined types are not allowed. This is because Solidity knows how to hash the value.

Value types can be any - built-in or our defined types. It can even be a mapping that would create a double hash table.

## Reading and writing from Mapping

Let's go over how we can read and write data in a mapping. Let's imagine we want to build a lucky number registry. Everyone with their wallet address can set and read their lucky number.

At first, we need to set up the mapping of the lucky numbers.

```solidity
mapping(address => uint256) private luckyNumbers;
```

If we set the access level to the public, the getter function is compiled by default.

### Getting the value in the mapping

To get the value from a mapping we need to know the key. Solidity behind the scenes will hash it and find it from the hash table.

```solidity
function getMyLuckyNumber() external view returns(uint256) {
  require(luckyNumbers[msg.sender] != 0, "0 can't be lucky");

  return luckyNumbers[msg.sender];
}
```

If the value does not exist, we get the default value, which is zero in the case of `uint256`.

### Setting the value in the mapping

We need a key and value of the defined type that mapping can hold when setting the value. Be aware that this also updates the value if it has been already set.

```solidity
function setMyLuckyNumber(uint256 number) external {
  require(number > 0, "Can't be set to zero");

  luckyNumbers[msg.sender] = number;
}
```

## TL;DR

The mapping type is practically a hash table in the Solidity programming language with a key and value. There are some limitations, especially what we can define as the key. We need the key to get data from the mapping. Remember the default values for the type we're using in the value in case the value has not been set. When we are setting the value, we are also overwriting the old one.

## Links

* [Sample code](https://gist.github.com/fassko/488573feba1cf976b5854faeb1fd2ba8)

* [Official documentation](https://docs.soliditylang.org/en/v0.8.13/types.html)
* [Solidity by Example - Mapping](https://solidity-by-example.org/mapping/)