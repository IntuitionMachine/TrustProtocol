pragma solidity ^0.4.2;

contract Requests {
    enum States {
        Requested,
        Accepted,
        Delivered
    }

    struct Request {
        bytes32 title;
        bytes32 description;
        States state;
    }

    Request[] public items;

    function add(bytes32 title, bytes32 description) public {
        items.push(Request(title, description, States.Requested));
    }
    
    function getCount() public constant returns(uint) {
        return items.length;
    }
    
    function get(uint index) public constant returns(bytes32, bytes32, States) {
        return (items[index].title, items[index].description, items[index].state) ;
    }

    function accept(uint index) public returns(bool) {
        items[index].state = States.Accepted;
        return true;
    }

    function deliver(uint index) public returns(bool) {
        items[index].state = States.Delivered;
        return true;
    }
}