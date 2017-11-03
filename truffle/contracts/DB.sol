pragma solidity ^0.4.15;

import "./Trust.sol";
import "./IDB.sol";
import "./Request.sol";

contract DB is IDB {
    using Trust for Trust.Data;
    using Request for Request.Data;

    Trust.Data[] public trusts;
    
    function addTrust(address client, address trustee, bytes32 name) public {
        trusts.push(Trust.Data(client, trustee, name));
    }
    
    function getTrustCount() public constant returns(uint) {
        return trusts.length;
    }
    
    function getTrust(uint index) public constant returns(address, address, bytes32) {
        return (trusts[index].client, trusts[index].trustee, trusts[index].name) ;
    }

    Request.Data[] public requests;
    
    function addRequest(uint trustIndex, bytes32 title, bytes32 description) public {
        require(msg.sender == trusts[trustIndex].client);
        requests.push(Request.Data(trustIndex, title, description, Request.States.Requested, this));
    }

    function getRequestCount() public constant returns(uint) {
        return requests.length;
    }

    function changeRequestState(uint index, Request.States state) private {
        var request = requests[index];
        request.updateState(state);
    }
    
    function acceptRequest(uint index) public returns(bool) {
        require(msg.sender == requests[index].trustee());
        changeRequestState(index, Request.States.Accepted);
        return true;
    }
    
    function deliverRequest(uint index) public returns(bool) {
        require(msg.sender == requests[index].trustee());
        changeRequestState(index, Request.States.Delivered);
        return true;
    }
}