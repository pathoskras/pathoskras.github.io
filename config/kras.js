"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kras = void 0;
var kras = {
    services: {
        "test": function (res, req, db, type) {
            res.end("Hello World");
        }
    }
};
exports.kras = kras;
