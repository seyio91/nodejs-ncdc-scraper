const redis = require('redis');
const client = redis.createClient();
const scraper = require('./utils/scraper')
const moment = require('moment')

client.on('connect', function() {
    console.log('connected');
});

const lastime = moment().format()
async function setup(){
    let baseline = await scraper();
    // let lastView = baseline;
    client.set('baseline', JSON.stringify(baseline))
    client.set('lastview', JSON.stringify(baseline))
    client.set('lasttimestamp', lastime)
}

  let states = [
    'Lagos',   'Abuja FCT',
    'Osun',      'Edo',     'Oyo',
    'Ogun',      'Bauchi',  'Kaduna',
    'Akwa Ibom', 'Katsina', 'Kwara',
    'Kano',      'Delta',   'Ondo',
    'Enugu',     'Ekiti',   'Rivers',
    'Benue',     'Niger',   'Anambra'
  ]

let stateString = JSON.stringify(states)

client.set('states', stateString)

setup().then(console.log('done'))

// client.quit()

// redis.disconnect()