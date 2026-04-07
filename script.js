const FORM_WEBHOOK_URL = "https://flydeala.app.n8n.cloud/webhook-test/efc5cc4a-63c8-4386-a512-38f216236821";

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