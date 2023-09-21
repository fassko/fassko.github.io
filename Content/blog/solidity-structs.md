---
date: 2023-09-21 00:00
title: Structs in Solidity: Mastering Data Organization in Ethereum Smart Contracts
tags: Solidity, web3, errors
description: The Solidity programming language for Ethereum smart contracts, offers a robust feature known as **structs** that is indispensable in organizing and structuring information. These user-defined data types allow us to bundle variables under a single name, effectively creating blocks of organized data with set boundaries. Not only do structs enhance code readability and maintainability, but they also offer flexibility in instantiation. There are three ways to instantiate a struct in Solidity, each with advantages and use cases. In this blog post, we'll explore the nitty-gritty of Solidity structs, exploring their significance.
---

The Solidity programming language for Ethereum smart contracts, offers a robust feature known as **structs** that is indispensable in organizing and structuring information. These user-defined data types allow us to bundle variables under a single name, effectively creating blocks of organized data with set boundaries. Not only do structs enhance code readability and maintainability, but they also offer flexibility in instantiation. There are three ways to instantiate a struct in Solidity, each with advantages and use cases. In this blog post, we'll explore the nitty-gritty of Solidity structs, exploring their significance.

## Defining a struct

To define a struct, we should use the struct keyword, followed by the name you wish to give to the struct. Then, we enclose the variables (fields) within curly braces {}. Each field must be declared with its data type, followed by its name.

```solidity
struct Employee {
  string name;
  uint256 salary;
}
```

Here, we defined a struct `Employee` with two fields:

- `name` - `string` value that holds an employee name
- `salary` - `uint256` value that holds employee salary

After we have declared a struct, we can use it to declare variables and create arrays with it.

One interesting thing with structs is that a struct can hold a struct, which can open new doors. Let's imagine an employee struct can have managers.

```solidity
struct Employee {
  string name;
  uint256 salary;
  Employee[] managers;
}
```

## Three Ways to Instantiate a Solidity Struct

Solidity offers three distinct methods for instantiating a struct, each with its advantages and applications. Let's check them out.

### Initializing Structs as Key-Value Pairs

One of the most straightforward and intuitive methods to instantiate a struct in Solidity is using key-value pairs. This approach allows developers to explicitly assign values to the individual fields within the struct at its creation. Doing so makes the code more readable and self-explanatory, as each value is directly associated with its corresponding key (field name).

```solidity
Employee memory employee = Employee({name: name, salary: salary});
```

### Updating each value

In Solidity, another viable approach to instantiate a struct is declaring an instance and then updating each field separately. This method offers the advantage of incremental initialization, allowing developers to populate the struct's fields step-by-step, which can be particularly useful in conditional logic or complex workflows.

```solidity
Employee memory employee;
employee.name = name;
employee.salary = salary;
```

Initially, all fields are set to their default values, such as an empty string for `name` and zero for `salary`.

This method provides a flexible way to manage data, as you can modify each field based on specific conditions or computations, thereby offering granular control over the struct's initialization.

### Passing values

In Solidity, one of the most straightforward methods for instantiating a struct is by directly passing values to its fields in the order they are declared. This technique is handy for quick and straightforward initializations where the values for all fields are readily available.

```solidity
Employee memory employee = Employee("Mary", 110000);
```

While this method is efficient, it requires us to remember the order of the fields, making it less self-explanatory than other methods like key-value pair initialization. Nonetheless, for simple structs with a limited number of fields, this remains a quick and effective way to instantiate a struct.

## TL;DR

In Solidity, structs are user-defined data types that allow us to group multiple variables of different types under a single name, making it easier to manage and organize data in your smart contracts. We can define a struct using the struct keyword and then instantiate it in various ways: by directly passing values in the order they're declared, using key-value pairs for explicit field assignment, or creating an empty instance and updating each field individually. Whether we're building simple or complex smart contracts, mastering structs is essential for writing clean, efficient, and maintainable code.

## Links

- [Sample code](https://gist.github.com/fassko/6f1c75f9c78766f73272cbb8930a0b5f)

- [Learn Solidity: What is a struct?](https://www.alchemy.com/overviews/solidity-struct)
- [Solidity by example: Structs](https://solidity-by-example.org/structs/)
