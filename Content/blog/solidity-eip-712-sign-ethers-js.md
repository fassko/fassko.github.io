---
date: 2023-02-27 00:00
title: Understanding the Signing Process of Solidity Transactions with Ethers.js
tags: Solidity, web3, ethersjs
description: 
---

In the previous [post](/blog/solidity-eip-712-sign-metamask/), we discussed meta transactions and the EIP-712 standard. This time we will check out how to sign the transaction with Ethers.js library and execute it in the smart contract. That means that the gas fee will be paid by someone else.

## Package up the transaction

At first, we need to create the transaction and package it up with all the required components according to the EIP-712 standard. We need three main parts:

* define used types in the message;
* domain information to verify the transaction in the smart contract;
* transaction message that holds the data.

### Create an unsigned transaction

To create an unsigned transaction when calling a smart contract function, we need to use the `populateTransaction` [function](https://docs.ethers.org/v5/api/contract/contract/#contract-populateTransaction) from the EthersJS library. It returns an unsigned transaction that must be signed and submitted to the blockchain network.

Let's have a smart contract function that will set the current employee.

```solidity
struct EmployeeData {
  uint256 employeeId;
  string employeeName;
}

EmployeeData private currentEmployee;
  
function set(uint256 id, string memory name) external {
  currentEmployee = EmployeeData(id, name);
}
```

When creating the transaction, we need to provide all the function parameters and execute it.

```solidity
const transaction = await employee.populateTransaction.set(1, 'John');
```

It will return a transaction object that contains data which is a function signature, `from` address, `to` smart contract address and gas limit. We are primarily interested in the function signature that is a hex value. In the beginning, is the hashed function name followed by all the parameter values.

```javascript
{
  data: '0x64371977...00',
  to: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  gasLimit: BigNumber { value: "29022232" }
}
```

### Putting together the message

Let's start with the types object, which has only three parts:

* nonce to avoid duplicate transactions;
* from the address that is the signer of the transaction;
* function signature, which we already create.

```javascript
const types = {
  "MetaTransaction": [
    {
      "name": "nonce",
      "type": "uint256"
    },
    {
      "name": "from",
      "type": "address"
    },
    {
      "name": "functionSignature",
      "type": "bytes"
    }
  ]
};
```

Next is the domain object, which has several parts defined:

* name of the domain to differ transaction in another smart contract;
* the EIP-712 standard version, which in our case will be 1;
* verifying smart contract address that we can get from the unsigned transaction;
* `salt` is the chain id hex value padded with `0` until its length is 64 chars and starts with `0x`.

```javascript
const salt = ethers.utils.hexZeroPad(ethers.utils.hexValue(network.config.chainId ?? 0), 32);

const domain = {
  name: "Employee",
  version: "1",
  verifyingContract: transaction.to,
  salt: salt
};
```

Finally, we can create the message object, but first, we need to get the nonce from the blockchain smart contract. To do that, we need to pass in the signer's address. By using a nonce, we are avoiding a situation of duplicate transactions.

```javascript
const nonce = await employee.getNonce(signer.address);
```

The message object has three parts:

* the nonce that is provided by the smart contract;
* `from` address which is the signer address;
* function signature that we got previously from the unsigned transaction.

```javascript
const message = {
  "nonce": nonce,
  "from": signer.address,
  "functionSignature": transaction.data ?? ''
};
```

## Sign the transaction

We can sign the transaction now that we have all the needed parts defined in the EIP-712 standard, which describes how types are structured and hashed.

The Ethers.js library has a function `_signTypedData` that signs the data according to the EIP-712 specification. It is still an experimental function and will be renamed without the underscore, but many projects are using it in production already.

```javascript
const signature = await signer._signTypedData(domain, types, message);
```

### Verify the signature

As a result, we get a hashed signature from which we can get the signer and see that it is correct. The Ethers.js library has a utility function, `verifyTypedData` that verifies the transaction data and signature. In return, we get the signer wallet address.

```javascript
const signerAddress = ethers.utils.verifyTypedData(
  domain,
  types,
  message,
  signature
);
```

We have signed the transaction, and it is ready to be sent to the blockchain and executed by another wallet holder. That means our users don't need to pay the gas fees, but we can pay and execute transaction behalf of them. We will look at how to do that in one of the upcoming posts.

## TL;DR

Signing a transaction according to the EIP-712 standard with the Ethers JS library is straightforward. Thankfully this JavaScript library supports it and can be used right now. There are three steps - create a function signature, construct the transaction, and sign it. After that, it can be sent to the smart contract, and the gas fee can be paid by someone else.

## Links

* [Sample code](https://github.com/fassko/meta-transactions)

* [Ethers.js - Signing EIP712 Typed Structs](https://dev.to/zemse/ethersjs-signing-eip712-typed-structs-2ph8)
* [Ethers.js Signers documentation](https://docs.ethers.org/v5/api/signer/#signers)
* [EIP-712: Typed structured data hashing and signing standard](https://eips.ethereum.org/EIPS/eip-712)
