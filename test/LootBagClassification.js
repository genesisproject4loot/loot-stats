const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LootBagClassification", function () {
  // eslint-disable-next-line no-unused-vars
  let owner, addr1, addr2, addrs;
  let lootClassification, lootBagClassification;
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const LootClassification = await ethers.getContractFactory(
      "LootClassification"
    );
    lootClassification = await LootClassification.deploy();

    const LootBagClassification = await ethers.getContractFactory(
      "LootBagClassification"
    );
    lootBagClassification = await LootBagClassification.deploy(
      lootClassification.address
    );
  });

  describe("Stats", function () {
    it("Should set the right owner", async function () {
      expect(await lootBagClassification.owner()).to.equal(owner.address);
    });

    it("Should have the right Greatness for tokenID 980", async function () {
      expect(await lootClassification.getGreatness(0, 980)).to.equal(15);
      expect(await lootClassification.getGreatness(1, 980)).to.equal(8);
      expect(await lootClassification.getGreatness(2, 980)).to.equal(4);
      expect(await lootClassification.getGreatness(3, 980)).to.equal(1);
      expect(await lootClassification.getGreatness(4, 980)).to.equal(4);
      expect(await lootClassification.getGreatness(5, 980)).to.equal(5);
      expect(await lootClassification.getGreatness(6, 980)).to.equal(1);
      expect(await lootClassification.getGreatness(7, 980)).to.equal(4);

      expect(
        await lootBagClassification["getGreatness(uint256)"](980)
      ).to.equal(42);
    });

    it("Should have the right Level for tokenID 980", async function () {
      expect(await lootClassification.getLevel(0, 980)).to.equal(5);
      expect(await lootClassification.getLevel(1, 980)).to.equal(5);
      expect(await lootClassification.getLevel(2, 980)).to.equal(5);
      expect(await lootClassification.getLevel(3, 980)).to.equal(3);
      expect(await lootClassification.getLevel(4, 980)).to.equal(2);
      expect(await lootClassification.getLevel(5, 980)).to.equal(4);
      expect(await lootClassification.getLevel(6, 980)).to.equal(3);
      expect(await lootClassification.getLevel(7, 980)).to.equal(2);

      expect(await lootBagClassification["getLevel(uint256)"](980)).to.equal(
        29
      );
    });

    it("Should have the right Rating for tokenID 980", async function () {
      expect(await lootBagClassification["getRating(uint256)"](980)).to.equal(
        177
      );
    });

    it("Should have the right Greatness for tokenID 1631", async function () {
      expect(await lootClassification.getGreatness(0, 1631)).to.equal(6);
      expect(await lootClassification.getGreatness(1, 1631)).to.equal(16);
      expect(await lootClassification.getGreatness(2, 1631)).to.equal(17);
      expect(await lootClassification.getGreatness(3, 1631)).to.equal(0);
      expect(await lootClassification.getGreatness(4, 1631)).to.equal(7);
      expect(await lootClassification.getGreatness(5, 1631)).to.equal(15);
      expect(await lootClassification.getGreatness(6, 1631)).to.equal(15);
      expect(await lootClassification.getGreatness(7, 1631)).to.equal(0);

      expect(
        await lootBagClassification["getGreatness(uint256)"](1631)
      ).to.equal(76);
    });

    it("Should have the right Level for tokenID 1631", async function () {
      expect(await lootClassification.getLevel(0, 1631)).to.equal(3);
      expect(await lootClassification.getLevel(1, 1631)).to.equal(2);
      expect(await lootClassification.getLevel(2, 1631)).to.equal(5);
      expect(await lootClassification.getLevel(3, 1631)).to.equal(3);
      expect(await lootClassification.getLevel(4, 1631)).to.equal(2);
      expect(await lootClassification.getLevel(5, 1631)).to.equal(2);
      expect(await lootClassification.getLevel(6, 1631)).to.equal(3);

      expect(await lootClassification.getLevel(7, 1631)).to.equal(3);

      expect(await lootBagClassification["getLevel(uint256)"](1631)).to.equal(
        23
      );
    });

    it("Should have the right Rating for tokenID 1631", async function () {
      expect(await lootBagClassification["getRating(uint256)"](1631)).to.equal(
        224
      );
    });

    it("Should have the right Rating for tokenID 1381", async function () {
      expect(await lootBagClassification["getRating(uint256)"](1381)).to.equal(
        250
      );
    });

    it("Should have the right Rating for tokenID 6322", async function () {
      expect(await lootBagClassification["getRating(uint256)"](6322)).to.equal(
        242
      );
    });

    it("Should have the right Rating for tokenID 3555", async function () {
      expect(await lootBagClassification["getRating(uint256)"](3555)).to.equal(
        255
      );
    });

    it("Should have the right Rating for tokenID 5448", async function () {
      expect(await lootBagClassification["getRating(uint256)"](5448)).to.equal(
        254
      );
    });

    it("Should have the right Rating for tokenID 3390", async function () {
      expect(await lootBagClassification["getRating(uint256)"](3390)).to.equal(
        234
      );
    });

    it("Should have the right Rating for tokenID 223", async function () {
      expect(await lootBagClassification["getRating(uint256)"](223)).to.equal(
        166
      );
    });

    it("Should have the right Greatness for GA", async function () {
      const tokenId = [980, 1631, 1381, 6322, 3555, 5448, 3390, 223];

      expect(
        await lootBagClassification["getGreatness(uint256[8])"](tokenId)
      ).to.equal(141);
    });

    it("Should have the right Level for GA", async function () {
      const tokenId = [980, 1631, 1381, 6322, 3555, 5448, 3390, 223];
      expect(
        await lootBagClassification["getLevel(uint256[8])"](tokenId)
      ).to.equal(24);
    });

    it("Should have the right Rating for GA", async function () {
      const tokenId = [980, 1631, 1381, 6322, 3555, 5448, 3390, 223];
      expect(
        await lootBagClassification["getRating(uint256[8])"](tokenId)
      ).to.equal(411);
    });

    it("Should have the right Greatness for GA with Lost Mana", async function () {
      const tokenId = [980, 0, 1381, 6322, 3555, 5448, 3390, 223];

      expect(
        await lootBagClassification["getGreatness(uint256[8])"](tokenId)
      ).to.equal(140);
    });

    it("Should have the right Level for GA with Lost Mana", async function () {
      const tokenId = [980, 0, 1381, 6322, 3555, 5448, 3390, 223];
      expect(
        await lootBagClassification["getLevel(uint256[8])"](tokenId)
      ).to.equal(23);
    });

    it("Should have the right Rating for GA with Lost Mana", async function () {
      const tokenId = [980, 0, 1381, 6322, 3555, 5448, 3390, 223];
      expect(
        await lootBagClassification["getRating(uint256[8])"](tokenId)
      ).to.equal(394);
    });
  });
});
