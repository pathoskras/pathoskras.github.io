import { Model, Sequelize } from "sequelize";
import { dbConfig, User, Skills, Worksheet } from '../models'
import { SkillsStatic, WorksheetStatic, UserStatic } from "../models/models"

interface seqObject {
    [key: string] : Model | any | Sequelize; //<any> | UserStatic | SkillsStatic | WorksheetStatic;
    sequelize :Sequelize;
}

const seq :seqObject = {
    sequelize: dbConfig,
    User: User,
    Skills: Skills,
    Worksheet: Worksheet
}

// seq.Worksheet = require(`${__dirname}/../models`).Worksheet;

// const Worksheet = seq.Worksheet = require(`${__dirname}/../models`).Worksheet;

if (false) {
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
