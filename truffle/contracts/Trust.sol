pragma solidity ^0.4.15;

library Trust {
    struct Data { 
        uint id;
        address client;
        address fiduciary;
        bytes32 name;    
    }

    function get(Data storage self) public constant returns(uint, address, address, bytes32) {
        return (self.id, self.client, self.fiduciary, self.name);
    }
}