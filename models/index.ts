import * as sequelize from 'sequelize';
import { UserFactory } from "./user-model";
import { SkillsFactory } from "./skills-model";
import { WorksheetFactory } from './worksheet';
import _ from "lodash";

// Default options
let seqOptions :sequelize.Options = {
    "database": process.env.DB_NAME || "typescript_test",
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASSWORD || "",
    "port": 3306,
    "dialect": "mysql",
    "define": {
        "underscored": true
    }
}

// Load options from config.json if one is provided
const env = process.env.NODE_ENV || 'development';
try {
    let configOptions = require(__dirname + '/../config/config.json')[env];
    seqOptions = _.merge(seqOptions, configOptions);
} catch(e){ console.error("No config.json provided for Sequelize"); }

// Do NOT log your password on production!!!
if(env == 'development') { console.log("Initilizing Sequelize with options:", seqOptions); }

// Set up all the models
export const dbConfig :sequelize.Sequelize = new sequelize.Sequelize(seqOptions);

export const User = UserFactory(dbConfig)
export const Skills = SkillsFactory(dbConfig)
export const Worksheet = WorksheetFactory(dbConfig)

// Set up any associations on the models
User.hasMany(Skills)
Skills.belongsTo(User)
