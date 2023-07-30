var socket = io();

socket.on("connect", ()=>{
    displayMessage(`You connected with id: ${socket.id}`);
    socket.emit("join-room", "public");
    room.value=""
    room.placeholder="public"
})

socket.on("receive-message", message=> displayMessage(message));



const message = document.getElementById("message");
const room = document.getElementById("room");

const form = document.getElementById("form");
const roomSubmit = document.getElementById("send-room");

const messages = document.getElementById("messages");

roomSubmit.addEventListener("click", ()=>{
    const roomValue = room.value;
    socket.emit("join-room", roomValue);
})


form.addEventListener("submit", e=>{
    e.preventDefault();
const messageValue = message.value;
const roomValue = room.value;
if(messageValue!=="") {
    displayMessage(messageValue);
    console.log("calling with message "+messageValue)
    socket.emit('send-message', messageValue, roomValue);
    message.value = "";
}
})



function displayMessage(message){
    const messageElement = `<p>${message}</p>`;
    messages.innerHTML = messageElement+ messages.innerHTML;
}


