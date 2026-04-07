document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECTORS
    const chatContainer = document.getElementById('chat-container');
    const askBtn = document.getElementById('custom-ask-btn');
    const closeBtn = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // 2. TOGGLE CHAT WINDOW
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

    // 3. SEND MESSAGE TO N8N
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Display user message sa screen
        appendMessage('User', message);
        userInput.value = '';

        // "Thinking" indicator
        const thinkingId = 'thinking-' + Date.now();
        appendMessage('AI', 'Thinking...', thinkingId);

        try {
            // FIX: Tinanggal natin yung "/chat" sa dulo dahil base sa n8n mo, ito dapat ang endpoint.
            // Siguraduhin na PRODUCTION URL ito (walang /test/ sa dulo).
            const response = await fetch('https://flydeala.app.n8n.cloud/webhook/a58fc3ea-6870-4637-bb60-8b979d29e583/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    chatInput: message  // Match ito sa 'Input Placeholder' mo sa n8n.
                }) 
            });

            if (!response.ok) throw new Error('n8n error');

            const data = await response.json();
            
            // Alisin ang thinking state
            const thinkingElement = document.getElementById(thinkingId);
            if (thinkingElement) thinkingElement.remove();

            // Check if n8n returned 'output' (standard for AI nodes).
            if (data.output) {
                appendMessage('AI', data.output);
            } else if (Array.isArray(data) && data[0].output) {
                appendMessage('AI', data[0].output);
            } else {
                appendMessage('AI', "Brain connected, but checking data format. Check n8n logs!");
            }

        } catch (err) {
            console.error("n8n Error:", err);
            const thinkingElement = document.getElementById(thinkingId);
            if (thinkingElement) thinkingElement.remove();
            appendMessage('AI', 'Error: Is n8n Published and CORS allowed (*)?');
        }
    }

    // 4. EVENT LISTENERS
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // 5. HELPER: APPEND MESSAGE TO UI
    function appendMessage(sender, text, id = null) {
        if (!chatMessages) return;
        const msgDiv = document.createElement('div');
        if (id) msgDiv.id = id;

        msgDiv.className = sender === 'User' ? 
            'bg-gold/20 p-2 mb-2 ml-auto max-w-[80%] rounded-lg text-right text-white border border-gold/10' : 
            'bg-gray-800 p-2 mb-2 mr-auto max-w-[80%] rounded-lg text-gray-200';
        
        msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});