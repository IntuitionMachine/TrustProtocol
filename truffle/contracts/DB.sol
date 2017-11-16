pragma solidity ^0.4.15;

import "./Trust.sol";
import "./IDB.sol";
import "./Request.sol";

contract DB is IDB {
    using Trust for Trust.Data;
    using Request for Request.Data;

    Trust.Data[] public trusts;

    function addTrust(address client, address fiduciary, bytes32 name) public {
        trusts.push(Trust.Data(trusts.length, client, fiduciary, name));
    }
    
    function getTrustCount() public constant returns(uint) {
        return trusts.length;
    }

    function getTrust(uint _i) public constant returns(uint, address, address, bytes32) {
        return trusts[_i - 1].get();
    }
    
    Request.Data[] public requests;
    
    function addRequest(uint trustIndex, bytes32 title, bytes32 description) public {
        requests.push(Request.Data(requests.length, trustIndex, title, description, Request.States.Requested, this));
    }

    function getRequestCount() public constant returns(uint) {
        return requests.length;
    }

    function getRequest(uint _id) public returns(uint, uint, bytes32, bytes32, Request.States) {
        return requests[_id - 1].get();
    }

    function changeRequestState(uint _id, Request.States state) private {
        var request = requests[_id - 1];
        request.updateState(state);
    }
    
    function acceptRequest(uint _id) public returns(bool) {
        changeRequestState(_id, Request.States.Accepted);
        return true;
    }
    
    function deliverRequest(uint _id) public returns(bool) {
        changeRequestState(_id, Request.States.Delivered);
        return true;
    }

    event RegisterDeliveryAttachment(uint indexed requestId, bytes32 proof);

    function requestDeliveryAttachment(uint _requestId, bytes32 _proof) constant public returns(bool) {
        RegisterDeliveryAttachment(_requestId, _proof);
        return true;
    }

    event RegisterDeliveryDescription(uint indexed requestId, bytes32 description);

    function requestDeliveryDescription(uint _requestId, bytes32 _description) constant public returns(bool) {
        RegisterDeliveryAttachment(_requestId, _description);
        return true;
    }
}