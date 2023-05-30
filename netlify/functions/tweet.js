const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Define the tweet handler
const tweetHandler = async (req, res) => {
    try {
        const { tweetText } = req.body;
        const timestamp = new Date().toLocaleTimeString();
        const newTweet = {
            author: 'Ranim',
            username: 'Reynim',
            profile_image: 'https://t3.ftcdn.net/jpg/05/58/82/34/240_F_558823483_uP4but5eEUX1ub7sY9As43YJ4er67J4E.jpg',
            timestamp: timestamp,
            content: tweetText,
        };

        const filePath = path.resolve(__dirname, '../public/assets/js/mockdata.json');
        const jsonData = await fs.promises.readFile(filePath, 'utf8');
        const data = JSON.parse(jsonData);

        data.push(newTweet);

        await fs.promises.writeFile(filePath, JSON.stringify(data));

        return res.status(200).json(newTweet);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An internal server error occurred' });
    }
};

// Endpoint to handle the tweet submission
router.post('/', tweetHandler);


module.exports = router;
// module.exports = {
//     handler: router // Export tweetHandler as the handler for the Netlify function
// };