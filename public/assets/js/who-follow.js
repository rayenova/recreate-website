//I followed the some procedure as the chat, but this time ill let it randomized each refresh to make it feel more 'updated'
const followList = document.querySelector(".follow-list");

// it counts the amount from 0
let followLimit = 0;

fetch('/tweets/')
    .then(response => response.json())
    .then(data => {
        //shuffles the fetched data random
        const shuffledItem = data.sort(() => 0.5 - Math.random());

        shuffledItem.forEach(item => {
            // checks if the followLimit is more than 7 and if it does it will return
            if (followLimit >= 7) return;
            // it only fetchs these 3 items from the json file
            const { author, username, profile_image } = item;

            const li = document.createElement('li');
            li.classList.add('follow-item');
            li.innerHTML = `
                <div class="pf-container">
                    <figure class="post-tweet-pf">
                        <img src="${profile_image}" class="post-tweet-image">
                    </figure>
                    <div class="follow-text">
                        <h2>${author}</h2>
                        <h4>@${username}</h4>
                    </div>
                </div>
                <div class="follow-btn">
                    <p>Follow</p>
                </div>
            `;
            followList.appendChild(li);
            // adds the follower till 7
            followLimit++;
        });
    })
    .catch(error => console.log(error));