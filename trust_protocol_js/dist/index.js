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
var _Marketplace = require("./contracts/Marketplace.json");
var _Trusts = require("./contracts/Trusts.json");
var _ = require("lodash");
// import _Requests from "../contracts/Requests.json";
// import ethUtil from "ethereumjs-util";
// import * as Promise from "es6-promise";
// const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io:dYWKKqsJkbv9cZlQFEpI")
// const web3 = new Web3(provider)
var promisify = function (inner, args) {
    return new Promise(function (resolve, reject) {
        return inner(args, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
};
var Marketplace = (function () {
    function Marketplace(params) {
        this.params = params;
        this.abi = _Marketplace["abi"];
        this.location = "0xfa4f59b6c6a68ee59128bd5ae974fdbb080ad5c0";
        this.contract = new this.params.web3.eth.Contract(this.abi, this.location);
        return this;
    }
    Marketplace.prototype.owner = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify(this.contract.methods.owner().call)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Marketplace.prototype.trusts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify(this.contract.methods.trusts().call)];
                    case 1:
                        address = _a.sent();
                        return [2 /*return*/, new Trusts(this.params, address)];
                }
            });
        });
    };
    return Marketplace;
}());
exports.Marketplace = Marketplace;
var Trusts = (function () {
    function Trusts(params, location) {
        this.params = params;
        this.abi = _Trusts["abi"];
        this.location = location;
        this.contract = new this.params.web3.eth.Contract(this.abi, this.location);
    }
    Trusts.prototype._format = function (trust) {
        return { client: trust[0], name: this.params.web3.utils.hexToAscii(trust[1]) };
    };
    Trusts.prototype.get = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify(this.contract.methods.get(params).call)];
                    case 1:
                        item = _a.sent();
                        return [2 /*return*/, this._format(item)];
                }
            });
        });
    };
    Trusts.prototype.getCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify(this.contract.methods.getCount().call)];
                    case 1: return [2 /*return*/, _a.sent()];
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
                        console.log("GOT IT!", count);
                        return [4 /*yield*/, Promise.all(_.range(count).map(function (i) { return _this.get(i); }))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Trusts;
}());
exports.Trusts = Trusts;
