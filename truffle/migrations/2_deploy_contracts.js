var Marketplace = artifacts.require("./Marketplace.sol");
var Requests = artifacts.require("./Requests.sol");
var Trusts = artifacts.require("./Trusts.sol");

module.exports = function(deployer) {
  deployer.deploy(Marketplace)
  deployer.deploy(Trusts)
  deployer.deploy(Requests)
};
