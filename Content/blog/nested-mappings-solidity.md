---
date: 2024-02-28 00:00
title: Exploring Nested Mappings in Solidity
tags: ethereum, solidity
description: Nested mappings in Solidity offer developers powerful tools to efficiently organize and manipulate complex data structures. This blog post explores how to use nested mappings and their practical applications and provides transformative examples in smart contract development.
---

Nested mappings in Solidity offer developers powerful tools to efficiently organize and manipulate complex data structures. This blog post explores how to use nested mappings and their practical applications and provides transformative examples in smart contract development.

## Nested Mapping in Solidity

In Solidity, nested mapping involves using one mapping as the value type within another mapping. This technique enables developers to create multidimensional data structures within Ethereum smart contracts. Nested mappings facilitate hierarchical relationships between data elements.

In this post, we'll delve into an illustrative example showcasing how to organize employee records based on their respective departments efficiently.

First, we need to define a nested mapping. We can achieve that like a [regular mapping](/blog/solidity-mapping/), but we use another mapping instead of type.

```solidity
mapping(string => mapping(address => Employee)) private employees;
```

In this example, we will use a [Solidity struct type](/blog/solidity-structs/) that holds employee data like name and salary.

```solidity
struct Employee {
  string name;
  uint256 salary;
}
```

## Storing Values in a Nested Mapping

When storing a value in a Solidity nested mapping, assigning the value based on the corresponding key pairs is essential. In our example, we use `department` and `address` keys. These keys are pivotal in structuring our example's nested mapping data.

```solidity
employees[department][_address] = Employee(name, salary);
```

From the code provided above, it's evident that each employee record is stored within a specific department and is uniquely identified by the employee's blockchain address. This organizational structure allows efficient retrieval and management of employee data within the nested mapping, ensuring clarity and accessibility across departments.

## Retrieving Values from a Nested Mapping

To retrieve a value from a nested mapping, it's essential to possess the corresponding keys for both the `department` and the employee's `address`. The retrieved value could either be the employee record or the default values of the `Employee` type. For instance, for the `uint256` type, the default value is zero (`0`). This mechanism enables us to ascertain the existence of the value within the mapping structure.

```solidity
Employee memory employee = employees[department][_address];
```

We can use the `require` statement to check if the value exists and show an error if it does not.

```solidity
require(employee.salary != 0, "Employee does not exist");
```

## Integrating the Code

Now, let's put all the code together. This code shows how we can save and retrieve a value in Solidity nested mapping.

```solidity
contract NestedMapping {
  struct Employee {
    string name;
    uint256 salary;
  }

  mapping(string => mapping(address => Employee)) private employees;

  function getEmployee(string memory department,
                      address _address) external view returns (Employee memory) {
    Employee memory employee = employees[department][_address];
    require(employee.salary != 0, "Employee does not exist");
    return employee;
  }

  function addEmployee(string memory department,
                      address _address,
                      string memory name,
                      uint256 salary)
  external {
    require(_address != address(0), "Invalid address");
    require(bytes(name).length > 0, "Name cannot be empty");
    require(employees[department][_address].salary == 0, "Employee already exists");

    employees[department][_address] = Employee(name, salary);
  }
}
```

## TL;DR

Solidity nested mappings are versatile data structures that allow developers to organize and manage complex data within Ethereum smart contracts. Nested mappings facilitate efficient data retrieval and manipulation by associating multiple keys with corresponding values. They enable hierarchical data organization, empowering developers to create dynamic and structured storage solutions tailored to decentralized application (dApp) requirements.

## Links

- [Demo code](https://gist.github.com/fassko/5b7e40bb62a1605163a6bf3fd999fbeb)

- [Official documentation](https://docs.soliditylang.org/en/v0.8.13/types.html)
- [Solidity by Example - Mapping](https://solidity-by-example.org/mapping/)
