// Load previous messages when page loads
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/messages');
    const messages = await response.json();
    
    messages.forEach(msg => {
      addMessageToUI(msg);
    });
  } catch (err) {
    console.error('Failed to load messages:', err);
  }
});

// Function to add messages to UI
function addMessageToUI(message) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${message.user}:</strong> ${message.text}`;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Socket.io message handler
socket.on('newMessage', (data) => {
  addMessageToUI(data);
});