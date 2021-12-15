"use strict";
exports.__esModule = true;
exports.makeBufferChunks = exports.wordArrayToUint8Array = void 0;
var wordArrayToUint8Array = function (wordArray) {
    var l = wordArray.sigBytes;
    var words = wordArray.words;
    var result = new Uint8Array(l);
    var i = 0 /*dst*/, j = 0; /*src*/
    while (true) {
        // here i is a multiple of 4
        if (i == l)
            break;
        var w = words[j++];
        result[i++] = (w & 0xff000000) >>> 24;
        if (i == l)
            break;
        result[i++] = (w & 0x00ff0000) >>> 16;
        if (i == l)
            break;
        result[i++] = (w & 0x0000ff00) >>> 8;
        if (i == l)
            break;
        result[i++] = w & 0x000000ff;
    }
    return result;
};
exports.wordArrayToUint8Array = wordArrayToUint8Array;
var makeBufferChunks = function (buffer, chunkSize) {
    var result = [];
    var i = 0;
    while (i < buffer.length)
        result.push(buffer.slice(i, (i += chunkSize)));
    return result;
};
exports.makeBufferChunks = makeBufferChunks;
