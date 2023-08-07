import { kras } from './kras'

import _ = require('lodash');

const pathos = {
  redirects: {
    '/cas13': 'https://cas13.david-ma.net',
    '/help': 'https://atlassian.petermac.org.au/confluence/display/PVS/How-to+articles',
    '/dropbox': 'https://www.dropbox.com/sh/95s0p83vcwnuj5h/AABi4YHSnB40SQa2XJfRXOpfa?dl=0',
    '/Oberyn': 'https://docs.google.com/presentation/d/e/2PACX-1vRbVjtvKU_jFcqWVnYxXQrHdB30Y2Q0oxp1IGDgBu4X_9I3Gm3Q2mTU2SAKl4wcp6A7OT7lIwQgmV1t/pub?start=false&loop=false&delayms=3000',
    '/oberyn': 'https://docs.google.com/presentation/d/e/2PACX-1vRbVjtvKU_jFcqWVnYxXQrHdB30Y2Q0oxp1IGDgBu4X_9I3Gm3Q2mTU2SAKl4wcp6A7OT7lIwQgmV1t/pub?start=false&loop=false&delayms=3000'
  },
  data: true,
  domains: ['www.pathos.co', 'pathos.co', 'backup.pathos.co', 'server.pathos.co'],
  proxies: [
    {
      domains: ['www.pathos.co', 'pathos.co', 'backup.pathos.co'],
      filter: 'PathOS',
      message: 'Error, server might be down or proxy settings might be wrong. You can try visiting the server directly at: http://115.146.86.36:8080/PathOS/',
      host: '115.146.86.36',
      port: 8080
    }
  ]
}
const config = _.merge(pathos, kras)
export { config }
