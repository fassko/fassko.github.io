---
date: 2023-05-11 00:00
title: Programmatically Verifying Solidity Smart Contract Code with Hardhat
tags: Solidity, web3, hardhat
description: In a previous [blog post](/blog/solidity-verify-smart-contract/), we discussed the importance of verifying Solidity smart contracts before deploying them onto the blockchain. However, there is a way to automate that process and make it more efficient. With the help of Hardhat, a popular development environment for Ethereum, developers can now verify their smart contract code programmatically as part of the deployment process. This means the verification process can be integrated into the development pipeline, ensuring the code is verified automatically each time the contract is deployed. This blog post will explore how to use Hardhat to verify smart contract code and streamline the verification process programmatically.
---

In a previous [blog post](/blog/solidity-verify-smart-contract/), we discussed the importance of verifying Solidity smart contracts before deploying them onto the blockchain. However, there is a way to automate that process and make it more efficient. With the help of Hardhat, a popular development environment for Ethereum, developers can now verify their smart contract code programmatically as part of the deployment process. This means the verification process can be integrated into the development pipeline, ensuring the code is verified automatically each time the contract is deployed. This blog post will explore how to use Hardhat to verify smart contract code and streamline the verification process programmatically.

## Hardhat Runtime Environment

HRE stands for Hardhat Runtime Environment. It provides a robust set of tools and APIs that can be used to verify the correctness of a smart contract code programmatically. Verification is an essential step in the development process of smart contracts, as it ensures that the code behaves as intended and is secure.

## Veryfing smart contract programmatically

To programmatically verify a smart contract with HRE, we should use a plugin called `hardhat-etherscan` in combination with the HRE subtask `verify:verify`.

To verify the smart contract automatically, we need to pass:

- the network name that we can get from the Hardhat Network addon;
- smart contract address;
- constructor agruments.

We should wait for the deploy transaction to be finished to avoid problems when verifying a smart contract that hasn't been deployed yet.

Let's now put it all together in a Hardhat script.

```javascript
import hre, { network, ethers } from "hardhat";

async function main() {
  const SaveNumber = await ethers.getContractFactory("SaveNumbero");

  const number = 6;

  const saveNumber = await SaveNumber.deploy(number);

  await saveNumber.deployed();

  console.log(`SecretNumber deployed to ${saveNumber.address}`);

  try {
    console.log("\nEtherscan verification in progress...");
    await saveNumber.deployTransaction.wait(6);
    await hre.run("verify:verify", {
      network: network.name,
      address: saveNumber.address,
      constructorArguments: [number],
    });
    console.log("Etherscan verification done. ✅");
  } catch (error) {
    console.error(error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

## TL;DR

Automated smart contract verification with HRE provides a much more streamlined and efficient way to verify smart contract code than manually verifying it from the terminal. It saves time and reduces the chances of errors compared to manual verification from the terminal.

## Links

- [How Hardhat Simplifies Smart Contract Verification on Ethereum](https://kristaps.me/blog/solidity-verify-smart-contract/)
- [Hardhat Runtime Environment (HRE)](https://hardhat.org/hardhat-runner/docs/advanced/hardhat-runtime-environment#hardhat-runtime-environment-hre)
- [`hardhat-verify` documentation](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#using-programmatically)
