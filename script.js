// --- Background Animation (Particles) ---
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(245, 158, 11, 0.1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    setCanvasSize();
    particlesArray = [];
    for (let i = 0; i < 60; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// --- Menu Toggle ---
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
});

// --- Form Logic ---
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    result.innerHTML = "Sending...";
    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData));

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json
    })
    .then(async (response) => {
        let res = await response.json();
        if (response.status == 200) {
            result.innerHTML = "<span class='text-green-500'>Success! Message sent.</span>";
            form.reset();
        } else {
            result.innerHTML = "<span class='text-red-500'>Error: " + res.message + "</span>";
        }
    })
    .catch(() => {
        result.innerHTML = "<span class='text-red-500'>Something went wrong!</span>";
    });
});

window.addEventListener('resize', setCanvasSize);
initParticles();
animate();


function copyCode(btn) {
    // Find the <code> element relative to the button
    const container = btn.closest('.code-container');
    const code = container.querySelector('code').innerText;

    navigator.clipboard.writeText(code).then(() => {
        // Add 'copied' class for tooltip feedback
        btn.classList.add('copied');
        
        // Change icon color temporarily
        const originalColor = btn.style.color;
        btn.style.color = "#4ade80"; 

        setTimeout(() => {
            btn.classList.remove('copied');
            btn.style.color = originalColor;
        }, 2000);
    });
}
