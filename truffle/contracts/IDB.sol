pragma solidity ^0.4.15;

contract IDB {
    function getTrust(uint _index) public constant returns(address, address, bytes32);
    function getTrustCount() public constant returns(uint);
    function addRequest(uint trustIndex, bytes32 title, bytes32 description) public;
    function getRequestCount() public constant returns(uint);
    function acceptRequest(uint index) public returns(bool);
    function deliverRequest(uint index) public returns(bool);
}