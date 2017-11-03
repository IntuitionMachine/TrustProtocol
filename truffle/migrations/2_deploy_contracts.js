// var Marketplace = artifacts.require("./Marketplace.sol");
// var Requests = artifacts.require("./Requests.sol");
// var Trusts = artifacts.require("./Trusts.sol");
// var IDB = artifacts.require("./IDB.sol");
// var Request = artifacts.require("./Request.sol");
// var Trust = artifacts.require("./Trust.sol");
var Trust = artifacts.require("Trust");
var Request = artifacts.require("Request");
var DB = artifacts.require("DB");

module.exports = function(deployer) {
  deployer.deploy(Request)
  deployer.deploy(Trust)
  deployer.link(Request, DB)
  deployer.link(Trust, DB)
  deployer.deploy(DB)
};
