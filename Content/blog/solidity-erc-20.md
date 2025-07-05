---
date: 2022-09-05 00:00
title: Exploring ERC20 fungible token standard in Solidity
tags: Solidity, web3, ER-C20
description: This time let's talk about fungible tokens, one of the main building blocks in DeFi. These tokens can represent coins, gold, grain, and other assets that can be exchanged for them. We will look into one of the first Ethereum Improvement Proposal with number 20. This token standard is widely known as ERC20 and describes an interface for tokens within smart contracts. Functions like token transferring, approving spending, creating, and others are defined by this ERC20 standard.
---

This time let's talk about fungible tokens, one of the main building blocks in DeFi. These tokens can represent coins, gold, grain, and other assets that can be exchanged for them. We will look into one of the first Ethereum Improvement Proposal with number 20. This token standard is widely known as ERC20 and describes an interface for tokens within smart contracts. Functions like token transferring, approving spending, creating, and others are defined by this ERC20 standard.

To illustrate the ERC20 standard in code, we will use [OpenZepplin ERC20](https://docs.openzeppelin.com/contracts/4.x/erc20) implementation.

## Minting and burning

There are two main actions with total token supply. We can use either mint or burn them. Minting means creating more supply, and burning means decreasing supply once we need to do so.

### Minting

To create a token supply, we need to mint this amount. When we are minting behind, the scenes caller that calls this function receives provided amount of tokens.

Let's create a smart contract that would act as an ERC20 token. In the constructor, we need to provide the total token supply and call OpenZepplin's `ERC20` implementation constructor, providing the token name and symbol.

```solidity
contract FungibleToken is ERC20 {
  constructor(uint256 totalSupply) ERC20("MyBestToken", "BTKN") {
    _mint(msg.sender, totalSupply);
  }
```

When we want to deploy this contract, we should provide the `totalSupply`. I want to mention that we are using [Remix development IDE](https://remix-project.org/).

![Deploy and mint tokens](/assets/solidity-erc20/deploy-mint-tokens.png)

We can issue more tokens if that is needed by minting more.

### Burning

When we need to decrease the value of total tokens available in circulation, we can burn them. Token burning means that we send a specific number of tokens to zero address `0x0000000000000000000000000000000000000000`, and it is locked forever because nobody has an access to this address.

```solidity
function burn(uint256 burnAmount) external {
    _burn(msg.sender, burnAmount);
  }
```

To burn tokens, we need to pass the address that is the same that minted the tokens and the amount we want to burn.

## Utility functions

A couple of utility functions from the ERC20 standard helps us to find token information and balances.

### Token information

Once the smart contract is deployed on the chain, anyone can see the name, symbol, and decimals. The only thing that is needed is the token smart contract address.

![Token information](/assets/solidity-erc20/token-information.png)

### Balances

ERC20 standard, in essence, holds the mapping of addresses and the amount it has. It means that at any given time, we can ask balance of the specific address. It is publicly visible and accessible. Of course, we don't know who is behind this address, nor can we change the amount.

![Token balance](/assets/solidity-erc20/erc20-balance.png)

Behind the scenes, the ERC20 OpenZepplin standard keeps balances in a mapping where the key is an address, and the value is `uint256`. No magic at all.

```solidity
mapping(address => uint256) private _balances;
```

## Transfers

I lied a bit when I told you that we couldn't change the amount of tokens that an address holds. We can transfer tokens to an address or give transfer rights to an address. Transfer rights mean we give rights to another address to spend a concrete amount of tokens on our behalf.

### Transfer tokens

Once we hold an amount of ERC20 tokens, we can send it not exceeding the total amount to any address. That also includes zero address `0x0000000000000000000000000000000000000000` which technically means burning.

![ERC20 transfer](/assets/solidity-erc20/erc20-transfer.png)

In the ERC20 implementation, it is described that once we transfer tokens, amount we send is deducted from our balance and increased for the address we send it to. It checks if we have enough tokens to transfer and if we're not exceeding our balance. Remember, we are constantly working with the token amount balance sheet.

### Transfer tokens on behalf

Giving transfer rights to someone else might sound complicated, but it is widely used in DeFi, where we provide Ethereum smart contract rights to operate with our tokens. For instance, smart contract swaps tokens put them in a liquidity pool, or we want to take a loan providing collateral for our tokens.

First, we need to give the rights to an address and provide what will be the maximum amount that it can operate with. ERC20 implementation will also check if we are not exceeding available tokens and reserve token allowance in internal mapping.

```solidity
mapping(address => mapping(address => uint256)) private _allowances;
```

This mapping key is the address of the token holder. Then the value is another mapping where the key is the spender address and amount allowed to spend.

![ERC20 transfer](/assets/solidity-erc20/erc20-approve.png)

After giving spending rights, we can decrease or increase the allowance for the spender.

Now the spender can send our reserved token amount to any other address providing the token holder address, address sending to, and token amount to be transferred.

![ERC20 transfer from](/assets/solidity-erc20/erc20-transfer-from.png)

In the ERC20 standard implementation, allowances and balances are being changed accordingly. The spender allowance is decreased by the provided token amount, and the receiver's balance is increased.

## TL;DR

ERC20 is one of the first standards within Ethereum Improvement proposals. It describes a smart contract that holds fungible token balances and transfers between addresses. It also talks about additional features like allowing to spend on behalf of the token holder. It is the gold standard for tokens on EVM chains.

## Links

* [Sample code](https://gist.github.com/fassko/9a25b7249394cf20625d705364ff469b)

* [EIP-20: Token Standard](https://eips.ethereum.org/EIPS/eip-20)
* [ERC-20 - Ethereum documentation](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)
* [ERC-20 by Investopedia](https://www.investopedia.com/news/what-erc20-and-what-does-it-mean-ethereum/)
* [ERC20 - OpenZepplin documentation](https://docs.openzeppelin.com/contracts/4.x/erc20)
* [ERC20 - OpenZepplin implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
* [SolidState ERC20 implementation](https://github.com/solidstate-network/solidstate-solidity/blob/master/contracts/token/ERC20/SolidStateERC20.sol)