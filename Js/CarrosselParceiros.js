document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('logos-track');
    const carousel = document.getElementById('carousel');
    const logos = [
        { src: 'https://res.cloudinary.com/dqewxdbfx/image/upload/v1746294870/Vanguard_1_oru4y6.png', alt: 'Facebook', url: 'https://www.lojasnet.com.br/web' },
        { src: 'https://res.cloudinary.com/dqewxdbfx/image/upload/v1746294598/Vanguard_n6icn4.png', alt: 'Disney', url: '' },
        { src: 'https://res.cloudinary.com/dqewxdbfx/image/upload/v1746292551/Vanguard_2_r9ysyu.png', alt: 'Airbnb', url: 'https://www.vanguard.com.br/imoveis-cuiaba' },
        { src: 'https://res.cloudinary.com/dqewxdbfx/image/upload/v1746291935/Design_sem_nome_zuzj5w.png', alt: 'Apple', url: 'https://www.plaenge.com.br/' },
        { src: 'https://res.cloudinary.com/dqewxdbfx/image/upload/v1746294870/Vanguard_1_oru4y6.png', alt: 'Facebook', url: 'https://www.lojasnet.com.br/web' },
        { src: 'https://res.cloudinary.com/dqewxdbfx/image/upload/v1746294598/Vanguard_n6icn4.png', alt: 'Disney', url: '' },
        { src: 'https://res.cloudinary.com/dqewxdbfx/image/upload/v1746292551/Vanguard_2_r9ysyu.png', alt: 'Airbnb', url: 'https://www.vanguard.com.br/imoveis-cuiaba' },
        { src: 'https://res.cloudinary.com/dqewxdbfx/image/upload/v1746291935/Design_sem_nome_zuzj5w.png', alt: 'Apple', url: 'https://www.plaenge.com.br/' },
    ];
    
    // Duplica os logos para efeito de loop infinito
    const duplicatedLogos = [...logos, ...logos];
    
    // Cria os elementos HTML dos logos
    let logosHTML = '';
    duplicatedLogos.forEach(logo => {
        logosHTML += `
            <div class="logo-item">
                <a href="${logo.url}" target="_blank">
                    <img src="${logo.src}" alt="${logo.alt}" class="logo-img">
                </a>
            </div>
        `;
    });
    
    track.innerHTML = logosHTML;
    
    // Interatividade
    let isDragging = false;
    let startX, scrollLeft;
    let animationPaused = false;
    let animationFrameId;
    let velocity = 0;
    let lastX;
    let lastTime;
    const friction = 0.95;
    const minVelocity = 0.1;
    
    // Pausar animação quando o mouse está sobre o carrossel
    carousel.addEventListener('mouseenter', () => {
        // Pausa a animação CSS
        track.style.animationPlayState = 'paused';
        animationPaused = true;
        cancelAnimationFrame(animationFrameId);
    });
    
    carousel.addEventListener('mouseleave', () => {
        if (!isDragging) {
            // Continua a animação CSS do ponto onde parou
            track.style.animationPlayState = 'running';
            animationPaused = false;
        }
    });
    
    // Funcionalidade de arrastar
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
        track.style.cursor = 'grabbing';
        track.style.animationPlayState = 'paused';
        animationPaused = true;
        lastX = e.pageX;
        lastTime = performance.now();
        velocity = 0;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
        
        // Calcular velocidade para inércia
        const now = performance.now();
        const deltaTime = now - lastTime;
        if (deltaTime > 0) {
            const deltaX = e.pageX - lastX;
            velocity = deltaX / deltaTime;
            lastX = e.pageX;
            lastTime = now;
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            track.style.cursor = 'grab';
            
            // Aplicar inércia
            if (Math.abs(velocity) > minVelocity) {
                applyInertia();
            } else {
                // Se a velocidade for muito baixa, voltar à animação automática
                setTimeout(() => {
                    if (!isDragging && !animationPaused) {
                        track.style.animationPlayState = 'running';
                    }
                }, 100);
            }
        }
    });
    
    // Funcionalidade de toque para dispositivos móveis
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
        track.style.animationPlayState = 'paused';
        animationPaused = true;
        lastX = e.touches[0].pageX;
        lastTime = performance.now();
        velocity = 0;
        cancelAnimationFrame(animationFrameId);
    });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
        
        // Calcular velocidade para inércia
        const now = performance.now();
        const deltaTime = now - lastTime;
        if (deltaTime > 0) {
            const deltaX = e.touches[0].pageX - lastX;
            velocity = deltaX / deltaTime;
            lastX = e.touches[0].pageX;
            lastTime = now;
        }
    });
    
    track.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
            
            // Aplicar inércia
            if (Math.abs(velocity) > minVelocity) {
                applyInertia();
            } else {
                // Se a velocidade for muito baixa, voltar à animação automática
                setTimeout(() => {
                    if (!isDragging && !animationPaused) {
                        track.style.animationPlayState = 'running';
                    }
                }, 100);
            }
        }
    });
    
    function applyInertia() {
        const apply = () => {
            if (Math.abs(velocity) > minVelocity && !isDragging) {
                track.scrollLeft -= velocity * 10;
                velocity *= friction;
                animationFrameId = requestAnimationFrame(apply);
            } else {
                // Quando a inércia terminar, voltar à animação automática
                if (!isDragging && !animationPaused) {
                    track.style.animationPlayState = 'running';
                }
            }
        };
        apply();
    }
});