//Basic import
const { readdirSync } = require('fs')
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 6000;
const ConnectDB = require('./src/config/ConnectDB');


//Security middlewares import
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');

//Rate limiting
const limiter = rateLimit({ windowMs: 5 * 60 * 1000, max: 50 });

//Security middlewares implement
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());
app.use(limiter);

app.use(express.json({ limit: '5mb' }));

//Managing Backend routing
readdirSync("./src/routes").map(r => app.use("/api/v1", require(`./src/routes/${r}`)));

//Managing front end routing
app.use(express.static('client/dist'))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})

//Undifiend Route
app.use('*', (req, res) => {
    res.json({ error: 'Not Found' })
})

app.start = async () => {
    try {
        await ConnectDB();
        app.listen(port, () => {
            console.log(`Server Running Port ${port}`)
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = app;