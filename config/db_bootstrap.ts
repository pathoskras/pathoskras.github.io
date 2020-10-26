console.log("running bootstrap.ts")

import { Model, Sequelize } from "sequelize";
import { dbConfig, User, Skills }from '../models/index'

import { SkillsStatic, UserModel, UserStatic } from "../models/api-rest"

interface seqObject {
    [key: string] : Sequelize | Model<any> | UserStatic | SkillsStatic;
    sequelize :Sequelize;
}

const seq :seqObject = {
    sequelize: dbConfig,
    User: User,
    Skills: Skills
}

// seq.Worksheet = require(`${__dirname}/../models`).Worksheet;

// const Worksheet = seq.Worksheet = require(`${__dirname}/../models`).Worksheet;

if (true) {
    seq.sequelize.sync({
        
    }).then(d => {
        // const [user, created] = 
        User.findOrCreate({
            where: { email: 'blah@gmail.com' },
            defaults: {
                email: "blah@gmail.com",
                name: "my name is blah"
            }
        }).then(([user, created]) => {
            console.log(user.name);
            console.log(created);
        });

    });
}



export { seq }
