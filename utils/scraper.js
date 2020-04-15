const axios = require('axios');
const cheerio = require('cheerio');

const siteUrl = "https://covid19.ncdc.gov.ng/";

async function scraper(){
    let result = await axios("https://covid19.ncdc.gov.ng/");
    let page = result.data
    return getData(page)
}

const getData = html => {
const data = [];

    const $ = cheerio.load(html);

    $("table#custom3 > tbody > tr").each((index, element) => {

        const tdTags = $(element).find("td");
        let name = $(tdTags[0]).text().trim()
        if(name !== ''){
            data.push({
                name,
                'totalCases':numParse($(tdTags[1]).text().trim()),
                'activeCases':numParse($(tdTags[2]).text().trim()),
                'discharged': numParse($(tdTags[3]).text().trim()),
                'deaths': numParse($(tdTags[4]).text().trim()),
                'changeTotal': 0,
                'changeActive': 0,
                'changeDischarged': 0,
                'changeDeaths': 0
            });
        }

    });
    return data
}


const numParse = (string) => {
    let num = parseInt(string)
    return isNaN(num) ? string : num
}


module.exports = scraper;