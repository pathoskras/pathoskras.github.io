"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seq = void 0;
const models_1 = require("../models");
const seq = {
    sequelize: models_1.dbConfig,
    Worksheet: models_1.Worksheet,
    Log: models_1.Log,
};
exports.seq = seq;
seq.sequelize.sync({ force: false }).then(() => {
    console.log('Sequelize kras database & worksheet table ready.');
});
