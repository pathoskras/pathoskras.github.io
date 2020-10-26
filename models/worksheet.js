'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// import { Sequelize, Model, DataTypes, Optional } from "sequelize";
module.exports = function (sequelize, DataTypes) {
    const Worksheet = sequelize.define('Worksheet', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        doctor: DataTypes.STRING,
        hash: DataTypes.STRING,
        data: DataTypes.TEXT
    }, {});
    //   Worksheet.associate = function(models) {
    //     // associations can be defined here
    //   };
    return Worksheet;
};
