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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worksheet = exports.dbConfig = void 0;
const sequelize = __importStar(require("sequelize"));
const worksheet_1 = require("./worksheet");
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
let seqOptions = {
    database: process.env.DB_NAME || 'typescript_test',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    dialectOptions: {
        decimalNumbers: true
    },
    define: {
        underscored: true
    }
};
const env = process.env.NODE_ENV || 'development';
try {
    const configOptions = require(path_1.default.resolve(__dirname, '..', 'config', 'config.json'))[env];
    seqOptions = lodash_1.default.merge(seqOptions, configOptions);
}
catch (e) {
    console.error('No config.json provided for Sequelize');
}
if (env === 'development') {
    console.log('Initialising Sequelize with options:', seqOptions);
}
exports.dbConfig = new sequelize.Sequelize(seqOptions);
exports.Worksheet = worksheet_1.WorksheetFactory(exports.dbConfig);
