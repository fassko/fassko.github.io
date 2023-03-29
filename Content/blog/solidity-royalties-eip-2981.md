---
date: 2023-03-28 00:00
title:  Implementing the ERC-2981 NFT royalty standard with Solidity - a game-changer for creators to receive income from every sale
tags: Solidity, web3
description: 
---

With the rise of NFTs on the Ethereum blockchain, creators can now monetize their digital art, music, videos, and other media in previously impossible ways. However, with the ownership and transfer of NFTs comes the question of royalties when creators receive payment for subsequent sales of their work. In this article, we will explore the concept of royalties in NFTs on Ethereum and how they are changing the landscape of digital ownership and creation.

## The NFT royalty standard

The ERC-2981, also known as the NFT Royalty Standard, is a proposal for a new Ethereum token standard that addresses this need. By implementing ERC-2981, creators can receive a percentage of each subsequent sale of their NFTs on the secondary market. It outlines rules for how royalty payments are calculated and transferred automatically to the creator's wallet whenever their NFT is resold on the secondary market.

Implementing ERC-2981 would provide a transparent and efficient way for creators to receive a fair share of the profits from their NFTs, regardless of how many times they are resold.

## OpenZeppelin NFT royalties implementation

OpenZeppelin is a widely recognized leader in the blockchain industry, and its Royalties Standard for NFTs builds on ERC-2981 to provide an even more comprehensive solution for tracking and distributing royalties. With OpenZeppelin's Royalties Standard, creators can rest assured that they are fairly compensated for their work and have greater control over how their creations are sold and distributed.

There are other implementations, or we can create our own according to the ERC-2981 standard, but that is out of the scope of this article.

## Using the NFT royalty standard

One of the many extensions OpenZeppelin provides is the ERC721Royalty extension, which adds a royalty payment mechanism to the ERC721 token standard.

The ERC721Royalty extension adds a new function to the ERC721 standard called `_setTokenRoyalty` for a specific NFT or `_setDefaultRoyalty` for all the NFTs. This function allows the creator of an NFT to set a percentage of each sale that will be paid as a royalty to the creator or a designated recipient. The royalty payment is automatically deducted from the sale price of the NFT and transferred to the designated recipient.

To use the `ERC721Royalty` extension, we must inherit our NFT smart contract from the `ERC721Royalty` and either set royalty. Let's check out both ways, setting it for all the NFTs and specific ones.

```solidity
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";

contract Royalties is ERC721Royalty {
// ...
}
```

### Setting royalties per NFT

To set the royalties fee per specific NFT, we need to use the `_setTokenRoyalty` function while minting the NFT. We need to provide the royalty-received address and fee numerator. The fee numerator is a percentage. For example, if an NFT is sold for 1 ETH and the royalty fee is set to 10%, the original creator would receive 0.1 ETH every time that NFT is sold in the future.

```solidity
function safeMint(
  address to, 
  uint256 tokenId, 
  address receiver, 
  uint96 feeNumerator
) public {
  _safeMint(to, tokenId);

  _setTokenRoyalty(tokenId, receiver, feeNumerator);
}
```

Now when minting an NFT, we can provide these values.

![Royalty per NFT](/assets/solidity-erc-721-royalties/royalty-per-nft.png)

For the fee numerator, we are specifying it as a percentage without coma. It means that **1000** is qualent to **10%**.

Now receiver will receive 10% from each resale on NFT marketplaces like OpenSea or Rarible.

### Setting royalties for all NFTs

The most straightforward way to specify a royalty fee is to configure that for all the NFTs equally. To do that, we can call the `_setDefaultRoyalty` function when deploying the smart contract. We need to provide the royalty fee receiver and fee numerator similar to what we did per each NFT.

```solidity
constructor(address _receiver, uint96 feeNumerator) 
  ERC721("Royalties", "RYLT") {
  _setDefaultRoyalty(_receiver, feeNumerator);
}
```

![Royalty for all NFTs](/assets/solidity-erc-721-royalties/royalty-all-nfts.png)

Now all the NFT resales on marketplaces will require a royalty fee of 10% to the receiver percentage.

## TL;DR

The NFT royalties enable creators to earn royalties on the secondary market sales of their NFTs, similar to how artists and musicians receive royalties when their work is resold.

ERC-2981 is a standard for NFTs that specifies how creators of NFTs can receive a percentage of any future sales or transfers of their NFTs.

The OpenZeppelin ERC721Royalty extension makes adding royalty functionality to your NFTs smart contracts easy.

## Links

* [Sample code](https://gist.github.com/fassko/e8f7c2b8bb263f8337845126a757f6c0)

* [ERC-2981: NFT Royalty Standard](https://eips.ethereum.org/EIPS/eip-2981)
* [The ERC-2981 implementation by OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/api/token/common#ERC2981)