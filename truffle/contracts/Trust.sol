pragma solidity ^0.4.15;

library Trust {
    struct Data { 
        address client;
        address trustee;
        bytes32 name;    
    }
}