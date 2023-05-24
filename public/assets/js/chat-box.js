//the code for message container
const chatList = document.querySelector('.message-box');
const closeBtn = document.querySelector('.message');

let isToggled = false;
closeBtn.addEventListener('click', function () {
    chatList.classList.toggle('visible');

    // Toggle the SVG
    if (isToggled) {
        closeBtn.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true" class="icon-sidebar-twt message" style="color: rgb(239, 243, 244);">
                <g>
                    <path d="M12 2.59l9.46 9.45-1.42 1.42L12 5.41l-8.04 8.05-1.42-1.42L12 2.59zm0 7l9.46 9.45-1.42 1.42L12 12.41l-8.04 8.05-1.42-1.42L12 9.59z"></path>
                </g>
            </svg>
        `;
    } else {
        closeBtn.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true" class="icon-sidebar-twt message" style="color: rgb(239, 243, 244);">
                <g>
                    <path d="M12 11.59L3.96 3.54 2.54 4.96 12 14.41l9.46-9.45-1.42-1.42L12 11.59zm0 7l-8.04-8.05-1.42 1.42L12 21.41l9.46-9.45-1.42-1.42L12 18.59z"></path>
                </g>
            </svg>
        `;
    }

    isToggled = !isToggled;
});

//fetching data from json and display it on message container
const chat = document.querySelector('.chat-list');
const chatContainer = document.querySelector('.chat-container');

let counter = 0;

fetch('/tweets/')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            // limit to 5 chat containers
            if (counter >= 5) return; 
            const { author, username, profile_image, timestamp, content } = item;

             // display only first 5 words and add "..."
            const shortContent = content.split(' ').slice(0, 5).join(' ') + '...';

            const li = document.createElement('li');
            li.classList.add('chat', 'padding');
            li.innerHTML = `
                <figure class="post-tweet-pf">
                    <img src="${profile_image}" class="post-tweet-image">
                </figure>
                <div class="chat-text">
                    <div class="chat-user">
                        <div class="chat-username">
                        <h2>${author}</h2>
                        <h4>@${username}</h4>
                        </div>
                        <p><span class="dot">•</span> ${timestamp}</p>
                    </div>
                    <div class="chat-chat-message">
                        <p>${shortContent}</p>
                    </div>
                </div>
            `;
            chat.appendChild(li);
            counter++;

        });
    })
    .catch(error => console.error(error));

// adds an empy box underneath the EVERY fetched data. Just for the styling no other particulair reason
const emptyBox = document.createElement('div');
emptyBox.classList.add('empty-box');

chatContainer.appendChild(emptyBox);


