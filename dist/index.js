"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.generatePKIKeyPair = exports.decryptPKI = exports.encryptPKI = exports.decryptRabbit = exports.encryptRabbit = exports.decryptAES = exports.encryptAES = void 0;
var crypto_js_1 = __importDefault(require("crypto-js"));
var node_forge_1 = __importDefault(require("node-forge"));
var utils_1 = require("./utils");
var encryptAES = function (buffer, secret, config) {
    var wordArray = crypto_js_1["default"].lib.WordArray.create(buffer);
    var encrypted = crypto_js_1["default"].AES.encrypt(wordArray, secret, config);
    return Buffer.from(encrypted.toString());
};
exports.encryptAES = encryptAES;
var decryptAES = function (buffer, secret, config) {
    var wordArray = crypto_js_1["default"].AES.decrypt(String(buffer), secret, config);
    return Buffer.from((0, utils_1.wordArrayToUint8Array)(wordArray));
};
exports.decryptAES = decryptAES;
var encryptRabbit = function (buffer, secret, config) {
    var wordArray = crypto_js_1["default"].lib.WordArray.create(buffer);
    var encrypted = crypto_js_1["default"].Rabbit.encrypt(wordArray, secret, config);
    return Buffer.from(encrypted.toString());
};
exports.encryptRabbit = encryptRabbit;
var decryptRabbit = function (buffer, secret, config) {
    var wordArray = crypto_js_1["default"].Rabbit.decrypt(String(buffer), secret, config);
    return Buffer.from((0, utils_1.wordArrayToUint8Array)(wordArray));
};
exports.decryptRabbit = decryptRabbit;
var _encryptPKI = function (buffer, publicKey) {
    return Buffer.from(node_forge_1["default"].pki
        .publicKeyFromPem(publicKey)
        .encrypt(node_forge_1["default"].util.encodeUtf8(buffer.toString('base64'))));
};
var encryptPKI = function (buffer, publicKey) {
    var chunks = (0, utils_1.makeBufferChunks)(buffer, 183)
        .map(function (chunk) { return _encryptPKI(chunk, publicKey).toString('base64'); })
        .join(',');
    return Buffer.from(chunks);
};
exports.encryptPKI = encryptPKI;
var _decryptPKI = function (encrypted, privateKey) {
    return Buffer.from(node_forge_1["default"].pki.privateKeyFromPem(privateKey).decrypt(encrypted.toString()), 'base64');
};
var decryptPKI = function (encrypted, privateKey) {
    var chunks = encrypted
        .toString()
        .split(',')
        .map(function (chunk) { return _decryptPKI(Buffer.from(chunk, 'base64'), privateKey); });
    return Buffer.concat(chunks);
};
exports.decryptPKI = decryptPKI;
var generatePKIKeyPair = function (options) {
    if (options === void 0) { options = {
        bits: 2048,
        workers: 2,
        e: 0x10001
    }; }
    return new Promise(function (resolve) {
        node_forge_1["default"].pki.rsa.generateKeyPair(options, function (error, keypair) {
            if (error) {
                resolve(undefined);
            }
            else {
                resolve({
                    publicKey: node_forge_1["default"].pki.publicKeyToPem(keypair.publicKey),
                    privateKey: node_forge_1["default"].pki.privateKeyToPem(keypair.privateKey)
                });
            }
        });
    });
};
exports.generatePKIKeyPair = generatePKIKeyPair;
