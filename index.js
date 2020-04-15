const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();
const cron = require('node-cron');
const { subscribe } = require('./utils/event')
const updateData = require('./utils/app')

cron.schedule('* * * * *', () => {
    console.log('Checking For Updates on server');
    updateData().then(console.log('done'))
})


// main().then(console.log('done'))

// Routes should get data from redis lastview
const express = require('express');
const bodyParser = require('body-parser');

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public'))




app.get('/', async(req, res)=>{
    res.render('event')
})



app.get('/events', async(req, res)=>{
    try {
        let data = await client.get('lastview')
        if (data){
            // Note to set headers
            return res.json(JSON.parse(data))
        } else {
            // make request to db
            console.log('make request to DB')
        }

    } catch (error) {
        console.log(error)
    }
    client.quit()
})


app.get('/stream', subscribe )


// default error handling
app.use((req, res, next) => {
    res.status(404).send({
    status: 404,
    error: 'Not found'
    })
   })

// app.use(methodOverride())

app.use(function (err, req, res, next) {
    console.error(err.stack);
    handleError(err, res);
    // res.status(500).send('Something went wrong!!');
});

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
});
