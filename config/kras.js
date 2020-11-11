"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kras = void 0;
const path_1 = __importDefault(require("path"));
const mustache_1 = __importDefault(require("mustache"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const formidable_1 = __importDefault(require("formidable"));
let mailAuth = {
    user: 'username@gmail.com',
    pass: 'password_here_lol'
};
try {
    mailAuth = require(path_1.default.resolve(__dirname, 'config.json')).mailAuth;
}
catch (e) { }
const kras = {
    controllers: {
        kras: function (router) {
            router.readTemplate('kras.mustache', 'd3_inner', views => {
                const data = {
                    images: [
                        {
                            image: 'KRasEditPlusLabelsNoCaptionsOFF_Switch.png',
                            name: 'KRas Turned Off',
                            id: 1
                        },
                        {
                            image: 'KRasEditPlusLabelsNoCaptionsON_Switch.png',
                            name: 'Kras Turned On',
                            id: 2
                        },
                        {
                            image: 'KRasEditPlusLabelsNoCaptionsSwitchingOFF.png',
                            name: 'Turning Off KRas',
                            id: 3
                        },
                        {
                            image: 'KRasEditPlusLabelsNoCaptionsMUTANT_K_Ras.png',
                            name: 'Altered KRas',
                            id: 4
                        },
                        {
                            image: 'KRasEditPlusLabelsNoCaptionsCancerCellsDividing.png',
                            name: 'Tumour Cells Multiplying',
                            id: 5
                        },
                        {
                            image: 'KRas_AMG510WithLabels.png',
                            name: 'AGM 510 Keeps Altered KRas Turned Off',
                            id: 6
                        }
                    ]
                };
                data.imagesJson = JSON.stringify(data.images);
                views.inner = views.kras;
                if (router.path && router.path[0] && router.path[0] !== '') {
                    router.db.Worksheet.findOne({
                        where: {
                            hash: router.path[0]
                        }
                    }).then((d) => {
                        Object.assign(data, d.data);
                        Object.assign(data, {
                            hash: d.hash
                        });
                        console.log('data is...', data);
                        const output = mustache_1.default.render(views.template, data, views);
                        router.res.end(output);
                    }).catch(e => {
                        console.log('ERROR?');
                        console.log(e);
                        router.res.end(JSON.stringify(e));
                    });
                }
                else {
                    const output = mustache_1.default.render(views.template, data, views);
                    router.res.end(output);
                }
            });
        },
        mail: function (router) {
            const transporter = nodemailer_1.default.createTransport({
                pool: true,
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: mailAuth
            });
            transporter.verify(function (error) {
                if (error) {
                    console.log('Nodemailer error');
                    console.log(error);
                }
                else {
                    console.log('Nodemailer: Server is ready to take our messages');
                }
            });
            const mailOptions = {
                from: '7oclockco@gmail.com',
                to: 'eohomguhetqnxffobm@awdrt.net',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
            router.res.end('Ok lol I guess we sent some mail??');
        },
        saveDetails: function (router) {
            const form = new formidable_1.default.IncomingForm();
            form.parse(router.req, (err, fields) => {
                if (err) {
                    console.log('ERROR!', err);
                    router.res.end(err);
                }
                console.log("Here's all your fields!", fields);
                const data = fields;
                const blob = {
                    email: fields.email,
                    firstName: fields.firstName,
                    lastName: fields.lastName,
                    doctor: fields.doctor,
                    data: JSON.stringify(data)
                };
                let hash = Math.random().toString(16).slice(2);
                if (fields.hash) {
                    hash = fields.hash;
                    blob.hash = fields.hash;
                    router.db.Worksheet.update(blob, {
                        where: {
                            hash: blob.hash
                        }
                    });
                }
                else {
                    blob.hash = hash;
                    router.db.Worksheet.create(blob);
                }
                let message = `<a href="/kras/${hash}">Link to saved data</a>. No email sent.`;
                try {
                    const emailOptions = {
                        toAddress: fields.email,
                        body: `
Hello!

Thanks for using the PathOS K-Ras Resource.

Your notes are here:
https://pathos.co/kras/${hash}

Please use this form to give us feedback on the K-Ras Resource:
https://forms.gle/jnqC2yFXgN9Zim8N9

Thanks,
PathOS Team.
`
                    };
                    if (fields.tickedEmailBox) {
                        if (fields.doctor) {
                            emailOptions.subject = `Your K-Ras notes from Dr. ${fields.doctor}`;
                        }
                        sendEmail(emailOptions);
                        message = `<a href="/kras/${hash}">Link sent to patient</a> at ${fields.email} using 7oclockco@gmail.com`;
                    }
                }
                catch (e) {
                    console.log('Error sending mail.', e);
                }
                router.res.end(`Your hash is: ${hash}<br><br>
${message}
<br><br>
Please use this form to give us feedback on the K-Ras Resource:<br>
<a href="https://forms.gle/jnqC2yFXgN9Zim8N9" target="_blank">https://forms.gle/jnqC2yFXgN9Zim8N9</a>
`);
            });
        }
    }
};
exports.kras = kras;
function sendEmail(config) {
    const options = {
        toAddress: config.toAddress || '7oclockco@gmail.com',
        subject: config.subject || 'Your K-Ras notes',
        body: config.body || ''
    };
    const transporter = nodemailer_1.default.createTransport({
        pool: true,
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: mailAuth
    });
    transporter.verify(function (error) {
        if (error) {
            console.log('Nodemailer error');
            console.log(error);
        }
        else {
            console.log('Nodemailer: Server is ready to take our messages');
        }
    });
    const mailOptions = {
        from: '7oclockco@gmail.com',
        to: options.toAddress,
        subject: options.subject,
        text: options.body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}
