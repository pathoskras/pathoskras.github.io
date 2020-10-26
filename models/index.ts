import * as sequelize from 'sequelize';
import {UserFactory} from "./user-model";
import {SkillsFactory} from "./skills-model";
import { WorksheetFactory } from './worksheet';

// Adapted from https://medium.com/@enetoOlveda/use-sequelize-and-typescript-like-a-pro-with-out-the-legacy-decorators-fbaabed09472

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

export const dbConfig :sequelize.Sequelize = new sequelize.Sequelize(
    (process.env.DB_NAME = config.database || "typescript_test"),
    (process.env.DB_USER = config.username || "root"),
    (process.env.DB_PASSWORD = config.password || ""),
    {
        port: Number(process.env.DB_PORT) || 3306,
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        pool: {
            min: 0,
            max: 5,
            acquire: 30000,
            idle: 10000,
        },
        // logging: (env == "development"), // should be a function or false??
        define: {
            underscored: true
        }
    }
);

export const User = UserFactory(dbConfig)
export const Skills = SkillsFactory(dbConfig)
export const Worksheet = WorksheetFactory(dbConfig)
