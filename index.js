var express = require('express');
const fs = require('fs');

var app = express();

app.use(express.json());

app.post('/api/input', function(request, response) {
    var gifts_data_file = './gifts_data_file';
    var kids_data_file = './kids_data_file';

    var gifts = request.body["gifts"];
    var kids = request.body["kids"];
    let gift_data;
    let kid_data;

    if(gifts) {
        gifts.forEach((gift) => {
            gift_data = JSON.stringify(gift);
            fs.appendFile(gifts_data_file, gift_data + "\n", function (err) {
                if(err) {
                    console.log('Error: ' + err + ', gift: ' + gift_data);
                }
            });
        })
    }

    if(kids) {
        kids.forEach((kid) => {
            kid_data = JSON.stringify(kid);
            fs.appendFile(kids_data_file, kid_data + "\n", function (err) {
                if(err) {
                    console.log('Error: ' + err + ', kid: ' + kid_data);
                }
            });
        })
    }

    response.send("OK");
});

app.listen(3000);