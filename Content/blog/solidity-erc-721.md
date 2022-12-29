---
date: 2022-12-06 00:00
title: 
tags: Solidity, web3, ERC721
description: 
---

The non-fungible tokens, or in short NFTs, have one the most influential roles in the crypto and Web3 scene. These are digital assets that can represent digital art, virtual collectibles, assets in games, and more. Ethereum Foundation introduced the ERC-721 standard in 2017, which helped all the crypto wallets, brokers, and protocols to use this feature in a translatable way between any crypto solution. In this post, we will look more deeply into the ERC-721 standard and explore how it is used in the Solidity programming language for the Ethereum blockchain.

## What is an NFT?

Non-fungible tokens represent unique assets that can't be exchanged, copied, substituted, or divided. Each token has a unique identifier. Therefore, we can see who owns what.

An NFT can represent but is not limited to:

* digital work of art;
* virtual collectibles;
* digital assets in games;
* ownership rights, for instance, to a real estate;
* tickets that have a unique data like seating place;
* negative loan like a mortgage.

NFTs are like humans - there are no two people the same.

## The ERC-721?

To represent an NFT Ethereum foundation has standardized it with an ERC-721 token standard. This standard describes a table of who owns what. A standardized approach helps crypto wallets, brokers, and auctions to work with NFTs on Ethereum and other EVM  blockchains. The ERC-721 standard was launched in 2017 and authored by William Entriken, Dieter Shirley, Jacob Evans, and Nastassia Sachs. I met William Entriken at one of the NFT conferences.

### Functions

There are several functions defined in the ERC-721 standard. Let's look at the most important ones separately.

#### Ownewrship functions

These functions describe ownership rights.

* `balanceOf(address _owner)` returns a number of NFTS owned by `_owner` address;
* `ownerOf(uint256 _tokenId)` returns owner who owns token with the `_tokenId` identifier;

#### Transfer functions

These functions help to transfer a token.

* `safeTransferFrom(address _from, address _to, uint256 _tokenId)` transfers the token with the `tokenId` identifier from the `_from` address to the `_to` address checking that recipient is aware of the ERC-721 standard;
* `safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data)` similar to the function above with the option to send `data` to the to `_to` in a call, can be useful to send additional data;
* `approve(address _approved, uint256 _tokenId)` gives rights to the `_approved` to transfer the token with the `_tokenId` identifier;
* `getApproved(uint256 _tokenId)` returns the wallet address approved to transfer the token with `_tokenId` identifier;
* `setApprovalForAll(address _operator, bool _approved)` approve or remove approval for all the `msg.sender` assets to `_operator`;
* `isApprovedForAll(address _owner, address _operator)` cheks if   the `_operator` address has rights for the `_owner` assets.

### Events

Events help to notify about changes with the NFT. For instance, the web frontend can be updated.

`Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)` emits when the token with the `_tokenId` identifier is transfered from the `_from` to the `_to`.

`Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId)` emits when approval rights are given to the `_approved` to the token with the `_tokenId' identifier by the `_owner` who has ownership rights;

`ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved)` emits when `_owner` gives or removes rights to the `_operator` for their assets.

## Metadata extension

A commonly used ERC-721 extension is to describe metadata in a JSON format. It represents information about the token, like name, symbol, and token URI. Using this extension crypto wallets can ask for this information using three functions:

* `function name() external view returns (string _name)` returns a descriptive name;
* `function symbol() external view returns (string _symbol)` returns token symbol;
* `function tokenURI(uint256 _tokenId) external view returns (string)` returns URL to JSON file that describes the NFT. Usually, this is stored on IPFS.

The token URI points to a JSON file that conforms to the ERC721 Metadata JSON Schema:

```json
{
  "title": "Asset Metadata",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Identifies the asset to which this NFT represents"
    },
    "description": {
      "type": "string",
      "description": "Describes the asset to which this NFT represents"
    },
    "image": {
      "type": "string",
      "description": "A URI pointing to a resource with mime type image representing the asset to which this NFT represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive."
    }
  }
}
```

If you're unfamiliar with IPFS file storage, we will discuss that in one of the following posts.

## Putting it all together

The most straightforward way to implement NFTs is to use the OpenZepplin contracts suite that includes the `ERC721` and `ERC721URIStorage` contracts. It fully conforms to the ERC-721 and metadata extension standard.

Let's build an NFT ticketing smart contract.

First, we need to import OpenZepplin ERC-721 contract implementations and conform our smart contract to it.

```solidity
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Ticket is ERC721URIStorage {
    /// ...
}
```

At first, we need to define the NFT name and symbol. To do that, we will pass the event name and description to smart contract the constructor.

```solidity
constructor(
  string memory eventName,
  string memory shortName
) ERC721(eventName, shortName) {
  // initializes the NFT storage
}
```

Right now we can start minting NFTs because the OpenZepplin hides away all the nitty gritty implementation details.

```solidity
function createTicket(address visitor, string memory tokenURI) external {
  tokenId++;

  // mint the NFT and assign to the visitor address
  _mint(visitor, tokenId);

  // set the token JSON file link that was uploaded to the IPFS
  _setTokenURI(tokenId, tokenURI);

  console.log(tokenId);
}
```

All the ERC-721 functions discussed above come *for free* with the OpenZepplin contracts.

![ERC-721 functions](/assets/solidity-erc721/erc-721-openzepplin.png)

## TL;DR

The non-fungible tokens, or NFTs, differ much from regular ERC-20 tokens. It describes uniqueness. NFTs are like kitties - there are no two kitties alike. The most commonly used standard that defines NFTs is ERC-721, with metadata extension. It helps to attach metadata to the token, like images which is the most used feature in the crypto world.

## Links

* [Sample code](https://gist.github.com/fassko/5e2e60ce4625f53e82c1bd7d5c379722)

* [EIP-721: Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-721)
* [What is ERC-721? The Ethereum NFT Token Standard](https://decrypt.co/resources/erc-721-ethereum-nft-token-standard)
* [How to create and deploy an ERC-721 (NFT)](https://www.quicknode.com/guides/smart-contract-development/how-to-create-and-deploy-an-erc-721-nft)
* [ERC721 by OpenZepplin](https://docs.openzeppelin.com/contracts/3.x/erc721)