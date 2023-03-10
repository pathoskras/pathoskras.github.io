import { WorksheetAttributes, WorksheetModel } from '../models/models'
import path from 'path'
import mustache from 'mustache'
import nodemailer from 'nodemailer'
import formidable from 'formidable'
import puppeteer from 'puppeteer'
import { Thalia } from '../../../server/thalia'

import { writeFile } from 'node:fs'
import { Buffer } from 'node:buffer'
import _ from 'lodash'

// console.log('Loading kras.ts')

const env = process.env.NODE_ENV || 'development'
const port = process.argv.find((e) => e.match(/^\d{0,5}$/)) || '1337'

let mailAuth = {
  // eslint-disable-line
  user: 'username@gmail.com',
  pass: 'password_here_lol',
}

try {
  mailAuth = require(path.resolve(__dirname, 'config.json')).mailAuth
} catch (e) {
  console.log('Error loading mailAuth')
  console.log(e)
}

const imageData = {
  images: [
    {
      image: 'KRasEditPlusLabelsOFF_SwitchPlusWatermarkNewFont.png',
      smugmug:
        'https://photos.smugmug.com/photos/i-9D27hvg/0/175fb517/O/i-9D27hvg.png',
      large:
        'https://photos.smugmug.com/photos/i-9D27hvg/0/175fb517/L/i-9D27hvg.png',
      thumbnail:
        'https://photos.smugmug.com/photos/i-9D27hvg/0/175fb517/S/i-9D27hvg-S.png',
      name: 'KRas turned off',
      legend: 'The switch indicated in red keeps KRas turned off.',
      id: 0,
    },
    {
      image: 'KRasEditPlusLabelsON_SwitchPlusWatermarkNewFont.png',
      smugmug:
        'https://photos.smugmug.com/photos/i-CVr9K9F/0/2d06e038/O/i-CVr9K9F.png',
      large:
        'https://photos.smugmug.com/photos/i-CVr9K9F/0/2d06e038/XL/i-CVr9K9F-XL.png',
      thumbnail:
        'https://photos.smugmug.com/photos/i-CVr9K9F/0/2d06e038/S/i-CVr9K9F-S.png',
      name: 'KRas turned on',
      legend:
        'The red off switch is swapped for the green on-switch, turning KRas on.',
      id: 1,
    },
    {
      image: 'KRasEditPlusLabelsSwitchingOFF_PlusWatermarkNewFont.png',
      smugmug:
        'https://photos.smugmug.com/photos/i-NfhJBQL/0/475035ae/O/i-NfhJBQL.png',
      large:
        'https://photos.smugmug.com/photos/i-NfhJBQL/0/475035ae/XL/i-NfhJBQL-XL.png',
      thumbnail:
        'https://photos.smugmug.com/photos/i-NfhJBQL/0/475035ae/S/i-NfhJBQL-S.png',
      name: 'Turning off KRas',
      legend:
        'The large orange molecule splits the on switch in KRas, converting it back to an off switch. This turns KRas off once again.',
      id: 2,
    },
    {
      image: 'KRasEditPlusLabelsMUTANT_K_RasPlusWatermarkNewFont.png',
      smugmug:
        'https://photos.smugmug.com/photos/i-jg8H773/0/4bf0d847/O/i-jg8H773.png',
      large:
        'https://photos.smugmug.com/photos/i-jg8H773/0/4bf0d847/XL/i-jg8H773-XL.png',
      thumbnail:
        'https://photos.smugmug.com/photos/i-jg8H773/0/4bf0d847/S/i-jg8H773-S.png',
      name: 'Faulty KRas',
      legend:
        'A defect or fault in KRas is indicated in purple. This defect keeps the green on switch permanently in place and KRas constantly switched on.',
      id: 3,
    },
    {
      image: 'KRasEditPlusLabelsCancerCellsDividingPlusWatermarkNewFont.png',
      smugmug:
        'https://photos.smugmug.com/photos/i-gkj3Xzw/0/64e4301b/O/i-gkj3Xzw.png',
      large:
        'https://photos.smugmug.com/photos/i-gkj3Xzw/0/64e4301b/XL/i-gkj3Xzw-XL.png',
      thumbnail:
        'https://photos.smugmug.com/photos/i-gkj3Xzw/0/64e4301b/S/i-gkj3Xzw-S.png',
      name: 'Tumour cells dividing',
      legend:
        'If KRas is constantly switched on, this results in out of control cell division.',
      id: 4,
    },
    {
      image: 'FaultyKRasTreatmentWithLabelsPlusWatermarkNewFont_final.png',
      smugmug:
        'https://photos.smugmug.com/photos/i-ppcm7ps/0/3e13ee29/O/i-ppcm7ps.png',
      large:
        'https://photos.smugmug.com/photos/i-ppcm7ps/0/3e13ee29/XL/i-ppcm7ps-XL.png',
      thumbnail:
        'https://photos.smugmug.com/photos/i-ppcm7ps/0/3e13ee29/S/i-ppcm7ps-S.png',
      name: 'New treatments keep faulty KRas turned off',
      legend:
        'New treatments fit into faulty KRas, keeping the off switch in place, keeping faulty KRas turned off.',
      id: 5,
    },
  ],
}

const kras: Thalia.WebsiteConfig = {
  publish: {
    dist: [
      'css/main.css',
      'css/canvas.css',
      'css/kras.css',
      'css/font-awesome.min.css',
      'js/vendor.min.js',
      'js/showdown.min.js',
      'js/simplify.js',
      'js/d3_drawer.js',
      'js/wrapper.js',
    ],
  },
  controllers: {
    publishToKras: function (router) {
      // I want to write the kras file to the public folder
      router.readTemplate({
        template: 'kras.mustache',
        content: 'email',
        callback: (views) => {
          const data: any = _.cloneDeep(imageData)
          data.imagesJson = JSON.stringify(data.images)

          views.inner = views.kras

          const output = mustache.render(views.template, data, views)

          const buffer = new Uint8Array(Buffer.from(output))

          writeFile(
            path.resolve(__dirname, '..', 'public', 'kras', 'index.html'),
            buffer,
            (err) => {
              if (err) {
                console.log(err)
                router.res.end(err)
              }

              router.res.end('Wrote the file to public/kras/index.html')
            }
          )

          // router.res.end(output)
        },
      })
    },
    kras: function (router) {
      router.readTemplate({
        template: 'kras.mustache',
        content: 'email',
        callback: (views) => {
          const data: any = _.cloneDeep(imageData)
          data.imagesJson = JSON.stringify(data.images)

          views.inner = views.kras
          if (
            router.path &&
            router.path[0] &&
            router.path[0] !== '' &&
            router.db
          ) {
            router.db.Worksheet.findOne({
              where: {
                hash: router.path[0],
              },
            })
              .then((d: WorksheetModel) => {
                try {
                  if (typeof d.data === 'string') {
                    Object.assign(data, JSON.parse(d.data))
                  } else {
                    Object.assign(data, d.data)
                  }
                } catch (e) {
                  console.error(`Error loading kras hash: ${router.path[0]}`)
                }

                Object.assign(data, {
                  hash: d.hash,
                })
                // if (env === 'development') { console.log('data is...', data) }
                const output = mustache.render(views.template, data, views)
                router.res.end(output)
              })
              .catch((e) => {
                console.log('ERROR?')
                console.log(e)
                router.res.end(JSON.stringify(e))
              })
          } else {
            const output = mustache.render(views.template, data, views)
            router.res.end(output)
          }
        },
      })
    },
    showMail: function (router) {
      router.readTemplate({
        template: '404.mustache',
        content: 'email',
        callback: function (views) {
          router.res.end(
            mustache.render(
              views.content,
              {
                name: 'Patient Name',
              },
              views
            )
          )
        },
      })
    },
    testMail: function (router) {
      // Test function. Not used for anything

      const transporter = nodemailer.createTransport({
        pool: true,
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use TLS
        auth: mailAuth,
        tls: { rejectUnauthorized: false },
      })

      router.readTemplate({
        template: '404.mustache',
        content: 'email',
        callback: function (views) {
          console.log('reading the email template...', views)

          transporter.verify(function (error) {
            if (error) {
              console.log('Nodemailer error')
              console.log(error)
            } else {
              console.log('Nodemailer: Server is ready to take our messages')
            }
          })

          const data = {
            name: 'Patient Name',
          }

          const mailOptions = {
            from: '"PeterMac" <PeterMacCallumCC@gmail.com>',
            to: 'evjxzipazddmhsnpgg@tmmbt.com', // Use a new 10minutemail.com address for testing
            // bcc: 'PathOS@petermac.org', // Don't BCC the test mail
            subject: 'Sending Email using Node.js',
            html: mustache.render(views.content, data, views),
          }

          // Disable sending the mail
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error)
            } else {
              console.log('Email sent: ' + info.response)
            }
          })

          // router.res.end('Ok lol I guess we sent some mail??')
          router.res.end(mustache.render(views.content, data, views))
        },
      })
    },

    failsafeSaveDetails: function (router) {
      console.log('Warning, someone is trying to use the KRAS app')
      router.res.end(
        `Sorry saving data and emailing is currently not available.<br>If you need a PDF copy of this website, Please download and use this: <a href="https://pathos.co/pdfs/example.pdf">https://pathos.co/pdfs/example.pdf</a>`
      )
    },

    saveDetails: function (router) {
      // console.log(router.db);
      // console.log('router.path is:', router.path)
      // console.log('keys: ', Object.keys(router))
      // console.log('db: ', Object.keys(router.db))
      // console.log('db: ', router.db.Worksheet)

      const form = new formidable.IncomingForm()
      form.parse(router.req, (err, fields) => {
        if (err) {
          console.log('ERROR!', err)
          router.res.end(err)
        }

        // This is probably not the right way to enforce formidable fields as strings
        const blob: WorksheetAttributes = {
          email:
            typeof fields.email === 'string' ? fields.email : fields.email[0],
          firstName:
            typeof fields.firstName === 'string'
              ? fields.firstName
              : fields.firstName[0],
          lastName:
            typeof fields.lastName === 'string'
              ? fields.lastName
              : fields.lastName[0],
          doctor:
            typeof fields.doctor === 'string'
              ? fields.doctor
              : fields.doctor[0],
          hash: 'placeholder',
          data: fields,
        }

        let hash: any = Math.random().toString(16).slice(2)

        if (fields.hash) {
          hash = fields.hash
          blob.hash =
            typeof fields.hash === 'string' ? fields.hash : fields.hash[0]
          router.db.Worksheet.update(blob, {
            where: {
              hash: blob.hash,
            },
          })
        } else {
          blob.hash = hash
          try {
            router.db.Worksheet.create(blob)
          } catch (e) {
            console.log('Error creating worksheet')
            console.error(e)
          }
        }

        makePdf(hash).then((pdf) => {
          try {
            const filepath: string = path.resolve(
              __dirname,
              '..',
              'data',
              'pdfs',
              `KRas-${hash}.pdf`
            )

            router.readTemplate({
              template: '404.mustache',
              content: 'email',
              callback: function (views) {
                const data = {
                  name: blob.firstName,
                  hash: hash,
                }

                const emailOptions: any = {
                  from: '"PeterMac" <PeterMacCallumCC@gmail.com>',
                  to: fields.email,
                  bcc: 'PathOS@petermac.org',
                  subject: 'Your personal KRas notes',
                  attachments: [
                    {
                      filename: 'KRas_notes.pdf',
                      path: filepath,
                    },
                  ],
                  html: mustache.render(views.content, data, views),
                }

                if (fields.doctor) {
                  emailOptions.subject = `Your personal KRas notes from Dr. ${fields.doctor}`
                }

                sendEmail(emailOptions)

                router.res.end(
                  mustache.render(
                    views.content,
                    {
                      ...data,
                      website: ` has been sent to your email: ${fields.email}`,
                    },
                    views
                  )
                )
              },
            })
          } catch (e) {
            console.log('Error sending mail.', e)
          }
        })
      })
    },
  },
}

function sendEmail(emailOptions) {
  console.log(`Sending email to ${emailOptions.to}`)

  const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: mailAuth,
    tls: { rejectUnauthorized: false },
  })

  transporter.verify(function (error) {
    if (error) {
      console.log('Nodemailer error')
      console.log(error)
    } else {
      console.log('Nodemailer: Server is ready to take our messages')
    }
  })

  transporter.sendMail(emailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

async function makePdf(hash: string): Promise<string> {
  // const browser = await puppeteer.launch()
  // const page = await browser.newPage()
  return new Promise((resolve, reject) => {
    let puppeteerOptions = {
      // headless: true,
      // slowMo: 0,
      // devtools: true
    }
    if (env === 'pi') {
      puppeteerOptions = {
        headless: true,
        executablePath: '/usr/bin/chromium-browser',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      }
    }

    puppeteer
      .launch(puppeteerOptions)
      .then((browser) => {
        browser.newPage().then((page) => {
          page
            .setExtraHTTPHeaders({
              'x-host': 'pathos.co',
            })
            .then(() => {
              page
                .goto(`http://localhost:${port}/kras/${hash}`, {
                  waitUntil: 'networkidle0',
                })
                .then(() => {
                  page
                    .evaluate('printVersion()')
                    .then(() => {
                      page.waitForTimeout(500).then(() => {
                        const filepath: string = path.resolve(
                          __dirname,
                          '..',
                          'data',
                          'pdfs',
                          `KRas-${hash}.pdf`
                        )
                        page
                          .pdf({
                            path: filepath,
                            printBackground: true,
                            landscape: true,
                            // format: 'A4',
                            margin: {
                              top: '0.9cm',
                              right: '0.9cm',
                              bottom: '0.9cm',
                              left: '0.9cm',
                            },
                          })
                          .then(() => {
                            browser.close()
                            resolve(`/pdfs/KRas-${hash}.pdf`)
                          })
                          .catch((error) => {
                            console.error(error)
                            reject(error)
                          })
                      })
                    })
                    .catch((error) => {
                      console.error(error)
                      reject(error)
                    })
                })
                .catch((error) => {
                  console.error(error)
                  reject(error)
                })
            })
        })
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

export { kras }
