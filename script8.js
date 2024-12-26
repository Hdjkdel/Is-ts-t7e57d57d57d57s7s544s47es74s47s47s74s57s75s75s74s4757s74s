const coins = document.querySelectorAll('.coin');
const startButton = document.getElementById('start-button');

coins.forEach(coin => {
    coin.addEventListener('click', () => {
        coin.classList.toggle('selected');
    });
});

startButton.addEventListener('click', () => {
    const selectedCoins = Array.from(document.querySelectorAll('.coin.selected'))
        .map(coin => coin.getAttribute('data-name'));
    if (selectedCoins.length > 0) {
        window.location.href = 'indexx.html'; // Dosyaya yönlendirme
    } else {
        alert('Please select at least one blockchain!');
    }
});