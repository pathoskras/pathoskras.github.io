"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seq = void 0;
console.log("running bootstrap.ts");
const seq = require(`${__dirname}/../models/index`);
exports.seq = seq;
const Worksheet = seq.Worksheet = require(`${__dirname}/../models`).Worksheet;
if (false) {
    seq.sequelize.sync({}).then(d => {
    });
}
