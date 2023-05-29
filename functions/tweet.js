const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    if (req.method === 'POST') {
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

            const filePath = path.resolve(__dirname, '..', 'public', 'assets', 'js', 'mock-data.json');
            const jsonData = await fs.promises.readFile(filePath, 'utf8');
            const data = JSON.parse(jsonData);

            data.push(newTweet);

            await fs.promises.writeFile(filePath, JSON.stringify(data));

            return response.status(200).send(newTweet);
        } catch (err) {
            console.error(err);
            return response.status(500).send('Internal server error');
        }
    }

    return response.status(404).send('Not found');
});

module.exports = router;