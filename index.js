const siteUrl = "https://covid19.ncdc.gov.ng/";
const axios = require('axios');
const cheerio = require('cheerio');

axios(siteUrl)
    .then(page => {
        data = getData(page.data);
        console.log(data)
    })

let getData = html => {
    data = [];
    const $ = cheerio.load(html)

    $('table#custom3 tr').each((i, elem)=>{
        tableObj = {}
        $('td', elem).each((i, innerElem) => {
            let key = casesObject(i)
            let value = $('p', innerElem).text();
            value = numParse(value);
            tableObj[key] = value
        })

        // Check if Object is empty before you push


        data.push(tableObj)
        // console.log(tableObj)
    })
    return data;
}



const casesObject = (index) => {
    switch (index) {
        case 0:
            key = 'name'
            break;
        case 1:
            key = 'totalCases'
            break;
        case 2:
            key = 'activeCases'
            break;
        case 3:
            key = 'discharged'
            break;
        case 4:
            key = 'deaths'
            break;
    }
    return key
}

const numParse = (string) => {
    let num = parseInt(string)
    return isNaN(num) ? string : num
}