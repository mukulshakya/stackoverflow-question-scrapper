const rp = require('request-promise');
const cheerio = require('cheerio');
// const fs = require('fs');
const express = require('express');

const app = express();

var port = process.env.PORT || 3030;

const url = 'https://stackoverflow.com/';

rp(url).then((html) => {
    var names = [];
    var $ = cheerio.load(html);

    // let track = 0;

    $('.summary h3 a').each((index, element) =>{
        if(index<5) {
            var name = $(element).text();
            var attr = $(element).attr('href');
            names.push({question: name, url: `https://stackoverflow.com${attr}`});
        }
        else {
            return 0;
        }
        // console.log(index)
    });

    // fs.writeFileSync("saved.js",JSON.stringify(names));

    app.get('/', (req, res) => {
        res.send({Questions: names});
    });

})
.catch((err) => {
    console.log(err);
});

app.listen(port, () => console.log('Up on port',port));