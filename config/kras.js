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
const puppeteer_1 = __importDefault(require("puppeteer"));
console.log('Loading kras.ts');
let mailAuth = {
    user: 'username@gmail.com',
    pass: 'password_here_lol'
};
try {
    mailAuth = require(path_1.default.resolve(__dirname, 'config.json')).mailAuth;
}
catch (e) {
    console.log('Error loading mailAuth');
    console.log(e);
}
const kras = {
    controllers: {
        kras: function (router) {
            router.readTemplate('kras.mustache', 'd3_inner', views => {
                const data = {
                    images: [
                        {
                            image: 'KRasEditPlusLabelsNoCaptionsOFF_Switch.png',
                            name: 'KRas Turned Off',
                            legend: 'The switch indicated in red keeps KRas turned off.',
                            id: 1
                        },
                        {
                            image: 'KRasEditPlusLabelsNoCaptionsON_Switch.png',
                            name: 'KRas Turned On',
                            legend: 'The red off switch is swapped for the green on-switch, turning KRas on.',
                            id: 2
                        },
                        {
                            image: 'KRasEditPlusLabelsNoCaptionsSwitchingOFF.png',
                            name: 'Turning Off KRas',
                            legend: 'The large orange molecule splits the on switch in KRas, converting it back to an off switch. This turns KRas off once again.',
                            id: 3
                        },
                        {
                            image: 'KRasEditPlusLabelsNoCaptionsMUTANT_K_Ras.png',
                            name: 'Altered KRas',
                            legend: 'A defective alteration in KRas is indicated in purple. This alteration keeps the green on switch permanently in place and KRas constantly switched on.',
                            id: 4
                        },
                        {
                            image: 'KRasEditPlusLabelsNoCaptionsCancerCellsDividing.png',
                            name: 'Tumour Cells Multiplying',
                            legend: 'If KRas is constantly switched on, this results in out of control cell multiplication.',
                            id: 5
                        },
                        {
                            image: 'KRas_AMG510WithLabels.png',
                            name: 'AMG 510 Keeps Altered KRas Turned Off',
                            legend: 'New treatment AMG 510 fits into altered KRas, keeping the off switch in place, keeping altered KRas turned off.',
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
                makePdf(hash).then(pdf => {
                    let message = `<a href="/kras/${hash}">Link to saved data</a>. No email sent.
<br>
<a target="_blank" href="${pdf}">Download PDF</a>.
`;
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
  Please use this form to give us feedback on the KRas Resource:<br>
  <a href="https://forms.gle/jnqC2yFXgN9Zim8N9" target="_blank">https://forms.gle/jnqC2yFXgN9Zim8N9</a>
  `);
                });
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
async function makePdf(hash) {
    return new Promise((resolve, reject) => {
        puppeteer_1.default.launch({}).then(browser => {
            browser.newPage().then(page => {
                page.setExtraHTTPHeaders({
                    'test-host': 'pathos.david-ma.net'
                }).then(() => {
                    page.goto(`http://localhost:1337/kras/${hash}`, {
                        waitUntil: 'domcontentloaded'
                    }).then(() => {
                        page.evaluate('printVersion()').then(() => {
                            page.waitForTimeout(500).then(() => {
                                const filepath = path_1.default.resolve(__dirname, '..', 'data', 'pdfs', `KRas-${hash}.pdf`);
                                page.pdf({
                                    path: filepath,
                                    format: 'A4'
                                }).then(() => {
                                    browser.close();
                                    resolve(`/pdfs/KRas-${hash}.pdf`);
                                }).catch(error => {
                                    console.error(error);
                                    reject(error);
                                });
                            });
                        });
                    }).catch(error => {
                        console.error(error);
                        reject(error);
                    });
                });
            });
        });
    });
}
