const fs = require('fs');
const axios = require('axios');

const express = require('express');
const app = express();
const port = 8080;

const morgan = require('morgan');
app.use(morgan('combined'));

const data_url = 'http://opendata.ecdc.europa.eu/covid19/casedistribution/json';
const data_path = 'data/data.json';

let currently_fetching = false;
const fetch = async () => {
    try {
        if (currently_fetching) return;
        currently_fetching = true;
        console.log(`${new Date().toISOString()} Start fetching data`);
        const response = await axios.get(data_url);
        console.log(`${new Date().toISOString()} Finished fetching data`);

        fs.writeFile(
            data_path,
            JSON.stringify(response.data.records),
            function (err) {
                if (err) return console.log(err);
                else return console.log(`${new Date().toISOString()} Data stored in ${data_path}`);
            }
        );
    } catch (e) {
        console.log(e);
    } finally {
        currently_fetching = false;
    }
};
fetch();

setInterval(fetch, 1000 * 60 * 60 * 2);

app.use(express.static('static'));

app.get('/covid-data', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(data_path));
        res.json(data);
    } catch {
        res.status(400).send(
            'Cannot serve data. Please try again in a few minutes.'
        );
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
