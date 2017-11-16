"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// import Web3 from 'web3';
var _DB = require("./contracts/DB.json");
var _ = require("lodash");
var bs58 = require("bs58");
var buffer_1 = require("buffer");
var TrustProtocolJs = /** @class */ (function () {
    function TrustProtocolJs(params) {
        this.params = params;
        this.abi = _DB["abi"];
        //ropsten
        // this.location = "0x6db6a3f8ab7bab4d5062c4794f966cecb70b15a6";
        //testrpc
        this.location = "0x5fd36b591cc3a83e319615d3817db34130b1d0b3";
        this.contract = new this.params.web3.eth.Contract(this.abi, this.location);
        this.trusts = new Trusts(this);
        this.requests = new Requests(this);
        return this;
    }
    return TrustProtocolJs;
}());
exports.TrustProtocolJs = TrustProtocolJs;
var promisify = function (inner, args) {
    return new Promise(function (resolve, reject) {
        return inner.apply(void 0, args.concat([function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            }]));
    });
};
var Trusts = /** @class */ (function () {
    function Trusts(db) {
        this.Db = db;
    }
    Trusts.prototype._format = function (trust) {
        return {
            id: trust[0],
            client: trust[1],
            fiduciary: trust[2],
            name: this.Db.params.web3.utils.hexToAscii(trust[3])
        };
    };
    Trusts.prototype.getCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify(this.Db.contract.methods.getTrustCount().call, [{}])];
                    case 1:
                        count = _a.sent();
                        return [2 /*return*/, count];
                }
            });
        });
    };
    Trusts.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var trust;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify(this.Db.contract.methods.getTrust(id).call, [{}])];
                    case 1:
                        trust = _a.sent();
                        return [2 /*return*/, this._format(trust)];
                }
            });
        });
    };
    Trusts.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCount()];
                    case 1:
                        count = _a.sent();
                        _.range(count).map(function (i) { console.log("getting", i, count); });
                        return [4 /*yield*/, Promise.all(_.range(count).map(function (i) { return _this.get(i + 1); }))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Trusts.prototype.create = function (client, fiduciary, name) {
        return __awaiter(this, void 0, void 0, function () {
            var utils, created;
            return __generator(this, function (_a) {
                utils = this.Db.params.web3.utils;
                created = this.Db.contract.methods.addTrust(client, fiduciary, utils.asciiToHex(name)).send({ from: this.Db.params.userId });
                return [2 /*return*/];
            });
        });
    };
    return Trusts;
}());
exports.Trusts = Trusts;
var Requests = /** @class */ (function () {
    function Requests(db) {
        this.Db = db;
    }
    Requests.prototype._format = function (_request) {
        return {
            id: _request[0],
            trustId: _request[1],
            title: this.Db.params.web3.utils.hexToAscii(_request[2]),
            description: this.Db.params.web3.utils.hexToAscii(_request[3]),
            state: {
                "0": "REQUESTED",
                "1": "ACCEPTED",
                "2": "DELIVERED",
                "3": "REJECTED"
            }[_request[4]],
        };
    };
    Requests.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify(this.Db.contract.methods.getRequest(id).call, [{}])];
                    case 1:
                        _request = _a.sent();
                        return [2 /*return*/, this._format(_request)];
                }
            });
        });
    };
    Requests.prototype.getCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify(this.Db.contract.methods.getRequestCount().call, [{}])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Requests.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCount()];
                    case 1:
                        count = _a.sent();
                        return [4 /*yield*/, Promise.all(_.range(count).map(function (i) { return _this.get(i + 1); }))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Requests.prototype.create = function (trustId, title, description) {
        return __awaiter(this, void 0, void 0, function () {
            var utils;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        utils = this.Db.params.web3.utils;
                        return [4 /*yield*/, promisify(this.Db.contract.methods.addRequest(trustId, utils.asciiToHex(title), utils.asciiToHex(description)).send, [{ from: this.Db.params.userId }])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Requests.prototype.accept = function (requestId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify(this.Db.contract.methods.acceptRequest(requestId).send, [{ from: this.Db.params.userId }])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Requests.prototype.deliver = function (requestId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify(this.Db.contract.methods.deliverRequest(requestId).send, [{ from: this.Db.params.userId }])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Requests.prototype.requestDeliveryAttachment = function (requestId, documentHash) {
        return __awaiter(this, void 0, void 0, function () {
            var utils;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        utils = this.Db.params.web3.utils;
                        return [4 /*yield*/, promisify(this.Db.contract.methods.requestDeliveryAttachment(requestId, ipfsHashToBytes32(documentHash)).send, [{ from: this.Db.params.userId }])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Requests.prototype.requestDeliveryDescription = function (requestId, description) {
        return __awaiter(this, void 0, void 0, function () {
            var utils;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        utils = this.Db.params.web3.utils;
                        return [4 /*yield*/, promisify(this.Db.contract.methods.requestDeliveryDescription(requestId, ipfsHashToBytes32(description)).send, [{ from: this.Db.params.userId }])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Requests.prototype.getPastEvents = function (requestId, name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Db.contract.getPastEvents(name, {
                            filter: { requestId: requestId },
                            fromBlock: 0,
                            toBlock: 'latest'
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Requests.prototype.getDeliveryAttachments = function (requestId) {
        return __awaiter(this, void 0, void 0, function () {
            var utils, events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        utils = this.Db.params.web3.utils;
                        return [4 /*yield*/, this.getPastEvents(requestId, 'RegisterDeliveryAttachment')];
                    case 1:
                        events = _a.sent();
                        return [2 /*return*/, events.map(function (r) {
                                return bytes32ToIPFSHash(r.returnValues.proof);
                            })];
                }
            });
        });
    };
    Requests.prototype.getDeliveryDescription = function (requestId) {
        return __awaiter(this, void 0, void 0, function () {
            var utils, events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        utils = this.Db.params.web3.utils;
                        return [4 /*yield*/, this.getPastEvents(requestId, 'RegisterDeliveryDescription')];
                    case 1:
                        events = _a.sent();
                        return [2 /*return*/, events.map(function (r) { return bytes32ToIPFSHash(r.returnValues.description); })];
                }
            });
        });
    };
    return Requests;
}());
exports.Requests = Requests;
function ipfsHashToBytes32(ipfs_hash) {
    var h = bs58.decode(ipfs_hash).toString('hex').replace(/^1220/, '');
    if (h.length != 64) {
        console.log('invalid ipfs format', ipfs_hash, h);
        return null;
    }
    return '0x' + h;
}
function bytes32ToIPFSHash(hash_hex) {
    var buf = new buffer_1.Buffer(hash_hex.replace(/^0x/, '1220'), 'hex');
    return bs58.encode(buf);
}
