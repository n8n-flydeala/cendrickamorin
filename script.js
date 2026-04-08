const FORM_WEBHOOK_URL = "https://flydeala.app.n8n.cloud/webhook/efc5cc4a-63c8-4386-a512-38f216236821";

document.addEventListener("DOMContentLoaded", () => {
    const workForm = document.getElementById("workWithMeForm");
    
    if (workForm) {
        workForm.onsubmit = async (e) => {
            e.preventDefault(); // Eto ang pinaka-importante para hindi mag-refresh
            e.stopImmediatePropagation(); 

            console.log("Attempting to send data...");
            
            const submitBtn = workForm.querySelector('button[type="submit"]');
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            const formData = new FormData(workForm);
            const payload = {
                name: formData.get("name"),
                email: formData.get("email"),
                message: formData.get("message")
            };

            try {
                const response = await fetch(FORM_WEBHOOK_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    console.log("Success!");
                    alert("Message sent! Check n8n now.");
                    workForm.reset();
                } else {
                    alert("Webhook error: " + response.status);
                }
            } catch (error) {
                console.error("Connection failed:", error);
                alert("Failed to connect to n8n. Check your internet or CORS.");
            } finally {
                submitBtn.textContent = "Send Message";
                submitBtn.disabled = false;
            }
        };
    }
});
// --- AI CHAT WIDGET TOGGLE LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    const askAiBtn = document.getElementById('custom-ask-btn');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');

    if (askAiBtn && chatContainer && closeChat) {
        askAiBtn.addEventListener('click', () => {
            chatContainer.classList.toggle('hidden');
        });

        closeChat.addEventListener('click', () => {
            chatContainer.classList.add('hidden');
        });
    }
});
// --- AI CHAT SEND LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    function addMessage(text, isUser) {
        const div = document.createElement('div');
        div.className = isUser 
            ? 'bg-gold/20 p-3 ml-auto max-w-[85%] rounded-lg text-white text-right' 
            : 'bg-gray-800 p-3 mr-auto max-w-[85%] rounded-lg text-gray-200';
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        addMessage(message, true);
        userInput.value = '';
        sendBtn.disabled = true;
        sendBtn.textContent = '...';

        try {
            const response = await fetch('https://flydeala.app.n8n.cloud/webhook/chatbot', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message })
            });
            const data = await response.json();
            addMessage(data.reply || data.message || 'Got your message!', false);
        } catch (error) {
            addMessage("Sorry, I can't connect right now.", false);
        } finally {
            sendBtn.disabled = false;
            sendBtn.textContent = 'SEND';
        }
    }

    // Click send
    sendBtn.addEventListener('click', sendMessage);

    // Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});