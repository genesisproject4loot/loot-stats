// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/*
LootBagClassification.sol
Lootverse Utility contract to gather stats for Loot (For Adventurers) Bags, Genesis Adventurers and other "bag" like contracts.

See OG Loot Contract for lists of all possible items.
https://etherscan.io/address/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7

All functions are made public incase they are useful but the expected use is through the main
4 stats functions:

- getClasses()
- getGreatness()
- getLevel()
- getRating()

Each of these take a Loot Bag ID.  This contract relies and stores the most current LootClassification contract.

The LootBagClassification(_TBD_) contract can be used to get "bag" level stats for Loot bag's tokenID.

So a typical use might be:

// get stats for loot bag# 1234
{
    LootBagClassification stats = 
        LootBagClassification(_TBD_);

    uint256 level = stats.getLevel(1234);
    uint256 greatness = stats.getGreatness(1234);
    uint256 rating = stats.getRating(1234);
    uint256 level = stats.getLevel([1234,1234,1234,1234,1234,1234,1234,1234]);
    uint256 greatness = stats.getGreatness([1234,1234,1234,1234,1234,1234,1234,1234]);
    uint256 rating = stats.getRating([1234,1234,1234,1234,1234,1234,1234,1234]);
}
*/
interface ILootClassification {
    enum Type
    {
        Weapon,
        Chest,
        Head,
        Waist,
        Foot,
        Hand,
        Neck,
        Ring
    }
    function getLevel(Type lootType, uint256 tokenId) external pure returns (uint256);
    function getGreatness(Type lootType, uint256 tokenId) external pure returns (uint256);
    function getRating(Type lootType, uint256 tokenId) external pure returns (uint256);
}

contract LootBagClassification is Ownable
{
    ILootClassification private lootClassification;    
    address public lootClassificationAddress;
    ILootClassification.Type[8] private itemTypes = [ILootClassification.Type.Weapon, ILootClassification.Type.Chest, ILootClassification.Type.Head, ILootClassification.Type.Waist, ILootClassification.Type.Foot, ILootClassification.Type.Hand, ILootClassification.Type.Neck, ILootClassification.Type.Ring];

    constructor(address lootClassification_) {
        lootClassificationAddress = lootClassification_;
        lootClassification = ILootClassification(lootClassificationAddress);
    }

    function setLootClassification(address lootClassification_) public onlyOwner {
        lootClassificationAddress = lootClassification_;
        lootClassification = ILootClassification(lootClassificationAddress);
    }

    function getLevel(uint256 tokenId) public view returns (uint256)
    {
        uint256 level;
        for(uint8 i=0; i < itemTypes.length; i++) {
            level += lootClassification.getLevel(itemTypes[i], tokenId);    
        }

        return level;
    }

    function getLevel(uint256[8] memory tokenId) public view returns (uint256)
    {
        uint256 level;
        for(uint8 i=0; i < itemTypes.length; i++) {
            if (tokenId[i] == 0) 
                level += 1;
            else
                level += lootClassification.getLevel(itemTypes[i], tokenId[i]);    
        }     
    
        return level;
    }

    function getGreatness(uint256 tokenId) public view returns (uint256)
    {
        uint256 greatness;
        for(uint8 i=0; i < itemTypes.length; i++) {
            greatness += lootClassification.getGreatness(itemTypes[i], tokenId);    
        }

        return greatness;
    }

    function getGreatness(uint256[8] memory tokenId) public view returns (uint256)
    {
        uint256 greatness;
        for(uint8 i=0; i < itemTypes.length; i++) {
            if (tokenId[i] == 0) 
                greatness += 15;
            else
                greatness += lootClassification.getGreatness(itemTypes[i], tokenId[i]);    
        }

        return greatness;
    }

    function getRating(uint256 tokenId) public view returns (uint256)
    {   
        uint256 rating;
        for(uint8 i=0; i < itemTypes.length; i++) {
            rating += lootClassification.getRating(itemTypes[i], tokenId);    
        }

        return rating;
    }

    function getRating(uint256[8] memory tokenId) public view returns (uint256)
    {   
        uint256 rating;
        for(uint8 i=0; i < itemTypes.length; i++) {
            if (tokenId[i] == 0) 
                rating += 15;
            else
                rating += lootClassification.getRating(itemTypes[i], tokenId[i]);    
        }

        return rating;
    }
}