/* ===========================
   Main JavaScript
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // Navbar Scroll Effect
    // ===========================
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // ===========================
    // Floating Particles (Hero)
    // ===========================
    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random animation properties
            particle.style.setProperty('--duration', (Math.random() * 8 + 4) + 's');
            particle.style.setProperty('--delay', (Math.random() * 5) + 's');
            
            // Random opacity
            particle.style.opacity = Math.random() * 0.4 + 0.1;
            
            particlesContainer.appendChild(particle);
        }
    }

    // ===========================
    // Scroll Reveal Animation
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe member cards
    document.querySelectorAll('.member-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = item.classList.contains('left') 
            ? 'translateX(-30px)' 
            : 'translateX(30px)';
        item.style.transition = `opacity 0.6s ${index * 0.15}s ease-out, transform 0.6s ${index * 0.15}s ease-out`;
        observer.observe(item);
    });

    // ===========================
    // Member Card Tilt Effect
    // ===========================
    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.transition = 'transform 0.5s ease-out';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease-out';
        });
    });

    // ===========================
    // Plant Card Parallax
    // ===========================
    const plantCard = document.querySelector('.plant-card');
    
    if (plantCard) {
        plantCard.addEventListener('mousemove', (e) => {
            const rect = plantCard.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const moveX = (x - 0.5) * 10;
            const moveY = (y - 0.5) * 10;
            
            plantCard.style.transform = `translateY(-8px) scale(1.02) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
        });

        plantCard.addEventListener('mouseleave', () => {
            plantCard.style.transform = 'translateY(0) scale(1)';
            plantCard.style.transition = 'transform 0.5s ease-out';
        });

        plantCard.addEventListener('mouseenter', () => {
            plantCard.style.transition = 'transform 0.15s ease-out';
        });
    }

    // ===========================
    // Smooth Scroll for Anchors
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===========================
    // Image Error Handling
    // ===========================
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = this.parentElement.querySelector('.placeholder, .photo-placeholder, .photo-frame-placeholder');
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        });
    });

    // ===========================
    // Page Load Animation
    // ===========================
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

});
