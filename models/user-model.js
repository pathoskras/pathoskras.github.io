"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const sequelize_1 = require("sequelize");
function UserFactory(sequelize) {
    return sequelize.define('users', {
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    });
}
exports.UserFactory = UserFactory;
