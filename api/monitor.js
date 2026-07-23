import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

const base= "https://pro-api.coinmarketcap.com/public-api";
const BTC = 1;
const ETH = 1027;
let start = true;

let currentPrices = { btc: 0, eth: 0, lastupdate: ""};

app.use(cors());
app.use(express.static('.'));

async function checker(){
    const res = await fetch(`${base}/v1/simple/price?ids=${BTC},${ETH}&convert=USD`);
    const response = await res.json();
    if (response.status){
        if (response.status.error_code === '0'){
            const priceBtc = response.data[0].price.toString().split(".")[0];
            const priceEth = response.data[1].price.toString().split(".")[0];
            const updateTime = response.status.timestamp.split("T")[1].split(".")[0];
            currentPrices.lastupdate = updateTime;
            console.log(`Last update time : ${updateTime}`);
            if(start == true){
                currentPrices.btc = parseInt(priceBtc);
                currentPrices.eth = parseInt(priceEth);
                console.log(`BTC : ${priceBtc}$`);
                console.log(`ETH : ${priceEth}$`);
                start= false;
                return;
            }
            if (currentPrices.btc != parseInt(priceBtc)){
                currentPrices.btc = parseInt(priceBtc);
                console.log(`BTC : ${priceBtc}$`);
            }
            else{
                console.log("Same Btc price");
            }
            if (currentPrices.eth != parseInt(priceEth)){
                currentPrices.eth = parseInt(priceEth);
                console.log(`ETH : ${priceEth}$`);
            }
            else{
                console.log("Same Eth price");
            }
        }
    }
}

checker();
setInterval(checker, 60000);

app.get('/api/prices', (req, res) => {
    res.json(currentPrices);
});

// app.listen(PORT, () => {
//     console.log(`Serveur démarré sur http://localhost:${PORT}`);
// });

export default app;