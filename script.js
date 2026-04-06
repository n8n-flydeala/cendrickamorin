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

    // 3. CHAT UI LOGIC (PINAGSAMA NA NATIN)
    const chatContainer = document.getElementById('chat-container');
    const closeBtn = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    
    // Ito yung selector para sa "Ask My AI" button mo
    const askBtn = document.querySelector('.lux-float-btn') || document.querySelector('button.fixed.bottom-10');

    if (askBtn && chatContainer) {
        askBtn.addEventListener('click', () => {
            console.log("Chat Opened! ✦");
            chatContainer.classList.toggle('hidden');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            chatContainer.classList.add('hidden');
        });
    }

    // 4. SEND MESSAGE LOGIC
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const message = userInput.value.trim();
            if (message) {
                appendMessage('User', message);
                userInput.value = '';
                
                // Temporary AI Thinking state
                setTimeout(() => {
                    appendMessage('AI', 'Thinking... (n8n connection soon!)');
                }, 500);
            }
        });
    }

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        // Ginamit natin yung class na ginawa natin sa CSS kanina
        msgDiv.className = sender === 'User' ? 'chat-bubble-user p-2 mb-2 ml-auto max-w-[80%]' : 'chat-bubble-ai p-2 mb-2 mr-auto max-w-[80%]';
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
                // Palitan mo 'to ng n8n Webhook URL mo soon
                await fetch("YOUR_WEBHOOK_URL", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });
                alert("Message sent successfully ✦");
                form.reset();
            } catch (err) {
                alert("Naka-test mode pa tayo, G! Connect muna natin n8n.");
                console.error(err);
            }
        });
    }
});

async function askCendrickAI(userQuestion) {
    const response = await fetch('https://flydeala.app.n8n.cloud/webhook/ask-ai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            question: userQuestion
        }),
    });

    const data = await response.json();
    return data.output; // Ito yung sagot ni Groq
}