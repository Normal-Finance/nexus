const Nexus = artifacts.require("Nexus");
const Authorizer = artifacts.require("Authorizer");

module.exports = function (deployer) {
  deployer.deploy(Nexus);
  deployer.deploy(Authorizer);
};
