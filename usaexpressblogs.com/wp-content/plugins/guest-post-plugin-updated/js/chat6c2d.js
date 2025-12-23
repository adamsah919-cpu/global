document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chat-box');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');

    // Ensure elements exist
    if (chatBox && chatForm && chatInput) {
        console.log('All elements found and ready for use.');

        // Submit event listener for the chat form
        chatForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const message = chatInput.value.trim();
            const receiverId = chatForm.querySelector('input[name="receiver_id"]').value;

            if (message) {
                // AJAX request to send the chat message
                jQuery.ajax({
                    url: "../wp-content/plugins/guest-post-plugin-updated/templates/ajax.php",
                    type: 'POST',
                    data: {
                        action: 'send_chat_message',
                        receiver_id: receiverId,  
                        chat_message: message,
                    },
                    success: function (response) { 
                        if (response.trim() === "Message sent successfully!") {
                            // Append the new message to the chat box
                            const newMessage = document.createElement('div');
                            newMessage.classList.add('message', 'you');
                            newMessage.innerHTML = '<div class="bubble"><strong>You:</strong> ${message}</div>';
                            chatBox.appendChild(newMessage);

                            // Clear the input field
                            chatInput.value = '';
                        } else {
                            alert('Message not sent. Please try again.');
                        }
                    },
                    error: function () {
                        alert('An error occurred. Please try again.');
                    }
                });
            } else {
                alert('Please enter a message.');
            }
        });
    } else {
        console.error('Required elements are missing in the DOM.');
    }
});
