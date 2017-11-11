pragma solidity ^0.4.15;
import "./IDB.sol";

library Request {
    enum States {
        Requested,
        Accepted,
        Delivered,
        Rejected
    }
    
    struct Data { 
        uint id;
        uint trustId;
        bytes32 title;
        bytes32 description;
        States state;
        IDB db;
    }
    
    function isValidStateChange(Data storage self, States _state) public returns(bool) {
         return (
            (_state == States.Rejected) ||
            (self.state == States.Requested && _state == States.Accepted) || 
            (self.state == States.Accepted && _state == States.Delivered)
        );
    }
    
    function updateState(Data storage self, States _state) public {
        require(isValidStateChange(self, _state) == true);
        self.state = _state;
    }
    
    function client(Data storage self) public returns(address) {
        var (,_client,,) = self.db.getTrust(self.trustId);
        return _client;
    }
    
    function fiduciary(Data storage self) public returns(address) {
        var (,,_fiduciary,) = self.db.getTrust(self.trustId);
        return _fiduciary;
    }

    function get(Data storage self) public returns(uint, uint, bytes32, bytes32, States) {
        return (self.id, self.trustId, self.title, self.description, self.state);
    }
}
