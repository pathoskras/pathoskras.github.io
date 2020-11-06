"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seq = void 0;
const models_1 = require("../models");
const seq = {
    sequelize: models_1.dbConfig,
    User: models_1.User,
    Skills: models_1.Skills,
    Worksheet: models_1.Worksheet
};
exports.seq = seq;
if (false) {
    seq.sequelize.sync({}).then(() => {
        models_1.User.findOrCreate({
            where: { email: 'blah@gmail.com' },
            defaults: {
                email: 'blah@gmail.com',
                name: 'my name is blah'
            }
        }).then(([user, created]) => {
            console.log(user.name);
            console.log(created);
        });
    });
}
