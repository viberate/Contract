//var ViberateICO = artifacts.require("./ViberateICO.sol");
var ViberateICO = artifacts.require("./TestHelpers/ViberateCrowdsale.sol");
var VibeToken = artifacts.require("./VibeToken.sol");

module.exports = function(deployer) {
  deployer.deploy(VibeToken, ViberateICO.deployed().then(function(icoInsance){
    console.log(icoInsance.address);
    return icoInsance.address;
  }), 0);
};
