// tweet.js

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    next();
});

app.post('/tweet', async (req, res) => {
    try {
        const tweetText = req.body.tweetText;
        const timestamp = new Date().toLocaleTimeString();
        const newTweet = {
            author: 'Ranim',
            username: 'Reynim',
            profile_image:
                'https://t3.ftcdn.net/jpg/05/58/82/34/240_F_558823483_uP4but5eEUX1ub7sY9As43YJ4er67J4E.jpg',
            timestamp: timestamp,
            content: tweetText,
        };

        const filePath = path.join(__dirname, '../public', 'assets', 'js', 'mock-data.json');
        const jsonData = await fs.promises.readFile(filePath, 'utf8');
        const data = JSON.parse(jsonData);

        data.push(newTweet);

        await fs.promises.writeFile(filePath, JSON.stringify(data));

        res.json(newTweet);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

module.exports = app;
