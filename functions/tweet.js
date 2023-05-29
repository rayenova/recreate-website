const path = require('path');
const fs = require('fs');
const { send } = require('micro');
const microCors = require('micro-cors')();

module.exports = microCors(async (req, res) => {
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

            return send(res, 200, newTweet);
        } catch (err) {
            console.error(err);
            return send(res, 500, 'Internal server error');
        }
    }

    return send(res, 404, 'Not found');
});
