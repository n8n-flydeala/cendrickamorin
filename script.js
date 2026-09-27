const FORM_WEBHOOK_URL = "https://flydeala.app.n8n.cloud/webhook/efc5cc4a-63c8-4386-a512-38f216236821";
const CHAT_WEBHOOK_URL = "https://flydeala.app.n8n.cloud/webhook/chatbot";

document.addEventListener("DOMContentLoaded", () => {
  const workForm = document.getElementById("workWithMeForm");
  const successDiv = document.getElementById("form-success");
  const errorDiv = document.getElementById("form-error");
  const submitBtn = document.getElementById("submit-btn");
  const btnText = document.getElementById("btn-text");
  const btnLoading = document.getElementById("btn-loading");

  if (workForm && submitBtn) {
    workForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (submitBtn.disabled) return;

      const formData = new FormData(workForm);
      const payload = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        message: String(formData.get("message") || "").trim()
      };

      if (!payload.name || !payload.email || !payload.message) return;

      submitBtn.disabled = true;
      btnText?.classList.add("hidden");
      btnLoading?.classList.remove("hidden");
      errorDiv?.classList.add("hidden");

      try {
        const response = await fetch(FORM_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`Webhook returned ${response.status}`);

        workForm.reset();
        workForm.classList.add("hidden");
        successDiv?.classList.remove("hidden");
        successDiv?.focus();
      } catch (error) {
        console.error("Contact form error:", error);
        errorDiv?.classList.remove("hidden");
      } finally {
        submitBtn.disabled = false;
        btnText?.classList.remove("hidden");
        btnLoading?.classList.add("hidden");
      }
    });
  }

  const askAiBtn = document.getElementById("custom-ask-btn");
  const chatContainer = document.getElementById("chat-container");
  const closeChat = document.getElementById("close-chat");
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const chatMessages = document.getElementById("chat-messages");

  if (askAiBtn && chatContainer) {
    askAiBtn.addEventListener("click", () => {
      const opening = chatContainer.classList.contains("hidden");
      chatContainer.classList.toggle("hidden");
      askAiBtn.setAttribute("aria-expanded", String(opening));
      if (opening) userInput?.focus();
    });
  }
  if (closeChat && chatContainer) {
    closeChat.addEventListener("click", () => {
      chatContainer.classList.add("hidden");
      askAiBtn?.setAttribute("aria-expanded", "false");
      askAiBtn?.focus();
    });
    chatContainer.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeChat.click();
    });
  }

  function addMessage(text, isUser) {
    if (!chatMessages) return;
    const div = document.createElement("div");
    div.className = isUser
      ? "chat-bubble-user p-3 ml-auto max-w-[85%] rounded-lg text-right"
      : "chat-bubble-ai p-3 mr-auto max-w-[85%] rounded-lg";
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function sendMessage() {
    if (!userInput || !sendBtn || sendBtn.disabled) return;
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = "";
    sendBtn.disabled = true;
    sendBtn.textContent = "...";

    try {
      const response = await fetch(CHAT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      if (!response.ok) throw new Error(`Chat webhook returned ${response.status}`);

      const data = await response.json();
      addMessage(data.reply || data.message || "Got your message.", false);
    } catch (error) {
      console.error("Chat error:", error);
      addMessage("Sorry, I can't connect right now.", false);
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = "SEND";
      userInput.focus();
    }
  }

  sendBtn?.addEventListener("click", sendMessage);
  userInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  // Keep a direct-image link as the no-JavaScript fallback.
  const proofDialog = document.getElementById("proof-dialog");
  const proofImage = document.getElementById("proof-full-image");
  const proofCaption = document.getElementById("proof-caption");
  const proofOriginal = document.getElementById("proof-original");
  let proofTrigger = null;
  document.querySelectorAll("[data-proof]").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (!proofDialog?.showModal || !proofImage || !proofCaption || !proofOriginal) return;
      e.preventDefault();
      proofTrigger = link;
      proofImage.src = link.dataset.proof;
      proofImage.alt = link.dataset.caption;
      proofCaption.textContent = link.dataset.caption;
      proofOriginal.href = link.href;
      document.body.classList.add("proof-open");
      proofDialog.showModal();
    });
  });
  document.getElementById("close-proof")?.addEventListener("click", () => proofDialog?.close());
  proofDialog?.addEventListener("close", () => {
    document.body.classList.remove("proof-open");
    proofTrigger?.focus();
  });
});
