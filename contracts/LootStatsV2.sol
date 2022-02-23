// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/*
LootStatsV2.sol
EXAMPLE FOR UPGRADEABLIITY
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

contract LootStatsV2 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    ILootClassification private lootClassification;    
    address public lootClassificationAddress;
    ILootClassification.Type[8] private itemTypes;

    function initialize(address lootClassification_) initializer public {
        __Ownable_init();
        __UUPSUpgradeable_init();

        itemTypes = [ILootClassification.Type.Weapon, ILootClassification.Type.Chest, ILootClassification.Type.Head, ILootClassification.Type.Waist, ILootClassification.Type.Foot, ILootClassification.Type.Hand, ILootClassification.Type.Neck, ILootClassification.Type.Ring];
        lootClassificationAddress = lootClassification_;
        lootClassification = ILootClassification(lootClassificationAddress);

    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

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

        //modify rating in upgrade
        rating = rating * 10;
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