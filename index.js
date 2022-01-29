import 'dotenv/config';
import { CoinbasePro } from 'coinbase-pro-node';

const auth = {
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  passphrase: process.env.PASSPHRASE,
  useSandbox: false,
};

const client = new CoinbasePro(auth);

const AMOUNT = 1.00;

const coins = [
    'BTC', 
    'ETH', 
    'DAI', 
    'ADA', 
    'AVAX', 
    'MANA', 
    'DOT', 
    'SUSHI', 
    'UNI', 
    'LINK', 
    'DOGE', 
    'MKR', 
    'POWR', 
    'MATIC', 
    'AAVE', 
    'UMA', 
    'FET', 
    'ICP'
];

const placeOrder = async coin => {
    return client.rest.order.placeOrder({
        type: 'market',
        side: 'buy',
        product_id: `${coin}-USD`,
        funds: AMOUNT,
    })
    .then(response => {
        return response.id;
    })
    .catch(error => {
        console.log(error);
    });
};

const getOrderStatus = async orderID =>{
    return client.rest.order.getOrder(orderID)
    .then(response => {
        return response.settled;
    })
    .catch(error => {
        console.log(error);
    });
};

const main = async () => {
    for (let coin of coins) {
        const orderID = await placeOrder(coin);
    
        let orderSettled = await getOrderStatus(orderID);
        while (!orderSettled) {
            await new Promise(r => setTimeout(r, 1000));
            orderSettled = await getOrderStatus(orderID);
        }
    }
};

main();