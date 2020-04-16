const scraper = require('./scraper')
const client = require('./redisClient')



let states = [
    'Lagos',   'Abuja FCT',
    'Osun',      'Edo',     'Oyo',
    'Ogun',      'Bauchi',  'Kaduna',
    'Akwa Ibom', 'Katsina', 'Kwara',
    'Kano',      'Delta',   'Ondo',
    'Enugu',     'Ekiti',   'Rivers',
    'Benue',     'Niger',   'Anambra'
  ]

async function init(){
    // set States
    await client.set('states', JSON.stringify(states))

    // check if baseline is empty
    let baseline = await client.get('baseline')
    let baselineData = null;
    if (!baseline){
        console.log('No Baseline Found, Should Check DB or Run from Scraped File')
        baselineData = await scraper();
        await client.set('baseline', JSON.stringify(baselineData))
    
        for (data of baselineData){
            let dataString = JSON.stringify(data)
            await client.set(`${data.name}-baseline`, dataString);
        }
    }

    // check if Last Data is empty
    let lastview = await client.get('lastview')
    if (!lastview){
        console.log('No LastView  Found, Should Check DB or Run from Scraped File')
        await client.set('lastview', JSON.stringify(baselineData))
    }    

    
    // client.quit()


}

module.exports = { init }