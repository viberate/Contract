var Crowdsale = artifacts.require("./ViberateCrowdsale.sol");   //For testing use this .sol
var Token = artifacts.require("./VibeToken.sol");           // For testing use this .sol

module.exports = function(deployer) {

  var crowdsaleContract;
  var tokenContract;
  return Token.deployed().then(function(_tokenInstance) {
    tokenContract = _tokenInstance;
  return Crowdsale.deployed().then(function(_crowdsaleInstance) {
    crowdsaleContract = _crowdsaleInstance;
  return crowdsaleContract.setToken(tokenContract.address);
  });
  });
};
