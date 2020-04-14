let baseline = [
    {
      name: 'Lagos',
      totalCases: 189,
      activeCases: 123,
      discharged: 61,
      deaths: 5,
      changeTotal: 19,
      changeActive: 19,
      changeDischarged: 0,
      changeDeaths: 0
    },
    {
      name: 'Abuja FCT',
      totalCases: 56,
      activeCases: 43,
      discharged: 11,
      deaths: 2,
      changeTotal: 16,
      changeActive: 6,
      changeDischarged: 10,
      changeDeaths: 0
    }
  ]


  let lastView = [
    {
      name: 'Lagos',
      totalCases: 204,
      activeCases: 142,
      discharged: 61,
      deaths: 5,
      changeTotal: 12,
      changeActive: 7,
      changeDischarged: 0,
      changeDeaths: 0
    },
    {
      name: 'Abuja FCT',
      totalCases: 70,
      activeCases: 49,
      discharged: 21,
      deaths: 2,
      changeTotal: 16,
      changeActive: 6,
      changeDischarged: 10,
      changeDeaths: 0
    }
  ]

// from page scrape
  let current = [
    {
      name: 'Lagos',
      totalCases: 208,
      activeCases: 142,
      discharged: 61,
      deaths: 5
    },
    {
      name: 'Abuja FCT',
      totalCases: 72,
      activeCases: 49,
      discharged: 21,
      deaths: 2
    }
  ]

let states = ['Lagos', 'Abuja FCT']

const getObject = (key, list) => {
    for (val of list){
        if (val['name'] == key) return val
    }
}

const percentageCalc = (a, b) => {
    let diff = b - a;
    return diff/a * 100
}

// Show Zero Zero for States that do not have
let dataChanges = false;
states.forEach(data => {
    // return lagos baseline object
    console.log(`State ${data} Calculations`)
    const baselineData = getObject(data, baseline)
    // return lagos new. This should be gotten from redis using lagos key
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

            // new display view
        } else {
                // default the change to zero, only changes if there was a change between last view and current data
            currentData['changeTotal'] = lastData['changeTotal']
            currentData['changeActive'] = lastData['changeActive']
            currentData['changeDischarged'] = lastData['changeDischarged']
            currentData['changeDeaths'] = lastData['changeDeaths']
        }

    console.log(currentData)
    
    // push to list for lastview

})

console.log(dataChanges)

// let changeTotal = stateData['totalCases'] - currentData['totalCases']
// let changeActive = stateData['activeCases'] - currentData['activeCases']
// let changeDischarged = stateData['discharged'] - currentData['discharged']
// let changeDeaths = stateData['deaths'] - currentData['deaths']


// do some action here
if (dataChanges){
    // do  the action is the data changed.
}
// change data back to false
dataChanges = false;