"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skills = exports.User = exports.dbConfig = void 0;
const sequelize = __importStar(require("sequelize"));
const user_model_1 = require("./user-model");
const skills_model_1 = require("./skills-model");
// From https://medium.com/@enetoOlveda/use-sequelize-and-typescript-like-a-pro-with-out-the-legacy-decorators-fbaabed09472
exports.dbConfig = new sequelize.Sequelize((process.env.DB_NAME = "typescript_test"), (process.env.DB_USER = "root"), (process.env.DB_PASSWORD = ""), {
    port: Number(process.env.DB_PORT) || 3306,
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000,
    },
});
// THIS ONES ARE THE ONES YOU NEED TO USE ON YOUR CONTROLLERS
exports.User = user_model_1.UserFactory(exports.dbConfig);
// THIS ONES ARE THE ONES YOU NEED TO USE ON YOUR CONTROLLERS
exports.Skills = skills_model_1.SkillsFactory(exports.dbConfig);
