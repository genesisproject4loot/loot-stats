const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("LootStats", function () {
  // eslint-disable-next-line no-unused-vars
  let owner, addr1, addr2, addrs;
  let lootClassification, lootStats;
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const LootClassification = await ethers.getContractFactory(
      "LootClassification"
    );
    lootClassification = await LootClassification.deploy();

    const LootStatsV1 = await ethers.getContractFactory("LootStatsV1");
    lootStats = await upgrades.deployProxy(
      LootStatsV1,
      [lootClassification.address],
      { kind: "uups" }
    );
  });

  describe("Stats", function () {
    it("Should set the right owner", async function () {
      expect(await lootStats.owner()).to.equal(owner.address);
    });

    it("Should have the right Greatness for tokenID 980", async function () {
      expect(await lootStats["getGreatness(uint256)"](980)).to.equal(42);
    });

    it("Should have the right Level for tokenID 980", async function () {
      expect(await lootStats["getLevel(uint256)"](980)).to.equal(29);
    });

    it("Should have the right Rating for tokenID 980", async function () {
      expect(await lootStats["getRating(uint256)"](980)).to.equal(177);
    });

    it("Should have the right Greatness for tokenID 1631", async function () {
      expect(await lootStats["getGreatness(uint256)"](1631)).to.equal(76);
    });

    it("Should have the right Level for tokenID 1631", async function () {
      expect(await lootStats["getLevel(uint256)"](1631)).to.equal(23);
    });

    it("Should have the right Rating for tokenID 1631", async function () {
      expect(await lootStats["getRating(uint256)"](1631)).to.equal(224);
    });

    it("Should have the right Rating for tokenID 1381", async function () {
      expect(await lootStats["getRating(uint256)"](1381)).to.equal(250);
    });

    it("Should have the right Rating for tokenID 6322", async function () {
      expect(await lootStats["getRating(uint256)"](6322)).to.equal(242);
    });

    it("Should have the right Rating for tokenID 3555", async function () {
      expect(await lootStats["getRating(uint256)"](3555)).to.equal(255);
    });

    it("Should have the right Rating for tokenID 5448", async function () {
      expect(await lootStats["getRating(uint256)"](5448)).to.equal(254);
    });

    it("Should have the right Rating for tokenID 3390", async function () {
      expect(await lootStats["getRating(uint256)"](3390)).to.equal(234);
    });

    it("Should have the right Rating for tokenID 223", async function () {
      expect(await lootStats["getRating(uint256)"](223)).to.equal(166);
    });

    it("Should have the right Greatness for a GA", async function () {
      const tokenId = [980, 1631, 1381, 6322, 3555, 5448, 3390, 223];

      expect(await lootStats["getGreatness(uint256[8])"](tokenId)).to.equal(
        141
      );
    });

    it("Should have the right Level for a GA", async function () {
      const tokenId = [980, 1631, 1381, 6322, 3555, 5448, 3390, 223];
      expect(await lootStats["getLevel(uint256[8])"](tokenId)).to.equal(24);
    });

    it("Should have the right Rating for a GA", async function () {
      const tokenId = [980, 1631, 1381, 6322, 3555, 5448, 3390, 223];
      expect(await lootStats["getRating(uint256[8])"](tokenId)).to.equal(411);
    });

    it("Should have the right Greatness for a GA with Lost Mana", async function () {
      const tokenId = [980, 0, 1381, 6322, 3555, 5448, 3390, 223];

      expect(await lootStats["getGreatness(uint256[8])"](tokenId)).to.equal(
        140
      );
    });

    it("Should have the right Level for a GA with Lost Mana", async function () {
      const tokenId = [980, 0, 1381, 6322, 3555, 5448, 3390, 223];
      expect(await lootStats["getLevel(uint256[8])"](tokenId)).to.equal(23);
    });

    it("Should have the right Rating for a GA with Lost Mana", async function () {
      const tokenId = [980, 0, 1381, 6322, 3555, 5448, 3390, 223];
      expect(await lootStats["getRating(uint256[8])"](tokenId)).to.equal(394);
    });
  });

  describe("Upgradability", function () {
    beforeEach(async function () {
      const LootStatsV2 = await ethers.getContractFactory("LootStatsV2");
      lootStats = await upgrades.upgradeProxy(lootStats.address, LootStatsV2);
    });

    it("Should have the right Rating for tokenID 1631", async function () {
      expect(await lootStats["getRating(uint256)"](1631)).to.equal(2240);
    });
  });
});
