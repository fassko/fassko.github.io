---
date: 2023-07-25 00:00
title: Leveraging the Set Structure in Solidity
tags: Solidity, web3, set, nft
description: A Set structure, as used in many programming languages, is a collection of distinct elements where each item is unique, and no duplicates are allowed. This data structure is especially valuable when you need to efficiently check the existence of an item, maintain an organized collection of items without repetition, or quickly retrieve unique elements. Solidity programming language for Ethereum smart contract development does not natively support the Set data structure. Developers need to create their own structures or utilize external libraries to replicate Set functionalities, such as ensuring the uniqueness of elements within a collection.
---

A Set structure, as used in many programming languages, is a collection of distinct elements where each item is unique, and no duplicates are allowed. This data structure is especially valuable when you need to efficiently check the existence of an item, maintain an organized collection of items without repetition, or quickly retrieve unique elements. Solidity programming language for Ethereum smart contract development does not natively support the Set data structure. Developers need to create their own structures or utilize external libraries to replicate Set functionalities, such as ensuring the uniqueness of elements within a collection.

## Functionality of the Set

The Set structure we're going to build will have the ability to add items, remove items, check if an item is in the Set, and list all the unique elements.

In order to implement each of these functionalities, we must first complete some prework by creating two variables to hold set values and their corresponding indexes.

```solidity
contract Set {
  uint256[] public elements;

  mapping(uint256 => uint256) private indexes;
```

We will use the built-in array structure in Solidity to hold all the elements in the sSt, which will be stored in the variable "items".

One way to ensure that each element in a set is unique is by using the mapping structure from Solidity. The index of each value in the "items" array will serve as the key, while each element in the Set will have the corresponding value in the mapping structure.

## Set Operations

Let's delve into the functionality of each Set operation.

### How to Add an Element

Adding an element to our Set is an essential feature. We need to ensure that every addition will be checked for uniqueness, and only when the element doesn't already exist in the Set will it be added. This will prevent any duplicates and maintain the integrity of our Set.

```solidity
function insert(uint256 value) public {
  if (indexes[value] == 0) {
    elements.push(value);
    indexes[value] = elements.length;
  }
}
```

Let's examine the code. Initially, we should verify if the element is present in the Set. This can be achieved by checking if the `indexes` mapping has an index for the given element. If it does not, we can add the element to the `elements` array and establish the index in the `indexes` mapping.

It would be wise to extract this element into a separate function as we need to verify its existence in the Set in other areas.

```solidity
function contains(uint256 value) public view returns(bool) {
  return indexes[value] != 0;
}
```

We can employ this function in the conditional check. However, a better approach in Solidity is to utilize the `require` control structure. Thus, let's modify the `insert` function.

```solidity
function insert(uint256 value) public {
  require(!contains(value), "Already contains value");

  elements.push(value);
  indexes[value] = elements.length;
}
```

The code is now simpler to understand and has improved readability.

### How to Remove an Element

The ability to remove elements from our Set gives us flexibility in managing our data. If an element is no longer needed or has become irrelevant, we can remove it from the Set. To maintain efficiency, the removal process should also confirm the existence of an item before attempting its deletion.

```solidity
function remove(uint256 value) public {
  require(contains(value), "Set does not contain such value");

  // find out the index
  uint256 index = indexes[value];

  // moves last element to the place of the value
  // so there are no free spaces in the array
  uint256 lastValue = elements[elements.length - 1];
  elements[index - 1] = lastValue;
  indexes[lastValue] = index;

  // delete the index
  delete indexes[value];

  // deletes last element and reduces array size
  elements.pop();
}
```

Although this function seems lengthy and complicated, let's review it together.

First, we check if the element exists in the Set. If it does, we must determine its index from the `indexes` mapping.

Next, we must remove the element from the "elements" array. Using the "delete" function on Solidity arrays will create empty spaces and not change the array's length. To prevent this, we must move the last element to the location where the desired element will be removed.

Finally, we will use the `pop` built-in function to remove the last element from the array and remove the element index.

### List all elements in the Set

Lastly, we will need a function that lists all the elements in the Set. This feature provides a view of all the unique elements we have collected. Whether we need to debug our code, verify our operations, or use the Set's data, a function to list all elements is invaluable.

```solidity
function values() public view returns(uint256[] memory) {
  return elements;
}
```

The 'elements' array can be returned since the order is insignificant.

We can include a helper function that will give us the number of elements in the set.

```solidity
function length() public view returns(uint256) {
  return elements.length;
}
```

This function can come in handy if we want to understand if the Set holds anything at all and if we're going to iterate over it ourselves.

## TL;DR

Solidity programming language does not have a built-in Set data structure. However, we can solve this issue by merging two existing Solidity structures - arrays and mappings. This approach enables us to build all the functions of a Set, such as adding unique elements, removing them, checking for their presence, and listing all current elements.

## Links

- [Sample code](https://gist.github.com/fassko/ebba36f92106f367db45d09043cb6547)

- [Mastering Arrays in Solidity](https://kristaps.me/blog/solidity-array/)
- [The Story behind Mapping in Solidity](https://kristaps.me/blog/solidity-mapping/)
- [Set in solidity?](https://ethereum.stackexchange.com/questions/69672/std-set-in-solidity)
- [Storage Patterns: Set](https://programtheblockchain.com/posts/2018/06/03/storage-patterns-set/)
- [Unordered Key Set](https://github.com/rob-Hitchens/UnorderedKeySet)
