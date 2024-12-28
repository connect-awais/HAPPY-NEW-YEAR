document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    const yearElement = document.getElementById("year");
    const typewriterElement = document.getElementById('happyNewYear');
    
    // Set canvas size to full window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle settings
    const particles = [];
    const particleCount = 500;  // Increased particle count

    // Particle class definition
    class Particle {
        constructor(x, y, radius, speedX, speedY, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.originalRadius = radius;
            this.color = color;
            this.speedX = speedX;
            this.speedY = speedY;
            this.opacity = Math.random() * 0.5 + 0.5;
            this.opacityDirection = Math.random() > 0.5 ? 1 : -1;
            this.sizeDirection = Math.random() > 0.5 ? 1 : -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
            ctx.fill();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Boundary collision (bounce back)
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Twinkle effect (adjust opacity)
            this.opacity += this.opacityDirection * 0.02;
            if (this.opacity <= 0.2 || this.opacity >= 1) this.opacityDirection *= -1;

            // Size oscillation
            this.radius += this.sizeDirection * 0.2;
            if (this.radius <= this.originalRadius - 1 || this.radius >= this.originalRadius + 3) this.sizeDirection *= -1;

            this.draw();
        }
    }

    // Create more particles with faster movement
    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 4 + 2;
        const speedX = (Math.random() - 0.5) * 4;  // Increased speed (more movement)
        const speedY = (Math.random() - 0.5) * 4;  // Increased speed (more movement)
        const color = {
            r: Math.floor(Math.random() * 255),
            g: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255),
        };
        particles.push(new Particle(x, y, radius, speedX, speedY, color));
    }

    // Animate particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => particle.update());
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Confetti and Fireworks functions
    function createConfetti() {
        const confetti = document.getElementById("confetti");
        for (let i = 0; i < 100; i++) {
            const confettiPiece = document.createElement("div");
            confettiPiece.classList.add("confetti-piece");
            confetti.appendChild(confettiPiece);
        }
    }

    function createFireworks() {
        const fireworks = document.getElementById("fireworks");
        for (let i = 0; i < 3; i++) {
            const firework = document.createElement("div");
            firework.classList.add("firework");
            fireworks.appendChild(firework);
        }
    }

    // Year change with animation
    setTimeout(() => {
        yearElement.textContent = "2025";
        yearElement.style.color = "red";
        yearElement.style.animation = "fadeInText 2s ease-in-out";
        createConfetti();
        createFireworks();
        // Reduce blur effect only for 2025
        yearElement.style.textShadow = "0 0 2px rgba(255, 255, 255, 0.8), 0 0 5px rgba(255, 255, 255, 0.5)"; // Reduced blur for 2025
    }, 5000);

    // Year change (fade-out and fade-in)
    setTimeout(() => {
        yearElement.style.animation = "fadeOutYear 1s forwards";
        setTimeout(() => {
            yearElement.textContent = "2025";
            yearElement.style.animation = "fadeInYear 1s forwards, bounce 1s ease-in-out";
            yearElement.style.opacity = 1;
        }, 1000);
    }, 3000);

    // Typewriter effect for "HAPPY NEW YEAR!"
    const text = "HAPPY NEW YEAR!";
    let index = 0;

    function typeWriterEffect() {
        if (index < text.length) {
            const span = document.createElement('span');
            span.textContent = text.charAt(index);
            span.className = "fade-in";
            typewriterElement.appendChild(span);
            index++;
            setTimeout(typeWriterEffect, 150);
        }
    }

    window.onload = () => {
        typeWriterEffect();
    };

    // Color shift effect for text and year
    let hue = 0;
    function shiftColor() {
        hue = (hue + 1) % 360;
        typewriterElement.style.color = `hsl(${hue}, 100%, 50%)`;
        typewriterElement.style.textShadow = `
            0 0 10px hsl(${hue}, 100%, 50%),
            0 0 20px hsl(${(hue + 30) % 360}, 100%, 50%),
            0 0 30px hsl(${(hue + 60) % 360}, 100%, 50%)
        `;
        requestAnimationFrame(shiftColor);
    }

    shiftColor();

    // Year glow effect for 2025
    let glowHue = 0;
    function shiftYearGlow() {
        glowHue = (glowHue + 1) % 360;
        yearElement.style.textShadow = `
            0 0 10px hsl(${glowHue}, 100%, 50%),
            0 0 20px hsl(${(glowHue + 30) % 360}, 100%, 50%),
            0 0 30px hsl(${(glowHue + 60) % 360}, 100%, 50%),
            0 0 40px hsl(${(glowHue + 90) % 360}, 100%, 50%)
        `;
        requestAnimationFrame(shiftYearGlow);
    }

    shiftYearGlow();

    // Resize canvas on window resize
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
});

// Year transition code (focused on text-shadow for 2024 and 2025)
document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.getElementById("year");

    // Initially set the year to 2024 and color it yellow
    yearElement.textContent = "2024";
    yearElement.style.color = "yellow";
    // Reduce blur effect only for 2024 year element
    yearElement.style.textShadow = "0 0 0 rgba(255, 255, 255, 0.8), 0 0 1px rgba(255, 255, 255, 0.5)"; // Reduced blur for 2024

    // Change the year to 2025 after 3 seconds, with color transition
    setTimeout(() => {
        // Fade out 2024 by reducing opacity
        yearElement.style.transition = "opacity 1s ease-out";
        yearElement.style.opacity = 0;

        // After the fade-out is complete, change the text and color
        setTimeout(() => {
            yearElement.textContent = "2025";  // Change the year to 2025
            yearElement.style.color = "red";  // Change the color to red
            yearElement.style.opacity = 1;    // Fade the text back in
            yearElement.style.transition = "opacity 1s ease-in";  // Smooth transition for opacity
            // Reduce blur effect only for 2025 year element
            yearElement.style.textShadow = "0 0 0 rgba(255, 255, 255, 0.8), 0 0 1px rgba(255, 255, 255, 0.5)"; // Reduced blur for 2025
        }, 1000);  // Wait for 1 second for the fade-out to finish
    }, 3000);  // Start the transition after 3 seconds
});
