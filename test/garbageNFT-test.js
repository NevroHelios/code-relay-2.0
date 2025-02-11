const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GarbageNFT", function () {
  it("should deploy and set the owner", async function () {
    const [owner] = await ethers.getSigners();
    const GarbageNFT = await ethers.getContractFactory("GarbageNFT");
    const contract = await GarbageNFT.deploy();
    await contract.deployed();

    // Adjust if your contract defines an owner variable or similar.
    const contractOwner = await contract.owner();
    expect(contractOwner).to.equal(owner.address);
  });
});