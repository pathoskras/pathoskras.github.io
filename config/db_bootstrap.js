"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seq = void 0;
console.log("running bootstrap.ts");
const index_1 = require("../models/index");
const seq = {
    sequelize: index_1.dbConfig,
    User: index_1.User,
    Skills: index_1.Skills
};
exports.seq = seq;
// seq.Worksheet = require(`${__dirname}/../models`).Worksheet;
// const Worksheet = seq.Worksheet = require(`${__dirname}/../models`).Worksheet;
if (true) {
    seq.sequelize.sync({}).then(d => {
        // const [user, created] = 
        index_1.User.findOrCreate({
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
