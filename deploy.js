async function main() {
  const ContractFactory = await ethers.getContractFactory("GarbageNFT");
  const contract = await ContractFactory.deploy();
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);

  // Call createReward function
  const rewardId = await contract.createReward("tokenURI", "title", "description");
  console.log("Reward created with ID:", rewardId);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
