const { dbQuery } = require('../db/dbQuery')
const moment = require('moment')
const client = require('../utils/redisClient')

const getTimeLine = async (req, res) => {
    let totalQuery = 'SELECT * FROM summary ORDER BY date DESC';
    try {
        let data = await client.get('mainChart');
        if (data){
            return res.status(200).json(JSON.parse(data))
        }else{
            const { rows } = await dbQuery(totalQuery);
            week = dateParse(rows)
            graphData = Object.values(week).reverse();
            await client.setex('mainChart', 43200 ,JSON.stringify(graphData))
            res.status(200).json(graphData)
        }
    } catch(error){
        res.status(500).json({ error: 500, Message: error })
    }
}

const dailyEvent = async(req, res) => {
    try {
        let data = await client.get('lastview')
        if (data){
            return res.status(200).json(JSON.parse(data))
        } else {
            hours = await dbQuery(`SELECT date FROM ticks ORDER BY date DESC LIMIT 1`);
            lastTime = moment(hours.rows[0].date).format('YYYY-MM-DD');
            let lastQuery = `SELECT * FROM ticks WHERE date = '${lastTime}' ORDER BY date;`
            const { rows } = await dbQuery(lastQuery);
            await client.set('lastview', JSON.stringify(rows))
            return res.status(200).json(rows);
        }

    } catch (error) {
        res.status(500).json({ error: 500, Message: error })
    }
}


// summary
const getSummary = async(req, res) => {
    try {
        let data = await client.get('lastSummary')
        if (data){
            return res.status(200).json(JSON.parse(data))
        } else {
            hours = await dbQuery(`SELECT date FROM summary ORDER BY date DESC LIMIT 1`);
            lastTime = moment(hours.rows[0].date).format('YYYY-MM-DD');
            let lastQuery = `SELECT * FROM summary WHERE date = '${lastTime}' ORDER BY date;`
            const { rows } = await dbQuery(lastQuery);
            response = rows[0]
            await client.set('lastSummary', JSON.stringify(response))
            return res.status(200).json(response);
        }

    } catch (error) {
        res.status(500).json({ error: 500, Message: error })

    }
}





const dateParse = (arrayObj) => {
    weeklyData = {};
    arrayObj.forEach(data => {
        week = moment(data.date).week();
        if(!weeklyData[week]){
            weeklyData[week] = data
        } else {
            highData = weeklyData[week].totalcases > data.totalcases ? weeklyData[week] : data;
            weeklyData[week] = highData;
        }
    })
    return weeklyData

}

module.exports = { dailyEvent ,getTimeLine, getSummary };