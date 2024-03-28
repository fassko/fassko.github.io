---
date: 2024-03-28 00:00
title: Understanding Escrow in ERC-721 Smart Contracts
tags: ethereum, solidity, nft
description: The ERC-721 standard helps make buying and selling unique digital items (NFTs) safe and reliable. It is crucial to secure transactions between two parties. That is where escrow services come in. They act like a safety net, holding an NFT until everyone agrees and all rules have been met. Let's explore how we can develop an escrow using the ERC-721 standard using OpenZeppelin implementation.
---

The ERC-721 standard helps make buying and selling unique digital items (NFTs) safe and reliable. It is crucial to secure transactions between two parties. That is where escrow services come in. They act like a safety net, holding an NFT until everyone agrees and all rules have been met. Let's explore how we can develop an escrow using the ERC-721 standard using OpenZeppelin implementation.

## Sending an NFT to an Escrow

At first, the NFT asset holder needs to approve that a specific token can be used by someone else to transfer it. Only the owner of that token can execute this command.

With the implementation of OpenZeppelin ERC-721, we can call the `approve(address to, uint256 tokenId)` function to delegate it.

```solidity
// Send to ESCROW address
function sendToESCROW(address escrow, uint256 tokenId) public {
  approve(escrow, tokenId);
}
```

In the code above, when the owner of the `tokenId` calls this function, they delegate transfer functionality to the `escrow` address. Now the `escrow` account holder can transfer this NFT to another address.

We can get an approved address to check if the token has been delegated to another account. If it is a zero (`0x`) address, that means it has not been delegated.

```solidity
// Returns the ESCROW address
// 0x address means that this NFT has not been sent to ESCROW
function isSentToESCROW(uint256 tokenId) public view returns(address) {
  return _getApproved(tokenId);
}
```

## Removing from an Escrow

If the owner of the NFT changes their mind and wants to remove the delegation, they can do so by setting the approval address to zero (`0x`) address. In Solidity language, there is no concept of null values. The default value of an `address` type is zero (`0x`).

```solidity
// Remove from ESCROW
function removeFromESCROW(uint256 tokenId) public {
  approve(address(0), tokenId);
}
```

## Execute Transfer from an Escrow

Suppose the token has been delegated to an escrow. The escrow can transfer it from the current owner to a new one because it has the right to do it.

```solidity
// Transfer to new owner from ESCROW
function transferFromEscrow(uint256 tokenId, address from, address to) public {
  safeTransferFrom(from, to, tokenId);
}
```

The OpenZeppelin ERC-721 implementation has the function `safeTransferFrom(address from, address to, uint256 tokenId)` that transfers a specific NFT `tokenId` from one account `from` to another `to`. The token must be owned by the `from` address. The caller is the escrow, and it has the right to move ownership of this NFT.

## TL;DR

The ERC-721 standard and OpenZeppelin's implementation allow safe and reliable buying and selling of NFTs with escrow services. We can send an NFT to an escrow, check if an NFT has been delegated to an escrow, and remove an NFT from escrow. The escrow account holder can execute a transfer to a new owner. Using escrow allows all the parties to agree when the transfer happens when all the rules have been met.

## Links

- [Demo code](https://gist.github.com/fassko/f244139e246091225ecfebc2e77984b7)

- [ERC-721: Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC 721](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721)
