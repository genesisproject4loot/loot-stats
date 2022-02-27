# LootStats.sol

This is a Lootverse utility contract to classify Loot (For Adventurers) Bags, mLoot and Genesis Adventurers.

See the [original Loot Contract](https://etherscan.io/address/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7) for lists of all possible items.

See [loot.foundation](https://loot.foundation/) for an explanation of the classifications used.

The contract relies on the [LootClassification](https://github.com/playmint/loot-classification) contract. To make an update to those functions make a PR on that project.


## Intended Use

This contract is deployed to ethereum mainnent with addresses tracked in the table below.

The intention is that other Lootverse contracts can directly reference the deployed version of this and interact with it's public interface.

## Modification

If new functionality is required,

1. Make a PR to this repository.
2. Deploy the contract to mainnet to work with your project.
3. Make another PR to this repository with the deploy address added to the table below.

In the future, this code could be modified to be an upgradeable contract so that existing contracts can receive updates when the lore is updated. At this point some consideration will need to be made to avoid making breaking changes.

## Authorised Updates

Updates to this contract can be discussed in this GitHub repo and/or in the Genesis Project discord https://discord.gg/QzvW2WJqed

In future ownership of this repository and the latest deployed contract should be transferred to a Loot DAO.


## How to Use

There are 4 primary stat functions for both Bags and Items:
- getLevel()
- getGreatness()
- getRating()

These can take either a tokenId (both Loot tokenIds and mLoot tokenIds will work).  If you are trying to get classifications for Genesis Adventurers, you will need to pass in an array for uint256 with every items original lootbag ID.

So a typical use in your own lootverse Solidity contract might be:
```
// instantiate contract object
LootBagClassification stats = 
    LootBagClassification(_TBD_);
  
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

## Deploy History

| Project | Commit | Deployed address link |
|---------|---------------------|-----------------------|

