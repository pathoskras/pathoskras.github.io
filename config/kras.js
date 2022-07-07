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
const env = process.env.NODE_ENV || 'development';
const port = process.argv.find(e => e.match(/^\d{0,5}$/)) || '1337';
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
                            image: 'KRasEditPlusLabelsOFF_SwitchPlusWatermarkNewFont.png',
                            smugmug: 'https://photos.smugmug.com/photos/i-9D27hvg/0/175fb517/O/i-9D27hvg.png',
                            large: 'https://photos.smugmug.com/photos/i-9D27hvg/0/175fb517/L/i-9D27hvg.png',
                            thumbnail: 'https://photos.smugmug.com/photos/i-9D27hvg/0/175fb517/S/i-9D27hvg-S.png',
                            name: 'KRas turned off',
                            legend: 'The switch indicated in red keeps KRas turned off.',
                            id: 0
                        },
                        {
                            image: 'KRasEditPlusLabelsON_SwitchPlusWatermarkNewFont.png',
                            smugmug: 'https://photos.smugmug.com/photos/i-CVr9K9F/0/2d06e038/O/i-CVr9K9F.png',
                            large: 'https://photos.smugmug.com/photos/i-CVr9K9F/0/2d06e038/XL/i-CVr9K9F-XL.png',
                            thumbnail: 'https://photos.smugmug.com/photos/i-CVr9K9F/0/2d06e038/S/i-CVr9K9F-S.png',
                            name: 'KRas turned on',
                            legend: 'The red off switch is swapped for the green on-switch, turning KRas on.',
                            id: 1
                        },
                        {
                            image: 'KRasEditPlusLabelsSwitchingOFF_PlusWatermarkNewFont.png',
                            smugmug: 'https://photos.smugmug.com/photos/i-NfhJBQL/0/475035ae/O/i-NfhJBQL.png',
                            large: 'https://photos.smugmug.com/photos/i-NfhJBQL/0/475035ae/XL/i-NfhJBQL-XL.png',
                            thumbnail: 'https://photos.smugmug.com/photos/i-NfhJBQL/0/475035ae/S/i-NfhJBQL-S.png',
                            name: 'Turning off KRas',
                            legend: 'The large orange molecule splits the on switch in KRas, converting it back to an off switch. This turns KRas off once again.',
                            id: 2
                        },
                        {
                            image: 'KRasEditPlusLabelsMUTANT_K_RasPlusWatermarkNewFont.png',
                            smugmug: 'https://photos.smugmug.com/photos/i-jg8H773/0/4bf0d847/O/i-jg8H773.png',
                            large: 'https://photos.smugmug.com/photos/i-jg8H773/0/4bf0d847/XL/i-jg8H773-XL.png',
                            thumbnail: 'https://photos.smugmug.com/photos/i-jg8H773/0/4bf0d847/S/i-jg8H773-S.png',
                            name: 'Faulty KRas',
                            legend: 'A defect or fault in KRas is indicated in purple. This defect keeps the green on switch permanently in place and KRas constantly switched on.',
                            id: 3
                        },
                        {
                            image: 'KRasEditPlusLabelsCancerCellsDividingPlusWatermarkNewFont.png',
                            smugmug: 'https://photos.smugmug.com/photos/i-gkj3Xzw/0/64e4301b/O/i-gkj3Xzw.png',
                            large: 'https://photos.smugmug.com/photos/i-gkj3Xzw/0/64e4301b/XL/i-gkj3Xzw-XL.png',
                            thumbnail: 'https://photos.smugmug.com/photos/i-gkj3Xzw/0/64e4301b/S/i-gkj3Xzw-S.png',
                            name: 'Tumour cells dividing',
                            legend: 'If KRas is constantly switched on, this results in out of control cell division.',
                            id: 4
                        },
                        {
                            image: 'FaultyKRasTreatmentWithLabelsPlusWatermarkNewFont.png',
                            smugmug: 'https://photos.smugmug.com/photos/i-ghbT7xL/0/a5cb15ba/O/i-ghbT7xL.png',
                            large: 'https://photos.smugmug.com/photos/i-ghbT7xL/0/a5cb15ba/XL/i-ghbT7xL-XL.png',
                            thumbnail: 'https://photos.smugmug.com/photos/i-ghbT7xL/0/a5cb15ba/S/i-ghbT7xL-S.png',
                            name: 'New treatments keep faulty KRas turned off',
                            legend: 'New treatments fit into faulty KRas, keeping the off switch in place, keeping faulty KRas turned off.',
                            id: 5
                        }
                    ]
                };
                data.imagesJson = JSON.stringify(data.images);
                views.inner = views.kras;
                if (router.path && router.path[0] && router.path[0] !== '' && router.db) {
                    router.db.Worksheet.findOne({
                        where: {
                            hash: router.path[0]
                        }
                    }).then((d) => {
                        try {
                            if (typeof d.data === 'string') {
                                Object.assign(data, JSON.parse(d.data));
                            }
                            else {
                                Object.assign(data, d.data);
                            }
                        }
                        catch (e) {
                            console.error(`Error loading kras hash: ${router.path[0]}`);
                        }
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
        failsafeSaveDetails: function (router) {
            console.log("Warning, someone is trying to use the KRAS app");
            router.res.end(`Sorry saving data and emailing is currently not available.<br>If you need a PDF copy of this website, Please download and use this: <a href="https://pathos.co/pdfs/example.pdf">https://pathos.co/pdfs/example.pdf</a>`);
        },
        saveDetails: function (router) {
            const form = new formidable_1.default.IncomingForm();
            form.parse(router.req, (err, fields) => {
                if (err) {
                    console.log('ERROR!', err);
                    router.res.end(err);
                }
                const blob = {
                    email: typeof fields.email === 'string' ? fields.email : fields.email[0],
                    firstName: typeof fields.firstName === 'string' ? fields.firstName : fields.firstName[0],
                    lastName: typeof fields.lastName === 'string' ? fields.lastName : fields.lastName[0],
                    doctor: typeof fields.doctor === 'string' ? fields.doctor : fields.doctor[0],
                    hash: "placeholder",
                    data: fields
                };
                let hash = Math.random().toString(16).slice(2);
                if (fields.hash) {
                    hash = fields.hash;
                    blob.hash = typeof fields.hash === 'string' ? fields.hash : fields.hash[0];
                    router.db.Worksheet.update(blob, {
                        where: {
                            hash: blob.hash
                        }
                    });
                }
                else {
                    blob.hash = hash;
                    try {
                        router.db.Worksheet.create(blob);
                    }
                    catch (e) {
                        console.log('Error creating worksheet');
                        console.error(e);
                    }
                }
                let message = `<a href="/kras/${hash}">Link to saved data</a>. No email sent.
`;
                makePdf(hash).then(pdf => {
                    message = `<a href="/kras/${hash}">Link to saved data</a>. No email sent.
<br>
<a target="_blank" href="${pdf}">Download PDF</a>.
`;
                    try {
                        const filepath = path_1.default.resolve(__dirname, '..', 'data', 'pdfs', `KRas-${hash}.pdf`);
                        const emailOptions = {
                            toAddress: fields.email,
                            attachments: [
                                {
                                    filename: 'KRas_notes.pdf',
                                    path: filepath
                                }
                            ],
                            body: `
Hello!
  
Thanks for using the PathOS KRas Resource.
  
Your notes are here:
https://www.pathos.co/kras/${hash}

PDF: https://www.pathos.co${pdf}
  
Thanks,
PathOS Team.
`
                        };
                        if (fields.tickedEmailBox) {
                            if (fields.doctor) {
                                emailOptions.subject = `Your KRas notes from Dr. ${fields.doctor}`;
                            }
                            sendEmail(emailOptions);
                            message = `<a href="/kras/${hash}">Link sent to patient</a> at ${fields.email} using 7oclockco@gmail.com
<br>
<a target="_blank" href="${pdf}">Download PDF</a>.
`;
                        }
                    }
                    catch (e) {
                        console.log('Error sending mail.', e);
                    }
                    router.res.end(`Your hash is: ${hash}<br><br>
  ${message}
  `);
                }).catch(e => {
                    console.log('Error making PDF');
                    console.error(e);
                    router.res.end(`Your hash is: ${hash}<br><br>
  ${message}
  `);
                });
            });
        }
    }
};
exports.kras = kras;
function sendEmail(config) {
    console.log("Sending email with config", config);
    const options = {
        toAddress: config.toAddress || '7oclockco@gmail.com',
        subject: config.subject || 'Your K-Ras notes',
        attachments: config.attachments || [],
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
        text: options.body,
        attachments: options.attachments
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
        let puppeteerOptions = {};
        if (env === "pi") {
            puppeteerOptions = {
                headless: true,
                executablePath: '/usr/bin/chromium-browser',
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            };
        }
        puppeteer_1.default.launch(puppeteerOptions).then(browser => {
            browser.newPage().then(page => {
                page.setExtraHTTPHeaders({
                    'x-host': 'pathos.co'
                }).then(() => {
                    page.goto(`http://localhost:${port}/kras/${hash}`, {
                        waitUntil: 'networkidle0'
                    }).then(() => {
                        page.evaluate('printVersion()').then(() => {
                            page.waitForTimeout(500).then(() => {
                                const filepath = path_1.default.resolve(__dirname, '..', 'data', 'pdfs', `KRas-${hash}.pdf`);
                                page.pdf({
                                    path: filepath,
                                    printBackground: true,
                                    landscape: true,
                                    margin: {
                                        top: '0.9cm',
                                        right: '0.9cm',
                                        bottom: '0.9cm',
                                        left: '0.9cm'
                                    }
                                }).then(() => {
                                    browser.close();
                                    resolve(`/pdfs/KRas-${hash}.pdf`);
                                }).catch(error => {
                                    console.error(error);
                                    reject(error);
                                });
                            });
                        }).catch(error => {
                            console.error(error);
                            reject(error);
                        });
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
}
