console.log("Luxury Mode Loaded — Young Isis Grrrt!");

document.addEventListener('DOMContentLoaded', () => {

    // 1. HERO FADE-IN EFFECT
    const hero = document.querySelector(".hero-fade");
    if (hero) {
        hero.style.opacity = 0;
        setTimeout(() => {
            hero.style.transition = "1.4s";
            hero.style.opacity = 1;
        }, 200);
    }

    // 2. SERVICE REVEAL (INTERSECTION OBSERVER)
    const cards = document.querySelectorAll('.lux-service-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = 1;
                e.target.style.transform = "translateY(0)";
            }
        });
    });

    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = "translateY(20px)";
        card.style.transition = "0.7s ease-out";
        observer.observe(card);
    });

    // 3. CUSTOM CHAT UI LOGIC
    const chatContainer = document.getElementById('chat-container');
    const closeBtn = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const sessionId = 'session-' + Math.random().toString(36).substring(2, 15);
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const askBtn = document.querySelector('.lux-float-btn');

    // Open/Close Chat
    if (askBtn && chatContainer) {
        askBtn.addEventListener('click', () => {
            chatContainer.classList.toggle('hidden');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            chatContainer.classList.add('hidden');
        });
    }

    // 4. SEND MESSAGE TO n8n
    if (sendBtn) {
        sendBtn.addEventListener('click', async () => {
            const message = userInput.value.trim();
            if (message) {
                appendMessage('User', message);
                userInput.value = '';

                try {
                    // Pakisiguro na naka-PUBLISH ang workflow sa n8n
                    const response = await fetch('https://flydeala.app.n8n.cloud/webhook/a58fc3ea-6870-4637-bb60-8b979d29e583/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
    action: 'sendMessage',
    sessionId: sessionId,
    chatInput: message
}) 
                    });

                    if (!response.ok) throw new Error('Network response was not ok');

                    const data = await response.json();
                    
                    // n8n returns 'output' for the Chat Trigger response
                    if (data.output) {
                        appendMessage('AI', data.output);
                    } else {
                        appendMessage('AI', "I received the message but the brain didn't reply. Check n8n logs!");
                    }

                } catch (err) {
                    console.error("n8n Error:", err);
                    appendMessage('AI', 'Error connecting to brain. Check if n8n is Active/Published!');
                }
            }
        });
    }

    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendBtn.click();
        });
    }

    // Helper function to show messages
    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = sender === 'User' ? 
            'bg-gold/20 p-2 mb-2 ml-auto max-w-[80%] rounded-lg text-right' : 
            'bg-gray-800 p-2 mb-2 mr-auto max-w-[80%] rounded-lg';
        
        msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 5. CONTACT FORM WEBHOOK
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", async e => {
            e.preventDefault();
            const data = {
                name: form.name.value,
                email: form.email.value,
                message: form.message.value
            };

            try {
                // Pwede mo rin i-connect ito sa ibang n8n webhook soon
                console.log("Form data collected:", data);
                alert("Message sent successfully ✦ (Make sure to connect your Form Webhook too!)");
                form.reset();
            } catch (err) {
                alert("Error sending message.");
                console.error(err);
            }
        });
    }
});