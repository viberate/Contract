var ViberateICO = artifacts.require("./ViberateICO.sol");
var VibeToken = artifacts.require("./VibeToken.sol");

contract('VibeTokenTest', function(){

	it('Test mintTokens', function(){
		var tokenContract;
		var icoContract;
		var ownerMinter = web3.eth.accounts[0];
		var mintingSource = web3.eth.accounts[2]
		var notOwner = web3.eth.accounts[1];
		var mintValue = 100 * 10**18;

		var startingBalance;
		var startingTotalSupply;

		return VibeToken.deployed().then(function(_tokenInstance) {
			tokenContract = _tokenInstance;
		return tokenContract.changeICOAddress(ownerMinter).then(function() {
		return tokenContract.balanceOf(mintingSource).then(function(_startingBalance){
			startingBalance = _startingBalance.toNumber();
		return tokenContract.totalSupply.call().then(function(_startingTotalSupply){
			startingTotalSupply = _startingTotalSupply.toNumber();
		return tokenContract.mintTokens(mintingSource, mintValue, {from:ownerMinter}).then(function(){
		return tokenContract.balanceOf(mintingSource).then(function(_endBalance){
			assert.equal(startingBalance + mintValue, _endBalance.toNumber(), "Target balance is not what expected!");
		return tokenContract.totalSupply.call().then(function(_endTotalSupply){
			assert.equal(startingTotalSupply + mintValue, _endTotalSupply.toNumber(), "Total supply was not set properly!")
		return tokenContract.mintTokens(mintingSource, mintValue, {from:notOwner}).then(function(){
			assert(false, "It should have thrown when user withouth permisions tries to mint tokens!")
		}).catch(function(_error) {
			if (_error.toString().indexOf("invalid opcode") == -1){ assert(false, _error.toString()); }
		return ViberateICO.deployed().then(function(_icoInstance) {
			icoContract = _icoInstance;
		return tokenContract.changeICOAddress(icoContract.address).then(function() {
		return tokenContract.icoContractAddress.call().then(function(_icoAddy) {
			assert.equal(_icoAddy, icoContract.address, "Target balance is not what expected!");
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
	});

	it('Test transfer', function(){

		var tokenContract;
		var senderAccount = web3.eth.accounts[2];
		var recieverAccount = web3.eth.accounts[1];
		var transferValue = 50 * 10**18;
		var fromStartBalance;
		var toStartBalance;
		var fromEndBalance;
		var toEndBalance;

		return VibeToken.deployed().then(function(_tokenInstance) {
			tokenContract = _tokenInstance;
		return tokenContract.balanceOf(senderAccount).then(function(_fromStartBalance){
			assert.equal(_fromStartBalance.toNumber(), 100 * 10**18, "There is not enough tokens to start the test!");
			fromStartBalance = _fromStartBalance.toNumber();
		return tokenContract.balanceOf(recieverAccount).then(function(_toStartBalance){
			toStartBalance = _toStartBalance.toNumber();
		return tokenContract.transfer(recieverAccount, transferValue, {from:senderAccount}).then(function(){
		return tokenContract.balanceOf(senderAccount).then(function(_fromEndBalance){
			assert.equal(fromStartBalance - transferValue, _fromEndBalance.toNumber(), "Source balance should not have changed!");
		return tokenContract.balanceOf(recieverAccount).then(function(_toEndBalance){
			assert.equal(toStartBalance + transferValue, _toEndBalance.toNumber(), "Destination balance should not have changed!");
		return tokenContract.transfer(recieverAccount, transferValue * 10, {from:senderAccount}).then(function(){
			assert(false, "It should have thrown when we want to send more that we have!")
		}).catch(function(_error) {
			if (_error.toString().indexOf("invalid opcode") == -1){ assert(false, _error.toString()); }
		return tokenContract.transfer(senderAccount, transferValue, {from:recieverAccount}).then(function(){
		return tokenContract.balanceOf(senderAccount).then(function(_fromStartBalance){
			assert.equal(_fromStartBalance.toNumber(), 100 * 10**18, "End state is not the same as start state");
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

	it('Test transferFrom', function(){

		var tokenContract;
		var owner = web3.eth.accounts[3];
		var fromAddy = web3.eth.accounts[2];
		var toAddy = web3.eth.accounts[1];
		var transferValue = 1337;
		var fromStartBalance;
		var toStartBalance;
		var fromEndBalance;
		var toEndBalance;

		return VibeToken.deployed().then(function(_tokenInstance) {
			tokenContract = _tokenInstance;
		return tokenContract.balanceOf(fromAddy).then(function(fromStartBal){
			fromStartBalance = fromStartBal.toNumber();
		return tokenContract.balanceOf(toAddy).then(function(toStartBal){
			toStartBalance = toStartBal.toNumber();
		return tokenContract.approve(owner, transferValue * 2, {from:fromAddy}).then(function(){
		return tokenContract.transferFrom(fromAddy, toAddy, transferValue, {from:owner}).then(function(){
		return tokenContract.balanceOf(fromAddy).then(function(fromEndBal){
			assert.equal(fromStartBalance - transferValue, fromEndBal.toNumber(), "Source balance should have changed!");
		return tokenContract.balanceOf(toAddy).then(function(toEndBal){
			assert.equal(toStartBalance + transferValue, toEndBal.toNumber(), "Destination balance should have changed!");
		return tokenContract.transferFrom(fromAddy, toAddy, transferValue * 10, {from:owner}).then(function(){
			assert(false, "It should have thrown when we want to transferFrom more than allowance!")
		}).catch(function(_error) {
			if (_error.toString().indexOf("invalid opcode") == -1){ assert(false, _error.toString()); }
		return tokenContract.approve(owner, 200 * 10**18, {from:fromAddy}).then(function(){
		return tokenContract.transferFrom(fromAddy, toAddy, 200 * 10**18, {from:owner}).then(function(){
			assert(false, "It should have thrown when we want to transferFrom more than you have!")
		}).catch(function(_error) {
			if (_error.toString().indexOf("invalid opcode") == -1){ assert(false, _error.toString()); }
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

	it('Test approve', function(){

		var tokenContract;
		var approvee = web3.eth.accounts[2];
		var allowedAddy = web3.eth.accounts[6];
		var allowanceValue = 1337;

		return VibeToken.deployed().then(function(_tokenInstance) {
			tokenContract = _tokenInstance;
		return tokenContract.approve(approvee, allowanceValue, {from:allowedAddy}).then(function(){
		return tokenContract.allowance(allowedAddy, approvee).then(function(allowedVal){
			assert.equal(allowanceValue, allowedVal.toNumber(), "Allowance is not set properly!");
		return tokenContract.approve(approvee, 0, {from:allowedAddy}).then(function(){
		return tokenContract.allowance(allowedAddy, approvee).then(function(allowedVal){
			assert.equal(0, allowedVal.toNumber(), "Allowance is not set properly!");
		});
		});
		});
		});
		});
	});

	it("Test lock", function(){

		var tokenContract;
		var owner = web3.eth.accounts[0];
		var sender = web3.eth.accounts[2];
		var reciever = web3.eth.accounts[8];
		var startFrozenBlockNumber;
		var blocksToFreezeFor = 9999999999999;

		return VibeToken.deployed().then(function(_tokenInstance) {
			tokenContract = _tokenInstance;
		return tokenContract.approve(reciever, 10 * 10*18, {from:sender}).then(function(){
		return tokenContract.lockedUntilBlock.call().then(function(_startFrozenBlockNumber){
			startFrozenBlockNumber = _startFrozenBlockNumber;
		return tokenContract.lockUntil(blocksToFreezeFor, "bla", {from:owner}).then(function(){
		return tokenContract.lockedUntilBlock.call().then(function(_endFrozenBlockNumber){
			assert.equal(_endFrozenBlockNumber.toNumber(), blocksToFreezeFor, "Freeze block are not what expected!");
		return tokenContract.transfer(reciever, 10 * 10*18, {from:sender}).then(function(){
			assert(false, "It should have thrown when we want to transfer tokens while locked!")
		}).catch(function(_error) {
			if (_error.toString().indexOf("invalid opcode") == -1){ assert(false, _error.toString()); }
		return tokenContract.approve(reciever, 10 * 10*18, {from:sender}).then(function(){
			assert(false, "It should have thrown when we want to approve while locked!")
		}).catch(function(_error) {
			if (_error.toString().indexOf("invalid opcode") == -1){ assert(false, _error.toString()); }
		return tokenContract.transferFrom(sender, reciever, 10 * 10*18, {from:reciever}).then(function(){
			assert(false, "It should have thrown when we want to transferFrom while locked!")
		}).catch(function(_error) {
			if (_error.toString().indexOf("invalid opcode") == -1){ assert(false, _error.toString()); }
		return tokenContract.lockUntil(0, "bla", {from:owner}).then(function(){
		return tokenContract.approve(reciever, 0, {from:owner}).then(function(){
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
});
