const socket = io();
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const userInput = document.getElementById("userInput");

// Receive messages in real-time
socket.on("newMessage", (data) => {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<strong>${data.user}:</strong> ${data.text}`;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Send message function
function sendMessage() {
  const text = messageInput.value;
  const user = userInput.value;
  
  if (text && user) {
    socket.emit("sendMessage", { text, user });
    messageInput.value = "";
  }
}

// Send message on Enter key
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});