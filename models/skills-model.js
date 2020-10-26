"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillsFactory = void 0;
const sequelize_1 = require("sequelize");
function SkillsFactory(sequelize) {
    return sequelize.define("skills", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        skill: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    });
}
exports.SkillsFactory = SkillsFactory;
