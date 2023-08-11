---
date: 2023-08-11 00:00
title: Beyond Default Messages: Mastering Custom Errors in Solidity
tags: Solidity, web3, errors
description: Solidity's custom errors offer significant advantages in blockchain development, enhancing smart contract robustness and clarity. These errors provide detailed and precise error messages, improving the ease of issue diagnosis. Additionally, they strengthen code readability by allowing for clear naming of error conditions and improve gas efficiency by enabling compact encoding of error information. Embracing these custom errors can revolutionize your Solidity development experience. Let's see how we can use custom errors in our Ethereum smart contracts.
---

Solidity's custom errors offer significant advantages in blockchain development, enhancing smart contract robustness and clarity. These errors provide detailed and precise error messages, improving the ease of issue diagnosis. Additionally, they strengthen code readability by allowing for clear naming of error conditions and improve gas efficiency by enabling compact encoding of error information. Embracing these custom errors can revolutionize your Solidity development experience. Let's see how we can use custom errors in our Ethereum smart contracts.

## Defining Custom Errors

In Solidity, defining a custom error is a straightforward process that enhances the clarity and specificity of error messages in smart contracts. To define a custom error, you use the error keyword followed by a unique name for the error. If you want to include specific details or parameters in the error message, add them in parentheses after the error name.

```solidity
error NumberTooHigh(uint256 from, uint256 number);
```

Or we can omit the parameters and define a custom error with them.

```solidity
error Unauthorized();
```

## Using Custom Error

Once defined, we can trigger this error using the revert statement followed by the error name and required parameters. This approach makes the code more readable and provides a clear context for the error, aiding developers in diagnosing and addressing issues more efficiently.

We can use the' revert' keyword to utilize errors that don't require parameters. Then, we specify the desired custom error name and call it a regular function.

```solidity
revert Unauthorized();
```

To use a custom error with parameters, we must pass the error name and parameters when reverting, similar to how we would pass them in a function.

```solidity
revert NumberToLow(from, number);
```

## Consuming custom errors

When utilizing a smart contract that has custom errors, it can provide users with more specific explanations of what went wrong. By utilizing libraries such as ethers.js or web3.js, developers have a more effective means of managing and presenting information to users.

Using the Remix test environment, we can see how a custom error is present in the log console.

![Sh](/assets/solidity-custom-errors/remix-custom-error.png)

## TL;DR

Custom errors in Solidity can improve the transparency and effectiveness of smart contract code, providing more insightful feedback for developers and smart contract consumers, for instance, using a Web3 library. Adding them to your toolkit can be highly beneficial and reduce gas costs.

## Links

- [Sample code](https://gist.github.com/fassko/b22c722f1d488528791f8c99e42c6a73)

- [Custom Errors in Solidity](https://soliditylang.org/blog/2021/04/21/custom-errors/)
- [Embracing Custom Errors in Solidity](https://dev.to/george_k/embracing-custom-errors-in-solidity-55p8)
- [`revert` documentation](https://docs.soliditylang.org/en/v0.8.21/control-structures.html#revert)