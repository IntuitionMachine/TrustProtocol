pragma solidity ^0.4.2;
import "./Requests.sol";

contract Trusts {
    struct Trust {
        address client;
        bytes32 name;
    }

    Trust[] public items;
    Requests public requests;

    function Trusts() public {
      requests = new Requests();
    }

    function add(bytes32 name) public {
        items.push(Trust(msg.sender, name));
    }
    
    function getCount() public constant returns(uint) {
        return items.length;
    }
    
    function get(uint index) public constant returns(address, bytes32) {
        return (items[index].client, items[index].name) ;
    }
}