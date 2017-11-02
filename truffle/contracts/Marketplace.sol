pragma solidity ^0.4.2;
import "./Trusts.sol";

contract Marketplace {
    address public owner;
    Trusts public trusts;
    
    function Marketplace() public {
      owner = msg.sender;
      trusts = new Trusts();
    }
}