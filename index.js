
import data from './messages.json' assert { type: 'json' };

let feed = document.getElementById('chatfeed')
let slider_messages = document.getElementById('slider-messages');
let slider_blocks = document.getElementById('slider-blocks');
let buffer_count = document.getElementById('buffer-count');

let block_rate = document.getElementById('block-rate');
let message_rate = document.getElementById('message-rate');

let maxInt = 1000
let block_speed = 500
let messageBuffer = []


slider_messages.addEventListener('input', function () {
    maxInt = (10 - slider_messages.value) * 100
    message_rate.innerHTML = maxInt == 0 ? "< 100 ms." : maxInt + " ms."
}, false);


slider_blocks.addEventListener('input', function () {
    block_speed = map(slider_blocks.value, [0, 10], [50, 800])
    console.log(block_speed)
    block_rate.innerHTML = block_speed == 0 ? "< 100 ms." : block_speed + " ms."
}, false);


function map(value, oldRange, newRange) {
    var newValue = (value - oldRange[0]) * (newRange[1] - newRange[0]) / (oldRange[1] - oldRange[0]) + newRange[0];
    return Math.min(Math.max(newValue, newRange[0]), newRange[1]);
}


function updateScroll() {
    feed.scrollTo(0, feed.scrollHeight)
}

function buildNewMessage(message) {
    if (feed.children.length > 30) {
        feed.removeChild(feed.firstElementChild)
    }
    message.replace('\"', '"')

    feed.innerHTML += message
    buffer_count.innerHTML = messageBuffer.length
}


let iteration = 0;


function main() {
    let indexRandomMess = Math.floor(Math.random() * data.messages.length)
    messageBuffer.push(indexRandomMess)

    updateScroll()
    let interval = Math.floor(Math.random() * (maxInt - 50 + 1) + 50)
    setTimeout(main, interval);
    iteration++
}

function flushArray() {

    messageBuffer.forEach(messageIndex => {
        buildNewMessage(data.messages[messageIndex])
    })

    messageBuffer = []
    setTimeout(flushArray, block_speed);
}

main()
flushArray()








