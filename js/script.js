// js/script.js - EVENTO 15/05/2026
document.addEventListener('DOMContentLoaded', function() {
    
    // DATA DO EVENTO: 15 ABRIL 2026 - 22h
    const eventDate = new Date('2026-05-15T22:00:00').getTime();
    let eventEnded = false;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // ATUALIZA OS DISPLAYS
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // MODO CRÍTICO: menos de 24h
        const countdownSection = document.querySelector('.countdown');
        if (distance < 24 * 60 * 60 * 1000) { // 24 horas
            countdownSection.classList.add('critical');
        } else {
            countdownSection.classList.remove('critical');
        }
        
        // ULTIMAS 60 MINUTOS - ULTRA URGENTE
        if (distance < 60 * 60 * 1000) {
            document.querySelector('.countdown-label').textContent = 'FINAL COUNTDOWN';
        }
        
        // EVENTO ACABOU
        if (distance < 0) {
            eventEnded = true;
            document.querySelector('.countdown-label').textContent = 'SOLD OUT';
            document.querySelector('.countdown-timer').innerHTML = 
                '<div style="grid-column: 1/-1; font-size: 3rem; padding: 2rem;">EVENT SOLD OUT</div>';
        }
    }
    
    // INICIA COUNTDOWN
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});

// Notificação aleatória a cada 10-20s
setInterval(() => {
    if (eventEnded) return;
    const notif = document.createElement('div');
    notif.className = 'sale-notification';
    notif.textContent = '🎫 TICKET SOLD!';
    document.body.appendChild(notif);
    
    setTimeout(() => notif.remove(), 4000);
}, 15000);
