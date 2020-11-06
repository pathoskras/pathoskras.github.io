"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorksheetFactory = void 0;
const sequelize_1 = require("sequelize");
function WorksheetFactory(sequelize) {
    return sequelize.define('Worksheet', {
        firstName: sequelize_1.DataTypes.STRING,
        lastName: sequelize_1.DataTypes.STRING,
        email: sequelize_1.DataTypes.STRING,
        doctor: sequelize_1.DataTypes.STRING,
        hash: sequelize_1.DataTypes.STRING,
        data: sequelize_1.DataTypes.JSON
    });
}
exports.WorksheetFactory = WorksheetFactory;
