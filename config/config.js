"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const mustache = require("mustache");
const nodemailer = require("nodemailer");
const _ = require("lodash");
const { formidable } = require('formidable');
let mail_auth = {
    "user": "username@gmail.com",
    "pass": "password_here_lol"
};
try {
    mail_auth = require('config.json').mail_auth;
}
catch (e) { }
console.log("mail_auth is: ", mail_auth);
var pathos = {
    redirects: {
        "/cas13": "//cas13.david-ma.net",
        "/help": "https://atlassian.petermac.org.au/confluence/display/PVS/How-to+articles",
        "/dropbox": "https://www.dropbox.com/sh/95s0p83vcwnuj5h/AABi4YHSnB40SQa2XJfRXOpfa?dl=0/",
        "/Oberyn": "https://docs.google.com/presentation/d/e/2PACX-1vRbVjtvKU_jFcqWVnYxXQrHdB30Y2Q0oxp1IGDgBu4X_9I3Gm3Q2mTU2SAKl4wcp6A7OT7lIwQgmV1t/pub?start=false&loop=false&delayms=3000",
        "/oberyn": "https://docs.google.com/presentation/d/e/2PACX-1vRbVjtvKU_jFcqWVnYxXQrHdB30Y2Q0oxp1IGDgBu4X_9I3Gm3Q2mTU2SAKl4wcp6A7OT7lIwQgmV1t/pub?start=false&loop=false&delayms=3000"
    },
    "data": true,
    "domains": ["www.pathos.co", "pathos.co"],
    "proxies": {
        "www.pathos.co": {
            "filter": "PathOS",
            "message": "Error, server might be down or proxy settings might be wrong. You can try visiting the server directly at: http://115.146.85.170:8123/PathOS/",
            "host": "115.146.85.170",
            "port": 8123
        },
        "pathos.co": {
            "filter": "PathOS",
            "message": "Error, server might be down or proxy settings might be wrong. You can try visiting the server directly at: http://115.146.85.170:8123/PathOS/",
            "host": "115.146.85.170",
            "port": 8123
        }
    },
    controllers: {
        kras: function (router) {
            router.readTemplate('wrapper.mustache', 'd3_inner', views => {
                console.log(router.path);
                var data = {
                    images: [
                        {
                            image: "KRasEditPlusLabelsNoCaptionsOFF_Switch.png",
                            name: "Inactive KRAS",
                            id: 1
                        },
                        {
                            image: "KRasEditPlusLabelsNoCaptionsON_Switch.png",
                            name: "Active KRAS",
                            id: 2
                        },
                        {
                            image: "KRasEditPlusLabelsNoCaptionsSwitchingOFF.png",
                            name: "KRAS inactivated by p120GAP",
                            id: 3
                        },
                        {
                            image: "KRasEditPlusLabelsNoCaptionsMUTANT_K_Ras.png",
                            name: "Mutant KRAS",
                            id: 4
                        },
                        {
                            image: "KRasEditPlusLabelsNoCaptionsCancerCellsDividing.png",
                            name: "Tumour Cells Dividing",
                            id: 5
                        },
                        {
                            image: "KRas_AMG510WithLabels.png",
                            name: "KRas AMG510",
                            id: 6
                        }
                    ]
                };
                data.imagesJson = JSON.stringify(data.images);
                views.inner = views.kras;
                if (router.path && router.path[0] && router.path[0] !== "") {
                    router.db.Worksheet.findOne({
                        where: {
                            hash: router.path[0]
                        }
                    }).then((d) => {
                        // console.log(d.dataValues);
                        Object.assign(data, JSON.parse(d.dataValues.data));
                        Object.assign(data, {
                            hash: d.dataValues.hash
                        });
                        console.log("data is...", data);
                        var output = mustache.render(views.template, data, views);
                        router.res.end(output);
                    }).catch(e => {
                        console.log("ERROR?");
                        console.log(e);
                        router.res.end(JSON.stringify(e));
                    });
                }
                else {
                    var output = mustache.render(views.template, data, views);
                    router.res.end(output);
                }
            });
        },
        mail: function (router) {
            let transporter = nodemailer.createTransport({
                pool: true,
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: mail_auth
            });
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("Server is ready to take our messages");
                }
            });
            var mailOptions = {
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
            router.res.end("Ok lol I guess we sent some mail??");
        },
        saveDetails: function (router) {
            const form = formidable();
            form.parse(router.req, (err, fields, files) => {
                if (err) {
                    console.log("ERROR!", err);
                    router.res.end(err);
                }
                console.log("Here's all your fields!", fields);
                var data = fields;
                var blob = {
                    email: fields.email,
                    firstName: fields.firstName,
                    lastName: fields.lastName,
                    doctor: fields.doctor,
                    data: JSON.stringify(data)
                };
                if (fields.hash) {
                    var hash = fields.hash;
                    blob.hash = fields.hash;
                    router.db.Worksheet.update(blob, {
                        where: {
                            hash: blob.hash
                        }
                    });
                }
                else {
                    var hash = Math.random().toString(16).slice(2);
                    blob.hash = hash;
                    router.db.Worksheet.create(blob);
                }
                var message = `<a href="/kras/${hash}">Link to saved data</a>. No email sent.`;
                try {
                    var emailOptions = {
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
                    // console.log("Don't send mail...");
                    if (fields.tickedEmailBox) {
                        if (fields.doctor) {
                            emailOptions.subject = `Your K-Ras notes from Dr. ${fields.doctor}`;
                        }
                        sendEmail(emailOptions);
                        message = `<a href="/kras/${hash}">Link sent to patient</a> at ${fields.email} using 7oclockco@gmail.com`;
                    }
                }
                catch (e) {
                    console.log("Error sending mail.", e);
                }
                router.res.end(`Your hash is: ${hash}<br><br>
${message}
                <br><br>

Please use this form to give us feedback on the K-Ras Resource:<br>
<a href="https://forms.gle/jnqC2yFXgN9Zim8N9" target="_blank">https://forms.gle/jnqC2yFXgN9Zim8N9</a>
`);
                //<br><br>
                // Data for debugging purposes: `+JSON.stringify(fields));
            });
        }
    }
};
function sendEmail(config) {
    var options = {
        toAddress: config.toAddress || "7oclockco@gmail.com",
        subject: config.subject || "Your K-Ras notes",
        body: config.body || ""
    };
    let transporter = nodemailer.createTransport({
        pool: true,
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: mail_auth
    });
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Server is ready to take our messages");
        }
    });
    var mailOptions = {
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
const kras_1 = require("./kras");
var config = _.merge(pathos, kras_1.kras);
exports.config = config;
