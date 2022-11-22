---
date: 2022-11-22 00:00
title: How do Bytes live in Solidity and coexist with Strings?
tags: Solidity, web3, bytes
description: Bytes and Strings have a special place in the Solidity programming language. Both of these types work quite similarly yet differently. Even bytes have two kinds of ways - fixed or dynamic size. Bytes and strings can be converted and vice versa according to our needs to work with them. Let's look more profound in this blog post.
---

Bytes and Strings have a special place in the Solidity programming language. Both of these types work quite similarly yet differently. Even bytes have two kinds of ways - fixed or dynamic size. Bytes and strings can be converted and vice versa according to our needs to work with them. Let's look more profound in this blog post.

## The fixed size byte array

If we know the size of the bytes we want to store, the best approach is to use the fixed size byte array type. Solidity language allows storing from 1 to 32 bytes in a sequence. Using a known upfront size to store bytes costs much cheaper in terms of gas fees.

To initialize a fixed size byte array, we need to specify the size of how many bytes we would like to store.

```solidity
bytes1 b1 = hex"41";
```

Bytes can be initialized with either a hex string `hex"41"` or a hex value `0X41` which is the letter `A` according to ASCII.

Another important note is that fixed size bytes can be passed between smart contracts in the Solidity programming language.

## The dynamic size byte array

Dynamic size byte array can hold a variable count of bytes.

It is possible to get back the index of bytes which is not the case for string type.

```solidity
function dynamicBytesMemoryNew() external view returns(bytes memory) {
  bytes memory _dynamicBytesMemoryNew = new bytes(200);

  _dynamicBytesMemoryNew[0] = hex"41";

  console.log(string(_dynamicBytesMemoryNew));

  return _dynamicBytesMemoryNew;
}
```

There are several ways to allocate bytes in Solidity language in the memory.

### Dynamic size byte array in storage

When allocating dynamic bytes on storage, we need to provide the maximum size of how much we want that to hold.

```solidity
bytes _dynamicBytesStorage = new bytes(200);
```

If we allocate a dynamic size byte array in the storage, we can use the `pop` and `push` methods. Just keep in mind that it can be costly to do.

```solidity
function dynamicBytesStorage() external returns(bytes memory) {
  _dynamicBytesStorage.push(hex"41");

  console.log(string(_dynamicBytesStorage));

  return _dynamicBytesStorage;
}
```

### Dynamic size byte array in memory

When allocating dynamic bytes array in the memory, we don't need to specify the size.

```solidity
function dynamicBytesMemory() external view returns(bytes memory) {
  bytes memory _dynamicBytesMemory = hex"41";

  console.log(string(_dynamicBytesMemory));

  return _dynamicBytesMemory;
}
```

## Strings are bytes (almost)

String type in Solidity is almost like the dynamic array of bytes. It can hold an arbitrary length of data of characters.
This time we won't go more profound about this type but look at it in the context of bytes.

We can cast any string to bytes. That allows us to modify and read characters at the byte level. It means we need to handle characters at the ASCII level.

One critical note is that strings can't be passed between smart contracts. We need to head down to the bytes level for that. But it is doable to convert between these types.

### Converting to bytes

Converting a string to bytes is a straightforward task. We need to initialize bytes passing in the string type. In return, we get a dynamic array of bytes.

```solidity
bytes memory stringBytes = bytes("This is string");
```

If we want to convert to the `bytes32` type, we need to go to the assembly level and write the string on the memory.

```solidity
bytes32 result;

assembly {
  result := mload(add("This is string", 32))
}
```

Keep in mind that we can write only up to 32 bytes.

### Converting from bytes

In Solidity language, we can convert back the string value to a dynamic size array of bytes. We can't convert to fixed string bytes because the string type has an unknown size.

```solidity
bytes memory bytesData = hex"41";
string memory stringData = string(bytesData);
```

## TL;DR

Bytes play a vital role in the Solidity programming language. It can hold any data in either fixed or dynamic size byte array. For instance, strings that are very similar to bytes but with limited functionality. Luckily converting between strings and bytes is doable with some minor caveats.

## Links

* [Sample code](https://gist.github.com/fassko/548c83158f4006c38e70e5dceed2a8cb)

* [Fixed length byte arrays](https://solang.readthedocs.io/en/latest/language/types.html#fixed-length-byte-arrays)
* [Dynamic length bytes](https://solang.readthedocs.io/en/latest/language/types.html#dynamic-length-bytes)
* [Solidity Tutorial : all about Bytes](https://jeancvllr.medium.com/solidity-tutorial-all-about-bytes-9d88fdb22676)
