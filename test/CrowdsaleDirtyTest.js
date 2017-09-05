var Crowdsale = artifacts.require("./TestHelpers/ViberateCrowdsale.sol");
var Token = artifacts.require("./VibeToken.sol");

contract('CrowdsaleDirtyTest', function(){

  it('Test init values', function(){
		var tokenContract;
		var crowdsaleContract;
		var expectedOwner = web3.eth.accounts[0];

    var expectedCrowdsaleStartBlock = 133700;
    var expectedCrowdsaleEndedBlock = 1337000;

    var expectedMinCap = 1337;
    var expectedMaxCap = 133700;

    var expectedBlocksInADay = 0;

		return Token.deployed().then(function(_tokenInstance) {
			tokenContract = _tokenInstance;
		return Crowdsale.deployed().then(function(_crowdsaleInstance) {
			crowdsaleContract = _crowdsaleInstance;
		return crowdsaleContract.getTokenAddress.call().then(function(_tokenAddy) {
			assert.equal(_tokenAddy, tokenContract.address, "Token address was not set properly!");
    return crowdsaleContract.owner.call().then(function(_owner) {
  		assert.equal(_owner, expectedOwner, "Owner was not set properly!");
    return crowdsaleContract.crowdsaleStartBlock.call().then(function(_crowdsaleStartBlock) {
    	assert.equal(_crowdsaleStartBlock, expectedCrowdsaleStartBlock, "crowdsaleStartBlock was not set properly!");
    return crowdsaleContract.crowdsaleEndedBlock.call().then(function(_crowdsaleEndedBlock) {
      assert.equal(_crowdsaleEndedBlock, expectedCrowdsaleEndedBlock, "crowdsaleEndedBlock was not set properly!");
    return crowdsaleContract.minCap.call().then(function(_minCap) {
      assert.equal(_minCap, expectedMinCap, "minCap was not set properly!");
    return crowdsaleContract.maxCap.call().then(function(_maxCap) {
      assert.equal(_maxCap, expectedMaxCap, "maxCap was not set properly!");
    return crowdsaleContract.ethRaised.call().then(function(_ethRaised) {
      assert.equal(_ethRaised, 0, "maxCap was not set properly!");
    });
    });
    });
    });
    });
  	});
    });
		});
		});
	});


});
