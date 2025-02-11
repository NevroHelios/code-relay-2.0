const hre = require("hardhat");

async function main() {
  // Compile contracts if not already compiled.
  await hre.run('compile');

  // Get the contract to deploy.
  const GarbageNFT = await hre.ethers.getContractFactory("GarbageNFT");
  console.log("Deploying contract...");
  const contract = await GarbageNFT.deploy(); // add constructor parameters if any
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
