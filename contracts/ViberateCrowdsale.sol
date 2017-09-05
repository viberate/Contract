pragma solidity ^0.4.13;

import "./Crowdsale.sol";

contract ViberateCrowdsale is Crowdsale {
  function ViberateCrowdsale(){

    crowdsaleStartBlock = 4240935;
    crowdsaleEndedBlock = 4348935;

    minCap = 3546099290780000000000;
    maxCap = 37993920972640000000000;

    blocksInADay = 3600;

  }
}
