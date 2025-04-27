function animateCounter(element) {
    const targetValue = parseInt(element.getAttribute('data-to-value'));
    let currentValue = 0;
    const duration = 1000; // duração da animação em milissegundos (1 segundo)
    const frameRate = 60; // 60 frames por segundo
    const totalFrames = Math.round(duration / (1000 / frameRate));
    const increment = targetValue / totalFrames;

    let frame = 0;

    const counterInterval = setInterval(() => {
        frame++;
        currentValue += increment;
        if (frame >= totalFrames) {
            clearInterval(counterInterval);
            element.textContent = targetValue; // Garante o número exato no final
        } else {
            element.textContent = Math.round(currentValue);
        }
    }, 1000 / frameRate);
}

// Aplica a animação para todos os elementos com a classe 'counter-number'
document.querySelectorAll('.counter-number').forEach((counter) => {
    animateCounter(counter);
});
