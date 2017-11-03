pragma solidity ^0.4.2;
import "./Requests.sol";

contract Trusts {
    struct Trust {
        address client;
        bytes32 name;
        Requests requests;
    }

    Trust[] public items;

    function add(bytes32 name) public {
        items.push(Trust(msg.sender, name, new Requests()));
    }
    
    function getCount() public constant returns(uint) {
        return items.length;
    }
    
    function get(uint index) public constant returns(address, bytes32, address) {
        return (items[index].client, items[index].name, items[index].requests) ;
    }
}