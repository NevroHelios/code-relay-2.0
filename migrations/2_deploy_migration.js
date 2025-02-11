const GarbageNFT = artifacts.require("./GarbageNFT");

module.exports = function (deployer) {
  deployer.deploy(GarbageNFT);
};
