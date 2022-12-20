const Nexus = artifacts.require("Nexus");

module.exports = function(deployer) {
  deployer.deploy(Nexus);
};
