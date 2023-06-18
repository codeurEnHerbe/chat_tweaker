let feed = document.getElementById('chatfeed')
let slider = document.getElementById('slider');
import data from './messages.json' assert { type: 'json' };;
let maxInt = 1000

function map(value, oldRange, newRange) {
    var newValue = (value - oldRange[0]) * (newRange[1] - newRange[0]) / (oldRange[1] - oldRange[0]) + newRange[0];
    return Math.min(Math.max(newValue, newRange[0]), newRange[1]);
}

slider.addEventListener('input', function () {
    maxInt = (11 - slider.value) * 100

}, false);

function updateScroll() {
    feed.scrollTo(0, feed.scrollHeight)
}

function createNewRandomMessage() {
    if (feed.children.length > 30) {
        feed.removeChild(feed.firstElementChild)
    }

    var randomMessage = data.messages[Math.floor(Math.random() * data.messages.length)];
    randomMessage.replace('\"', '"')
    feed.innerHTML += randomMessage
}


let iteration = 0;


function main() {
    if (iteration > 500) {
        return;
    }
    createNewRandomMessage()
    updateScroll()
    let interval = Math.floor(Math.random() * (maxInt - 50 + 1) + 50)
    setTimeout(main, interval);
    iteration++
}

main()








