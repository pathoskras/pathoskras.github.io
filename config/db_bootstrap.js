"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seq = void 0;
const models_1 = require("../models");
const seq = {
    sequelize: models_1.dbConfig,
    Worksheet: models_1.Worksheet
};
exports.seq = seq;
