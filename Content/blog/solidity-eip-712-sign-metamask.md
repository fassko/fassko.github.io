---
date: 2023-01-28 00:00
title: What are meta transactions, the EIP-712 standard, and how to sign a message with Metamask? 
tags: Solidity, web3, Metamask
description: Meta transactions in Ethereum blockchain is an approach that removes the complexity for our users to deal with gas fees. The gas fee is a transaction fee paid to validators for proof of stake (POS) or miners for proof of work (POW) blockchains. With this approach, users sign a transaction, which is sent to a smart contract. It keeps all the security aspects upon which the Ethereum blockchain was created. This article will examine the EIP-712 standard and how to sign transactions with Metamask.
---

Meta transactions in Ethereum blockchain is an approach that removes the complexity for our users to deal with gas fees. The gas fee is a transaction fee paid to validators for proof of stake (POS) or miners for proof of work (POW) blockchains. With this approach, users sign a transaction, which is sent to a smart contract. It keeps all the security aspects upon which the Ethereum blockchain was created. This article will examine the EIP-712 standard and how to sign transactions with Metamask.

## What is EIP-712 standard?

EIP-712 standard describes how data is structured, hashed, and signed. Signing a transaction has been around in crypto wallets like Metamask, but this approach aims to display that in a much more human-readable way that users can understand and review before signing.

### Structure a typed data

The EIP-712 states how the typed data should be structured in a JSON document. Let's go over the main parts of it.

At first, we need to describe what the types would look like. It always starts describing the `EIP712Domain` type and follows with types that will be presented when signing.

Let's say we would like to add a new employee. That means we must introduce an `Employee` type with an inner `Address` type.

```javascript
types: {
    EIP712Domain: [
      {
        name: "name",
        type: "string"
      },
      {
        name: "version",
        type: "string"
      },
      {
        name: "verifyingContract",
        type: "address"
      },
      {
        name: "salt",
        type: "bytes32"
      }
    ],
    Employee: [
      { name: 'id', type: "uint256" },
      { name: 'name', type: 'string' },
      { name: 'address', type: 'Address' }
    ],
    Address: [
      { name: 'address', type: "string" },
      { name: 'country', type: "string" },
      { name: 'phoneNumber', type: "string" }
    ]
  }
```

After that, we should pass on information about the domain specifics.

Let's go over the fields:

* `name` is the smart contract name that this message will be sent to;
* `version` will always be `1`;
* `verifyingContract` is the smart contract address whose name is in `name` field;
* `salt` is the chain id in hex format that you can find the chain id from [chainlist.org](https://chainlist.org/).

```javascript
domain: {
  name: "AddEmployee",
  version: "1",
  verifyingContract: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  salt: "0x0...05"
  }
```

![Set account in developer console](/assets/eip-712/console-account.png)

After that, we will use the JSON data object we constructed according to the EIP-712 standard and save it in a variable.

```javascript
const msgData = JSON.stringify({
  types: {
    EIP712Domain: [
      {
        name: "name",
        type: "string"
      },
      {
        name: "version",
        type: "string"
      },
      {
        name: "verifyingContract",
        type: "address"
      },
      {
        name: "salt",
        type: "bytes32"
      }
    ],
    Employee: [
      { name: 'id', type: "uint256" },
      { name: 'name', type: 'string' },
      { name: 'address', type: 'Address' }
    ],
    Address: [
      { name: 'address', type: "string" },
      { name: 'country', type: "string" },
      { name: 'phoneNumber', type: "string" }
    ]
  },
  domain: {
    name: "AddEmployee",
    version: "1",
    verifyingContract: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    salt:
      "0x0...05"
  },
  primaryType: "Employee",
  message: {
    id: 1111,
    name: "John",
    address: {
      address: 'Infinity Loop 1',
      country: 'USA',
      phoneNumber: '+123456789'
    }
  }
});
```

![EIP-712 typed JSON data in developer console](/assets/eip-712/typed-data-console.png)

Now, we can finally sign the message by executing the `eth_signTypedData_v4` method.

```javascript
ethereum.request({method: "eth_signTypedData_v4", params: [account, msgData]})
```

Then Metamask will show the message data. We can once again verify if it is correct and sign it.

![Signing message with Metamask](/assets/eip-712/sign-message-metamask-console.png)

After we hit the sign button, we return the message hash that we can use in the smart contract.

![Message hash](/assets/eip-712/message-hash.png)

This data can be used on behalf of the signer to execute a smart contract on the blockchain, which we will look into in the next post.

## TL;DR

The EIP-712 standard opens doors to sign a transaction and allows someone else to use this transaction. It helps to implement gasless transactions to avoid our users paying the gas fee and figuring out how to get native tokens like Ethereum, Matic, and others. This standard describes how to format the message in human-readable form in a crypto wallet like Metamask when a user signs it. After it is signed, we can use this signed transaction in a smart contract, but more on that in one of the following blog posts.

## Links

* [EIP-712: Typed structured data hashing and signing](https://eips.ethereum.org/EIPS/eip-712)
* [Signing Data with Metamask](https://docs.metamask.io/guide/signing-data.html#signtypeddata-v4)
* [EIP712 is here: What to expect and how to use it](https://medium.com/metamask/eip712-is-coming-what-to-expect-and-how-to-use-it-bb92fd1a7a26)
* [Meta-Transactions](https://blog.smlxl.io/meta-transactions-28047138ef6d)
