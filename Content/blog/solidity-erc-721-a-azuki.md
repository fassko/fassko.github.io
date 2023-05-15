---
date: 2023-05-15 00:00
title: Exploring the Features and Benefits of Azuki's ERC-721A NFT Standard
tags: Solidity, web3, erc721, nft
description: NFT minting on Ethereum can be expensive due to the high gas fees associated with executing intelligent contract transactions on the blockchain. Previously [we learned](https://kristaps.me/blog/solidity-erc-721/) how to use the ERC-721 standard, but there is an improved standard, ERC-721A, by Azuki. It gives enormous gas savings when minting multiple NFTs in one transaction. Minting five NFTs can save 7.2 times gas compared to the original ERC-721 standard. Let's check it out in this article.
---

NFT minting on Ethereum can be expensive due to the high gas fees associated with executing intelligent contract transactions on the blockchain. Previously [we learned](https://kristaps.me/blog/solidity-erc-721/) how to use the ERC-721 standard, but there is an improved standard, ERC-721A, by Azuki. It gives enormous gas savings when minting multiple NFTs in one transaction. Minting five NFTs can save 7.2 times gas compared to the original ERC-721 standard. Let's check it out in this article.

## ERC-721A vs ERC-721

The ERC-721A standard, compared to the original ERC-721 standard, has some distinctive differences:

The most significant difference between the ERC-721A and the original ERC-721 standards is that ERC-721A includes additional features and functionality not present in ERC-721. For example, ERC-721A allows for dynamic minting of NFTs, meaning they can be minted on-demand rather than having to pre-mint them all at once. This feature can be more cost-effective and efficient for users who don't need to mint a large number of NFTs upfront.

To gain such gas savings Azuki team has implemented an approach. It keeps an address in the records and how many NFTs are in a sequence. For instance, Mary mints five NFTs starting from number 100. Essentially it will hold data that the owner of the #100 is Mary, and the next five will be without an owner. Using this approach, the ERC-721A standard can achieve significant gas savings because there is no need to mint every five NFTs. Azuki team has calculated that minting one NFT with the ERC-721 is 154,814 gas; with the ERC-721A, it is 76,690. Minting five NFTs, respectively, it is 616,914 and 85,206. It is 7.2 times more gas!

## Using the ERC-721A

Using the ERC-721A is very straightforward and similar to the original ERC-721 standard.

After we install the `erc721a` package in our project, we can import it into the smart contract.

```solidity
import "erc721a/contracts/ERC721A.sol";
```

After that, we must extend our NFT smart contract from the `ERC721A` and create a constructor like we would use the OpenZeppelin implementation.

```solidity
contract GasSaverNFT is ERC721A {
  constructor(
    string memory name_,
    string memory symbol_
  ) ERC721A(name_, symbol_) {}
```

The most significant difference is with minting the NFT. We need to pass the `_safeMint` function not only the address we want to mint to but also the quantity.

```solidity
function safeMint(address to, uint256 quantity) public {
  _safeMint(to, quantity);
}
```

Putting it all together, we have a concise and sweet Solidity smart contract.

```solidity
import "erc721a/contracts/ERC721A.sol";

contract GasSaverNFT is ERC721A {
  constructor(
    string memory name_,
    string memory symbol_
  ) ERC721A(name_, symbol_) {}

  function safeMint(address to, uint256 quantity) public {
    _safeMint(to, quantity);
  }
}
```

To keep this example simple, we're omitting the metadata storage functionality.

## TL;DR

The ERC-721A is a more flexible and robust standard for creating and managing NFTs on the Ethereum blockchain, with additional features that can help to address some of the limitations and challenges of the original ERC-721 standard. The biggest gain is the gas-saving aspect when minting multiple NFTs. Minting five NFTs can save 7.2 times gas compared to the original ERC-721 standard.

## Links

- [Introducing erc721a: An improved erc721 implementation](https://www.azuki.com/erc721a)
- [ERC721 vs. ERC721A: Batch Minting NFTs](https://www.alchemy.com/blog/erc721-vs-erc721a-batch-minting-nfts)
- [ERC-721: Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-721)
- [What are an NFT and the ERC-721 standard?](https://kristaps.me/blog/solidity-erc-721/)
