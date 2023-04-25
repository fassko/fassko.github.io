---
date: 2023-04-24 00:00
title: How Hardhat Simplifies Smart Contract Verification on Ethereum
tags: Solidity, web3, hardhat
description: Smart contract verification is crucial for ensuring transparency, trust, and safety for users in the blockchain ecosystem. Smart contracts are immutable. Once deployed on the blockchain, they cannot be modified or deleted, making verification an essential process to ensure their correctness and safety. Verifying smart contracts with Hardhat tooling is a straightforward process that can be done quickly and easily. It provides a simple and effective way to verify smart contracts on the Ethereum network.
---

Smart contract verification is crucial for ensuring transparency, trust, and safety for users in the blockchain ecosystem. Smart contracts are immutable. Once deployed on the blockchain, they cannot be modified or deleted, making verification an essential process to ensure their correctness and safety. Verifying smart contracts with Hardhat tooling is a straightforward process that can be done quickly and easily. It provides a simple and effective way to verify smart contracts on the Ethereum network.

## Setting up the Etherscan Hardhat plugin

The Etherscan Hardhat plugin is a powerful tool that allows developers to quickly verify and deploy their smart contracts on the Ethereum network. The plugin integrates Etherscan's smart contract verification services directly into the Hardhat workflow, making it easy for developers to ensure the correctness and security of their contracts.

To use the Hardhat Etherscan plugin, we must first install the Hardhat development environment on our system. Once Hardhat is installed, the plugin can be installed with the following command:

```sh
npm install @nomiclabs/hardhat-etherscan --save-dev
```

After installing the plugin, we need to configure their Hardhat project to use it. We should import the Etherscan plugin and set the API key for the network we will use. In our example, we are going to use the Polygon Mumbai test network.

```javascript
import "@nomiclabs/hardhat-etherscan";

module.exports = {
  // ...
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_API_KEY,
    },
  },
};
```

We can obtain the Etherscan API key from the respective block explorer website by generating an API key. Once the API key is obtained, it can be added to the configuration file. In our case, we will use the `.env` environment variables file.

## Verifying the smart contract

Now that we have done the initial set, we should deploy the smart contract and get the address that is deployed. At this point, the smart contract on the block explorer site isn't verified.

![Verified smart contract](/assets/verify-contract/unverified-smart-contract.png)

After that, we should use the `hardhat verify` command to deploy and verify their smart contracts on the Ethereum networks. The command takes as an argument contract address and the deployment constructor arguments.

```sh
npx hardhat verify --network mumbai 0x58Bf1271f457F4972f4253C179a0C013737C4232 6
```

In this example, the contract address is `0x58Bf1271f457F4972f4253C179a0C013737C4232` and the when the contract was deployed the initial argument was `6`.

Now our smart contract has been successfully verified, and we can verify that on the block explorer.

![Verified smart contract](/assets/verify-contract/verified-smart-contract.png)

## TL;DR

We should verify the smart contracts to ensure trust and transparency for our users.

The Hardhat Etherscan plugin provides a streamlined and efficient way for developers to verify our smart contracts on the Ethereum networks.

## Links

- [Sample code](https://gist.github.com/fassko/e8f7c2b8bb263f8337845126a757f6c0)

- [Hardhat documentation](https://hardhat.org/hardhat-runner/docs/guides/verifying)
- [Different Ways to Verify Your Smart Contract Code](https://www.quicknode.com/guides/ethereum-development/smart-contracts/different-ways-to-verify-smart-contract-code/)
- [Verifying Smart Contracts](https://ethereum.org/en/developers/docs/smart-contracts/verifying/)
- [A Guide to Smart Contract Verification](https://blog.tenderly.co/guide-to-smart-contract-verification-methods/)
- [Verify Contracts Perrrrrfectly: Why and How?](https://docs.sourcify.dev/blog/verify-contracts-perfectly/)
