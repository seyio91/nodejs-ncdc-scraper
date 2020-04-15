const asyncRedis = require("async-redis");
const scraper = require('./scraper')
const client = asyncRedis.createClient();
const moment = require('moment')
const { publish } = require('./event')


const getObject = (key, list) => {
    for (let i=0; i < list.length; i++){
        if (list[i].name == key){
            return list[i]
        }
    }
}

// const percentageCalc = (a, b) => {
//     let diff = b - a;
//     return diff/a * 100
// }

const getRedisObj = async (object) => {
    result = await client.get(object);
    return JSON.parse(result)
}



async function main(){

    let newView = [];

    let states = await getRedisObj('states');
    let baseline = await getRedisObj('baseline')
    let current = await scraper()
    // remove after test
    // let current = await getRedisObj('current')
    let lastView = await getRedisObj('lastview')

    // To check if there are any changes
    let dataChanges = false;

    // let lastRun = "2020-04-02T08:12:03+08:00"
    let lastRun = await client.get('lasttimestamp')
    lastRun = moment(lastRun)
    const currentTime = moment()
    let diffTime = currentTime.diff(lastRun, 'day')
    // if currentmoment days from is greater than lastrun
    // lastview becomes baseline;
    // lastrun becomes currentMoment

    if (diffTime > 0){
        baseline = lastView;
        await client.set('baseline', JSON.stringify(lastView))
        // Update Last Run to CurrentTime. Also save Someplace
        lastRun = currentTime.format();
        await client.set('lasttimestamp', lastRun)
        // updateDB also
    }


    for (const data of states){        
        // returned from database // using redis for now
        const baselineData = getObject(data, baseline)
        
        // This can be returned from redis using key
        const currentData = getObject(data, current)

        //get lastView
        const lastData = getObject(data, lastView)

        //check if there is a difference for each state. 
        
        let changeTotal = currentData['totalCases'] - lastData['totalCases']
        let changeActive = currentData['activeCases'] - lastData['activeCases']
        let changeDischarged = currentData['discharged'] - lastData['discharged']
        let changeDeaths = currentData['deaths'] - lastData['deaths']

        if (changeTotal > 0 ||
            changeActive > 0 ||
            changeDischarged > 0 ||
            changeDeaths > 0 ) {
                // let System know there is a change for push updates later
                dataChanges = true
                // calculate change from baseline
                currentData['changeTotal'] = currentData['totalCases'] - baselineData['totalCases']
                currentData['changeActive'] = currentData['activeCases'] - baselineData['activeCases']
                currentData['changeDischarged'] = currentData['discharged'] - baselineData['discharged']
                currentData['changeDeaths'] = currentData['deaths'] - baselineData['deaths']

            } else {
                    // default the change to last update
                currentData['changeTotal'] = lastData['changeTotal']
                currentData['changeActive'] = lastData['changeActive']
                currentData['changeDischarged'] = lastData['changeDischarged']
                currentData['changeDeaths'] = lastData['changeDeaths']
            }

        // console.log(currentData)
        
        // push to list for newView
        newView.push(currentData)

        // forline here
    }

    console.log(dataChanges)

    // do some action here
    if (dataChanges){
        console.log('change occured')
        publish(newView)
        // do  the action is the data changed.
        //Push data to screen

        //update last view to new data (redis)
        await client.set("lastview", JSON.stringify(newView));

        // NB new routes get Updates from redis

    }
    // change data back to false
    dataChanges = false;
    return newView
    
}

// main().then(data => {
//     console.log(data);
    
// })
module.exports = main