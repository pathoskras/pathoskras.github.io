"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillsFactory = void 0;
const sequelize_1 = require("sequelize");
function SkillsFactory(sequelize) {
    return sequelize.define('skills', {
        skill: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    });
}
exports.SkillsFactory = SkillsFactory;
