pragma solidity ^0.4.13;

import "./Token.sol";

contract VibeToken is Token {

  /* Initializes contract */
  function VibeToken() {
    standard = "Viberate token v1.0";
    name = "Vibe";
    symbol = "VIB";
    decimals = 18;
    crowdsaleContractAddress = 0x91C94BEe75786fBBFdCFefBa1102b68f48A002F4;   
    lockFromSelf(4352535, "Lock before crowdsale starts");
  }
}
