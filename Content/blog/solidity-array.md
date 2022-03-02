---
date: 2022-03-01 00:00
title: Mastering Arrays in Solidity
tags: swift, solidity, web3, array
description: Arrays in Solidity programming language can hold primitive data types like integers, boolean, and string. An array can be initialized with a fixed or dynamic size. If we compare them to other more advanced programming languages, there are pretty limited functions available to work with arrays. Despite that, we can add, remove, get the size of the array, and more.
---

Arrays in Solidity programming language can hold primitive data types like integers, boolean, and string. An array can be initialized with a fixed or dynamic size. If we compare them to other more advanced programming languages, there are pretty limited functions available to work with arrays. Despite that, we can add, remove, get the size of the array, and more.

##  Initialize an array

We can create an array in Solidity, either having a dynamic or fixed size of the elements that it can hold.

Using a fixed-size array can reduce gas costs but not always we can predict the size of the elements.

### Dynamic size

When creating a dynamic array in Solidity, we need to provide the data type that it can hold. Unfortunately, arrays can't have multiple data types in one array.

```
uint256[] array;
```

### Fixed size

Another option is to provide the size of the elements that an array can hold. This can save gas costs, especially when creating smart contracts on the Ethereum blockchain.

```
uint256[10] array;
```

Behind the scenes, Solidity fills the array with default values, which for the `uint256` is 0 (zero).

We can also provide the values when initializing an array.

```
uint256[] array = [1,2,3];
```

## Add an element

We can add a new element for the dynamic type of arrays. To do that, we need to use the `push` method. It adds an element to the end of an array.

Here is an example of adding 100 to the array that holds `uint256` values.

```
array.push(100);
```

## Change an element

When changing an element, we need to provide the index and the new value.

Let's say we want to change the first element's value in the array.

```
array[0] = 101;
```

## Get the size of the array

To get the size of the array then, we should use the `length` function.

```
uint256 size = array.length;
```

## Remove

We can remove an element from array by using the `delete` function. The catch here is that it doesn't change the size of the array. It resets to the default value, which for instance, in the `uint256` case is 0 (zero).

This example resets the first element in the array to 0 (zero).

```
delete array[0];
```

If we want to remove an element and change the array's length, we can move all elements up from the element we want to delete. Then pop the last element because it isn't needed anymore.

```
for (uint256 i = _index; i < _array.length - 1; i++) {
    _array[i] = _array[i + 1];
}
_array.pop();
```

## TL;DR

Arrays in Solidity programming language can hold primitive data types like `uint`, `boolean`, `address`, or `string`. We can create a fixed or dynamic size array. A fixed-size array has less implications for gas costs. We can change elements, remove, get the size of the array.

## Links

* [Sample code](https://gist.github.com/fassko/de8a9ca0657d25d656b7ad19b1705ce2)

* [Official documentation](https://docs.soliditylang.org/en/v0.8.11/types.html)
* [Solidity by Example - Array](https://solidity-by-example.org/array/)
