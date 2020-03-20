const mustache = require('mustache');
const nodemailer = require('nodemailer');
const formidable = require('formidable');
let config = {
    "mail_auth": {
        "user": "username@gmail.com",
        "pass": "password_here_lol"
    }
}
try {
    config = require(__dirname + '/config/config.json')
} catch (e) {}
const mail_auth = config.mail_auth;

exports.config = {
    redirects: {
        "/help": "https://vm-115-146-91-157.melbourne.rc.nectar.org.au/confluence/display/PVS/How-to+articles",
        "/dropbox": "https://www.dropbox.com/sh/95s0p83vcwnuj5h/AABi4YHSnB40SQa2XJfRXOpfa?dl=0/",
        "/DEMONSTRATORS": "http://115.146.84.92:8123/PathOS/",
        "/A1": "http://115.146.84.87:8123/PathOS/",
        "/A2": "http://115.146.84.98:8123/PathOS/",
        "/A3": "http://115.146.84.80:8123/PathOS/",
        "/A4": "http://115.146.84.99:8123/PathOS/",
        "/A5": "http://115.146.84.49:8123/PathOS/",
        "/A6": "http://115.146.84.96:8123/PathOS/",
        "/A7": "http://115.146.84.93:8123/PathOS/",
        "/A8": "http://115.146.84.100:8123/PathOS/",
        "/B1": "http://115.146.84.90:8123/PathOS/",
        "/B2": "http://115.146.84.104:8123/PathOS/",
        "/B3": "http://115.146.84.97:8123/PathOS/",
        "/B4": "http://115.146.84.101:8123/PathOS/",
        "/B5": "http://115.146.84.108:8123/PathOS/",
        "/B6": "http://115.146.84.109:8123/PathOS/",
        "/B7": "http://115.146.84.107:8123/PathOS/",
        "/B8": "http://115.146.84.105:8123/PathOS/",
        "/OBSERVERS": "http://115.146.84.91:8123/PathOS/",
        "/bbq": "https://doodle.com/poll/c2iqixwmra48vbiw",
        "/BBQ": "https://doodle.com/poll/c2iqixwmra48vbiw",
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
        wrapper: function(router) {
            router.readTemplate('wrapper.mustache', 'dummy', views => {
                console.log(router.path);
                var data = {
                    images: [
                        {
                            image: "KRasGapBoundSwitchOffFrame2752.png",
                            name: "Inactive Kras",
                            id: 1
                        },
                        {
                            image: "KRasGDPBoundWithSos1Frame1429.png",
                            name: "Kras bound with Sos",
                            id: 2
                        },
                        {
                            image: "KRasGTPBoundWithSos1.png",
                            name: "GTP Bound with Sos1",
                            id: 3
                        },
                        {
                            image: "MutantKRasBoundToRaf1Frame3233.png",
                            name: "Mutant Kras",
                            id: 4
                        },
                        {
                            image: "tumourCelllsDividingFrame3779.png",
                            name: "Tumour Cells",
                            id: 5
                        }
                    ]
                }
                views.inner = views.kras;
                if(router.path && router.path[0] && router.path[0] !== "") {
                    router.db.Worksheet.findOne({
                        where: {
                            hash: router.path[0]
                        }
                    }).then((d) => {
                        console.log(d.dataValues);
                        // console.log(parse);
                        Object.assign(data, JSON.parse(d.dataValues.data));

                        var output = mustache.render(views.template, data, views);
                        router.res.end(output);    
                    }).catch(e => {
                        console.log("ERROR?");
                        console.log(e);
                        router.res.end(JSON.stringify(e));
                    })

                } else {
                    var output = mustache.render(views.template, data, views);
                    router.res.end(output);
                }
            })
        },
        kras: function(router) {
            router.readTemplate('wrapper.mustache', 'd3_inner', views => {
                console.log(router.path);
                var data = {
                    images: [
                        {
                            image: "KRasGDPBoundWithSos1Frame1429.png",
                            name: "Inactive KRAS",
                            id: 1
                        },
                        {
                            image: "KRasGTPBoundWithSos1.png",
                            name: "Active KRAS",
                            id: 2
                        },
                        {
                            image: "KRasGapBoundSwitchOffFrame2752.png",
                            name: "KRAS inactivated by p120GAP",
                            id: 3
                        },
                        {
                            image: "MutantKRasBoundToRaf1Frame3233.png",
                            name: "Mutant KRAS",
                            id: 4
                        },
                        {
                            image: "tumourCelllsDividingFrame3779.png",
                            name: "Tumour Cells Dividing",
                            id: 5
                        }
                    ]
                }
                data.imagesJson = JSON.stringify(data.images);

                views.inner = views.kras;
                if(router.path && router.path[0] && router.path[0] !== "") {
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
                        var output = mustache.render(views.template, data, views);
                        router.res.end(output);    
                    }).catch(e => {
                        console.log("ERROR?");
                        console.log(e);
                        router.res.end(JSON.stringify(e));
                    })

                } else {
                    var output = mustache.render(views.template, data, views);
                    router.res.end(output);
                }
            })
        },
        old_kras: function (router) {
            // console.log(Object.keys(router.views));
            router.readAllViews(function(views){
                const data = {
                    images: [
                        {image: '/images/a.jpg'}
                        // {image: '/images/prob.jpeg'}
                    ],
                    foo: [{
                        abc: 123
                    }]
                };

                // console.log(Object.keys(views));

                var output = mustache.render(views.kras, data, views);
                router.res.end(output);
            })
        },
        mail: function (router) {
            let transporter = nodemailer.createTransport({
                pool: true,
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // use TLS
                auth: mail_auth
            });
            transporter.verify(function(error, success) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Server is ready to take our messages");
                }
              });

              var mailOptions = {
                from: '7oclockco@gmail.com',
                to: 'eohomguhetqnxffobm@awdrt.net',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
              };

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
              



              router.res.end("Ok lol I guess we sent some mail??");
        },
        saveDetails: function(router){
            const form = formidable();
            form.parse(router.req, (err, fields, files) =>{
                if(err) {
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
                }

                if(fields.hash) {
                    var hash = fields.hash;
                    blob.hash = fields.hash;
                    router.db.Worksheet.update(blob, {
                        where: {
                            hash: blob.hash
                        }
                    });
                } else {
                    var hash = Math.random().toString(16).slice(2);
                    blob.hash = hash;
                    router.db.Worksheet.create(blob);
                }



try {
    var emailOptions = {
        toAddress: fields.email,
        body: `
Click this <a href="/kras/${hash}">link</a> to see your notes.
`
    }
    console.log("Don't send mail...");
    // sendEmail(emailOptions);
} catch(e) {
    console.log("Error sending mail.", e);
}

            router.res.end(`Your hash is: ${hash}<br><br>
<a href="/kras/${hash}">Link to send to patient</a>
                <br><br>
                Data: `+JSON.stringify(fields));
            });
        }
    }
}


function sendEmail(config) {
    var options = {
        toAddress: config.toAddress || "7oclockco@gmail.com",
        subject: config.subject || "Your KRAS notes",
        body: config.body || ""
    }

    let transporter = nodemailer.createTransport({
        pool: true,
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // use TLS
        auth: mail_auth
    });
    transporter.verify(function(error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

      var mailOptions = {
        from: '7oclockco@gmail.com',
        to: 'eohomguhetqnxffobm@awdrt.net',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      

}
