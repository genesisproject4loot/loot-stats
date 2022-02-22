require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-contract-sizer");
require("@openzeppelin/hardhat-upgrades");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      },
    },
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts:
        process.env.GOERLI_PRIVATE_KEY !== undefined
          ? [`0x${process.env.GOERLI_PRIVATE_KEY}`]
          : [],
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.RINKEBY_PRIVATE_KEY !== undefined
          ? [`0x${process.env.RINKEBY_PRIVATE_KEY}`]
          : [],
    },
    mainnet: {
      url: process.env.MAINNET_URL || "",
      accounts:
        process.env.MAINNET_PRIVATE_KEY !== undefined
          ? [`0x${process.env.MAINNET_PRIVATE_KEY}`]
          : [],
    },
    mumbai: {
      url: process.env.MUMBAI_URL || "",
      accounts:
        process.env.MUMBAI_PRIVATE_KEY !== undefined
          ? [`0x${process.env.MUMBAI_PRIVATE_KEY}`]
          : [],
    },
    matic: {
      url: process.env.MATIC_URL || "",
      accounts:
        process.env.MATIC_PRIVATE_KEY !== undefined
          ? [`0x${process.env.MATIC_PRIVATE_KEY}`]
          : [],
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    gasPrice: 130,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: false,
    disambiguatePaths: true,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
