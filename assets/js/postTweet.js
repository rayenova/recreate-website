$('.form').submit(function (event) {
    event.preventDefault();
    const tweetText = $('#tweet-text').val(); // gets value from the input

    const timestamp = new Date().toLocaleTimeString();
    const newTweet = {
        author: 'Ranim',
        username: 'Reynim',
        profile_image:
            'https://t3.ftcdn.net/jpg/05/58/82/34/240_F_558823483_uP4but5eEUX1ub7sY9As43YJ4er67J4E.jpg',
        timestamp: timestamp,
        content: tweetText,
    };

    // Retrieve existing tweets from localStorage or initialize an empty array
    const tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    // Add the new tweet to the array
    tweets.unshift(newTweet);

    // Store the updated tweets array in localStorage
    localStorage.setItem('tweets', JSON.stringify(tweets));

    // Render the new tweet on the page
    renderTweet(newTweet);

    // Clear the input field
    document.getElementById("tweet-text").value = "";
});

function renderTweet(tweet) {
    const container = document.querySelector('.tweets-container');

    const article = document.createElement('article');
    article.classList.add('tweet');

    article.innerHTML = `
        <div class="tweet-container">
            <figure class="post-tweet-pf">
                <img src="${tweet.profile_image}" class="post-tweet-image">
            </figure>
            <div class="account-tweet">
                <div class="account-top">
                    <div class="account-name">
                        <h2>${tweet.author}</h2>
                        <h4>@${tweet.username}</h4>
                        <h4><span class="dot">•</span> ${tweet.timestamp}</h4>
                    </div>
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="posted-tweet-icon">
                        <g>
                            <path
                                d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2">
                            </path>
                        </g>
                    </svg>
                </div>
                <div class="account-tweet">
                    <p>${tweet.content}</p>
                </div>
                <div class="account-social-icons">
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="posted-tweet-icon">
                        <!-- Social icons HTML code -->
                    </svg>
                    <!-- Add other social icons here -->
                </div>
            </div>
        </div>
    `;

    // Insert the new tweet at the beginning of the container
    container.insertAdjacentElement('afterbegin', article);
}

