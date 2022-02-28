# LootStats.sol

This is a Lootverse utility contract to classify Loot (For Adventurers) Bags, mLoot and Genesis Adventurers.

See the [original Loot Contract](https://etherscan.io/address/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7) for lists of all possible items.

See [loot.foundation](https://loot.foundation/) for an explanation of the classifications used.

The contract relies on the [LootClassification](https://github.com/playmint/loot-classification) contract. To make an update to those functions make a PR on that project. The deployer of this contract is responsible for updating to the latest LootClassification contract.


## Intended Use

This contract is deployed to ethereum mainnet with addresses tracked in the table below.

The intention is that other Lootverse contracts can directly reference the deployed version of this and interact with it's public interface.

## Upgrades

To ensure that this contract can be upgraded, it is suggested that the address for this contract is a settable variable or in a contract that doesn't have any storage (so it can be easily swapped out).  This will enable the developer to opt-in upgrade as this contract gets updated.

An example of this could be:
```
address public lootStatsAddress; //declare the contract

function setLootStatsAddress(address addr) external onlyOwner { //where OpenZeppelin Ownable is included
    lootStatsAddress = addr;
}

```

## Modification

If new functionality is required,

1. Make a PR to this repository.
2. Deploy the contract to mainnet to work with your project.
3. Make another PR to this repository with the deploy address added to the table below.


## Authorised Updates

Updates to this contract can be discussed in this GitHub repo and/or in the Genesis Project discord https://discord.gg/QzvW2WJqed

In future ownership of this repository and the latest deployed contract should be transferred to a Loot DAO.


## How to Use

This contract will return 5 primary stats for both Bags and Items.

For Bags (Loot, mLoot and GAs)*:
- getLevel()
- getGreatness()
- getRating()
- getNumberOfItemsInClass()

*These functions can accept either a tokenId (both Loot and mLoot tokenIds ) or an array of Loot tokenIds (for Genesis Adventurers).

For Items:
- getLevelByItem()
- getGreatnessByItem()
- getRatingByItem()
- getClassByItem()

A typical use in your own lootverse Solidity contract might be:
```
// full interface for LootStats contract
// best practice is to only include the functions that will be called
interface ILootStats {
    enum Class
    {
        Warrior,
        Hunter,
        Mage,
        Any
    }
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
    function getLevel(uint256 tokenId) public view returns (uint256);
    function getLevel(uint256[8] memory tokenId) external view returns (uint256);
    function getGreatness(uint256 tokenId) public view returns (uint256);
    function getGreatness(uint256[8] memory tokenId) external view returns (uint256);
    function getRating(uint256 tokenId) public view returns (uint256);
    function getRating(uint256[8] memory tokenId) external view returns (uint256);
    function getNumberOfItemsInClass(Class classType, uint256 tokenId) public view returns (uint256);
    function getNumberOfItemsInClass(Class classType, uint256[8] memory tokenId) external view returns (uint256);
    function getGreatnessByItem(Type lootType, uint256 tokenId);
    function getLevelByItem(Type lootType, uint256 tokenId);
    function getRatingByItem(Type lootType, uint256 tokenId);
    function getClassByItem(Type lootType, uint256 tokenId);
}


// instantiate contract object
ILootStats stats = 
    ILootStats(_SEE_TABLE_BELOW_);

//for greatness, level, and rating for a loot or mloot bag
uint256 level = stats.getLevel(1234);
uint256 greatness = stats.getGreatness(1234);
uint256 rating = stats.getRating(1234);

//for greatness, level, and rating for a genesis adventurer bag.  if a genesis adventurer contains a "lost item" pass a tokenId of 0.
tokenIds = [980, 1631, 1381, 6322, 3555, 5448, 3390, 223];
uint256 level = stats.getLevel(tokenIds);
uint256 greatness = stats.getGreatness(tokenIds);
uint256 rating = stats.getRating(tokenIds);
```

## Testing

To verify that LootStats is returning to the right results please refer to the test suite in:
`/test/LootStat.js`. 

To execute the test suite run:
`npx hardhat test`

## Deploy History

| Project | Commit | Deployed address link |
|---------|---------------------|-----------------------|
| The Genesis Project v2  | [fcf8e160876ba9b416a4096e7f877908ad8e33a3](https://github.com/genesisproject4loot/loot-stats/tree/fcf8e160876ba9b416a4096e7f877908ad8e33a3)| [0x886944F49fa10448C573AbF3D5f85f4bd81a7730](https://etherscan.io/address/0x886944F49fa10448C573AbF3D5f85f4bd81a7730) |
