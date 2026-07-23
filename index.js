const btcCheckbox = document.getElementById('btc-choice');
const btc = document.getElementById('btc');
const ethCheckbox = document.getElementById('eth-choice');
const eth = document.getElementById('eth');

async function updateFrontendPrices() {
    if (!ethCheckbox.checked && !btcCheckbox.checked)
        return;
    try {
        // On interroge notre serveur Express local
        const res = await fetch('/api/prices');
        const data = await res.json();
        
        // On met à jour le texte à l'écran
        document.getElementById('btc-price').textContent = `${data.btc} $`;
        document.getElementById('eth-price').textContent = `${data.eth} $`;
        document.getElementById('time-update').textContent =`Last update time : ${data.lastupdate}`;
    } catch (error) {
        console.error("Impossible de joindre le serveur local :", error.message);
    }
}

btcCheckbox.addEventListener('change', function() {
    if (this.checked){
        btc.style.display = 'block';
        updateFrontendPrices();
    }
    else{
        btc.style.display = 'none';
    }
});

ethCheckbox.addEventListener('change', function() {
    if (this.checked){
        eth.style.display = 'block';
        updateFrontendPrices();
    }
    else{
        eth.style.display = 'none';
    }
});

updateFrontendPrices();
setInterval(updateFrontendPrices, 5000);