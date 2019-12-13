var Test = artifacts.require("Test");
var SWToken = artifacts.require("SWToken");

module.exports = function(deployer) {
  deployer.deploy(Test);
  deployer.deploy(SWToken);
};
