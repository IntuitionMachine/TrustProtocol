pragma solidity ^0.4.15;
import "./IDB.sol";

library Fiduciary {
    struct Data {
        bytes32 name;
        bytes32 description;
        address publicAddress;
    }
    
    function get(Data storage self) public constant returns(bytes32, bytes32, address) {
        return (self.name, self.description, self.publicAddress);
    }
}