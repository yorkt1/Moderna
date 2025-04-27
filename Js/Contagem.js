function animateCounter(element) {
    const targetValue = parseInt(element.getAttribute('data-to-value'));
    let currentValue = 1;

    const interval = setInterval(() => {
        element.textContent = currentValue;
        currentValue++;
        if (currentValue > targetValue) {
            clearInterval(interval);
        }
    }, 0); // Atualiza a cada 10ms
}

// Aplica a animação para todos os elementos com a classe 'counter-number'
document.querySelectorAll('.counter-number').forEach((counter) => {
    animateCounter(counter);
});