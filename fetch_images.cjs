const https = require('https');
const ids = [490494, 490500, 500000, 510000, 520000];
ids.forEach(id => {
https.get(`https://product-images.tcgplayer.com/fit-in/437x437/${id}.jpg`, (res) => console.log(id, res.statusCode));
});
