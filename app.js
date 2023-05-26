const express = require('express');
const fs = require('fs');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');


const app = express();
const port = "gleeful-moxie-4bb6e3.netlify.app";
const uri = "mongodb+srv://ranimm01:I729kBQsuURfmgBw@cluster0.fsmsdt5.mongodb.net/?retryWrites=true&w=majority";


//  ================================================ mongodb connect ================================================= //
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//  ===================================== receiving the data from db and defining the routes ======================== // 
client.connect().then(() => {
    const database = client.db("test")
    const collection = database.collection("fuck")

    app.use(bodyParser.json());

    app.use((request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*");
        next();
    })

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', (request, response) => {
        response.sendFile(path.join(__dirname, 'public', 'index.html'));
    });


    app.get('/tweets/', (request, response) => {
        console.log("request comes in" + request)
        collection.find().toArray()
            .then((documents) => {
                response.setHeader('Content-Type', 'application/json');
                response.status(200).json(documents);
            })
            .catch((error) => {
                console.error(error);
                response.status(500).json({ error: 'Internal server error' });
            });
    });


    // =========================================the post request===============================================//
    app.post('/tweet/', (req, res) => {
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

            collection
                .insertOne(newTweet)
                .then(() => {
                    res.json(newTweet);
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send('Internal server error');
                });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        }
    });


    // ======================================start server======================================== //
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });

})
