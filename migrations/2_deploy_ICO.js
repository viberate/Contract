//var ViberateICO = artifacts.require("./ViberateICO.sol");
var ViberateICO = artifacts.require("./TestHelpers/ViberateCrowdsale.sol");
var VibeToken = artifacts.require("./VibeToken.sol");

module.exports = function(deployer) {
  deployer.deploy(ViberateICO);
};
