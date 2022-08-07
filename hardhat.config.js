const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");

task("accounts", "Show all accounts in hardhat").setAction(async () => {
  const accounts = await ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
};
