import { CoinbasePro } from 'coinbase-pro-node';

const auth = {
  apiKey: 'a62e46616d334bb4a15774a4a2944fc9',
  apiSecret: 'npBlC2VlCy929M4K1gD1fe1xzefDHlN/8gJ7JYjR0dFgpBLPFFvCUVCZl9idZQeHM8T9QqOGouNriprLWEdHpA==',
  passphrase: 'l8jxae27spg',
  useSandbox: false,
};

const client = new CoinbasePro(auth);

client.rest.order.placeOrder({
    type: 'market',
    side: 'buy',
    product_id: 'DOGE-USD',
    funds: '1.00',
})
.then(response => {
    console.log(response);
})
.catch(error => {
    console.log(error);
});

client.rest.order.getOrder('c656acbf-7032-4cae-850a-7700996c02a7')
.then(response => {
    console.log(response);
})
.catch(error => {
    console.log(error);
});
