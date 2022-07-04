const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        sendMassage(e.target.value)
    }
})

function sendMassage(message){
    let msg = {
        user: name,
        message: message.trim()
    }
    console.log(message);
    //Append
    appendMassage(msg,'outgoing')
    textarea.value = ''
    scrollToBottom()

    //Send to server
    socket.emit('message', msg)


}

function appendMassage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>    
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}


//Recieve messages

socket.on('message', (msg) => {
    appendMassage(msg, 'incoming')
    scrollToBottom()
})


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}


