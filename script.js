document.addEventListener('DOMContentLoaded', () => {
    // 1. Trigger Initial Reveal
    const revealElement = document.querySelector('.reveal');
    setTimeout(() => {
        revealElement.classList.add('active');
    }, 200);

    // 2. Scroll Reveal for Service Cards
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "all 0.6s ease-out";
        observer.observe(card);
    });

    // 3. Simple AI Button Alert
    const aiBtn = document.querySelector('.pulse-red');
    aiBtn.addEventListener('click', () => {
        alert("AI Agent is starting up... Connection to n8n successful!");
    });
});
