import * as sequelize from 'sequelize';
import {UserFactory} from "./user-model";
import {SkillsFactory} from "./skills-model";

// From https://medium.com/@enetoOlveda/use-sequelize-and-typescript-like-a-pro-with-out-the-legacy-decorators-fbaabed09472

export const dbConfig :sequelize.Sequelize = new sequelize.Sequelize(
    (process.env.DB_NAME = "typescript_test"),
    (process.env.DB_USER = "root"),
    (process.env.DB_PASSWORD = ""),
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
    }
);
// THIS ONES ARE THE ONES YOU NEED TO USE ON YOUR CONTROLLERS
export const User = UserFactory(dbConfig)

// THIS ONES ARE THE ONES YOU NEED TO USE ON YOUR CONTROLLERS
export const Skills = SkillsFactory(dbConfig)
