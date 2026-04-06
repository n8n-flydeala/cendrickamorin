console.log("Luxury Mode Loaded — Young Isis Grrrt!");

document.addEventListener('DOMContentLoaded', () => {

    // HERO FADE-IN EFFECT
    document.querySelector(".hero-fade").style.opacity = 0;
    setTimeout(() => {
        document.querySelector(".hero-fade").style.transition = "1.4s";
        document.querySelector(".hero-fade").style.opacity = 1;
    }, 200);

    // SERVICE REVEAL
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

    // CONTACT FORM WEBHOOK
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async e => {
        e.preventDefault();

        const data = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };

        try {
            await fetch("YOUR_WEBHOOK_URL", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            alert("Message sent successfully ✦");
            form.reset();
        } catch (err) {
            alert("Something went wrong.");
            console.error(err);
        }
    });
});