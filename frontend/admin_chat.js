const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const chat_id = urlParams.get('chat_id')

const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

var authToken = getCookie('authToken');


const BOT_IMG = "https://fra1.digitaloceanspaces.com/carrentbucket/static/bot.svg";
const PERSON_IMG = "https://fra1.digitaloceanspaces.com/carrentbucket/static/user.svg";
const BOT_NAME = "BOT";

getUser(authToken).then(userData => {
    if (!userData.is_staff) {
        window.location.replace("/");
    }
})

document.addEventListener("DOMContentLoaded", function () {

    fetch(`https://carrent-w2et2.ondigitalocean.app/api/chat/${chat_id}/`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': `Token ${authToken}`,
        }
    })
        .then(response => response.json())
        .then(response => {
            response = response.sort((a, b) => a.id - b.id);
            response.forEach(message => {
                if (message.is_admin == false) {
                    PERSON_NAME = `${message.chat.user.first_name} ${message.chat.user.last_name}`
                    appendMessage(PERSON_NAME, PERSON_IMG, "right", message.content, message.date)
                } else {
                    appendMessage(BOT_NAME, BOT_IMG, "left", message.content, message.date)
                }
            });
        })
})

msgerForm.addEventListener("submit", event => { // отправляем хуету (сообщение)
    event.preventDefault();

    const msgText = msgerInput.value;
    if (!msgText) return;

    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
    msgerInput.value = "";

    fetch(`https://carrent-w2et2.ondigitalocean.app/api/chat/${chat_id}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`,
        },
        body: JSON.stringify({
            'content': msgText
        }),
    }).then(response => {
        if (!response.ok) {
            throw new Error('Ошибка при получении данных ');
        }
        return response.json();
    })
});

function appendMessage(name, img, side, text, date = null) {
    //   Simple solution for small apps
    if (!date) {
        date = formatDate(new Date())
    } else {
        [yyyy, mm, dd, hh, mi] = date.split(/[/:\-T]/)
        date = `${hh}:${mi}`
    }
    const msgHTML = `
      <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
  
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${date}</div>
          </div>
  
          <div class="msg-text">${text}</div>
        </div>
      </div>
    `;

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}



// Utils
function get(selector, root = document) {
    return root.querySelector(selector);
}

function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
}

