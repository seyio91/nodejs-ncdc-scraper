const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

// const getRedisObj = async (object) => {
//     result = await client.get(object);
//     return JSON.parse(result)
// }

// async function run(){
//     let data = await getRedisObj('lastview')
//     return data
// }

// run()
//     .then( result => {
//         console.log(result)
//     })

let baseline =     [
        {
          name: 'Lagos',
          totalCases: 208,
          activeCases: 139,
          discharged: 69,
          deaths: 6,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Abuja FCT',
          totalCases: 52,
          activeCases: 45,
          discharged: 11,
          deaths: 2,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Osun',
          totalCases: 20,
          activeCases: 9,
          discharged: 11,
          deaths: 0,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Edo',
          totalCases: 15,
          activeCases: 14,
          discharged: 0,
          deaths: 1,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Oyo',
          totalCases: 11,
          activeCases: 7,
          discharged: 4,
          deaths: 0,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Ogun',
          totalCases: 9,
          activeCases: 7,
          discharged: 2,
          deaths: 0,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Bauchi',
          totalCases: 6,
          activeCases: 6,
          discharged: 0,
          deaths: 0,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Kaduna',
          totalCases: 6,
          activeCases: 6,
          discharged: 0,
          deaths: 0,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Akwa Ibom',
          totalCases: 6,
          activeCases: 6,
          discharged: 0,
          deaths: 0,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Katsina',
          totalCases: 5,
          activeCases: 4,
          discharged: 0,
          deaths: 1,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Kwara',
          totalCases: 4,
          activeCases: 4,
          discharged: 0,
          deaths: 0,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Kano',
          totalCases: 4,
          activeCases: 4,
          discharged: 0,
          deaths: 0,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Delta',
          totalCases: 3,
          activeCases: 2,
          discharged: 0,
          deaths: 1,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Ondo',
          totalCases: 3,
          activeCases: 3,
          discharged: 0,
          deaths: 0,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Enugu',
          totalCases: 2,
          activeCases: 2,
          discharged: 0,
          deaths: 0,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Ekiti',
          totalCases: 2,
          activeCases: 1,
          discharged: 1,
          deaths: 0,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Rivers',
          totalCases: 2,
          activeCases: 1,
          discharged: 1,
          deaths: 0,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Benue',
          totalCases: 1,
          activeCases: 1,
          discharged: 0,
          deaths: 0,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Niger',
          totalCases: 1,
          activeCases: 1,
          discharged: 0,
          deaths: 0,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Anambra',
          totalCases: 1,
          activeCases: 1,
          discharged: 0,
          deaths: 0,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        },
        {
          name: 'Total',
          totalCases: 373,
          activeCases: 263,
          discharged: 99,
          deaths: 11,
          changeTotal: 0,
          changeActive: 0,
          changeDischarged: 0,
          changeDeaths: 0
        }
      ]

baseline = JSON.stringify(baseline)
async function run(){
    await client.set('baseline', baseline)
    await client.set('lastview', baseline)
    client.quit()
}

run()
    .then( result => {
        console.log('ok')
    })