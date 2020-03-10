const seq = require(`${__dirname}/models/index`);
const Worksheet = seq.Worksheet = require(`${__dirname}/models`).Worksheet;

if (false) {
    seq.sequelize.sync({
        
    }).then(d => {

    });
}


exports.seq = seq;