var express = require('express');
const fs = require('fs');
const fastJson = require('fast-json-stringify');

var app = express();

app.use(express.json());

app.set('port', process.env.PORT || 3000);

const gift_stringify = fastJson({
    title: 'Gift Schema',
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        ages: {
            type: 'string'
        },
        color: {
            type: 'string'
        },
        latitude: {
            type: 'string'
        },
        longitude: {
            type: 'string'
        }
    }
})

const kid_stringify = fastJson({
    title: 'Kid Schema',
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        gender: {
            type: 'string'
        },
        age: {
            type: 'string'
        },
        interest: {
            type: 'string'
        },
        like_color: {
            type: 'string'
        },
        dislike_color: {
            type: 'string'
        },
        latitude: {
            type: 'string'
        },
        longitude: {
            type: 'string'
        }
    }
})

app.post('/api/input', function(request, response) {
    var gifts = request.body["gifts"];
    var kids = request.body["kids"];
    let gift_data = "";
    let kid_data = "";

    if(gifts) {
        gifts.forEach((gift) => {
            gift_data += gift_stringify(gift) + "\n";
        })

        fs.appendFile('./gifts_data_file', gift_data, function (err) {
            if(err) {
                console.log('Error: ' + err + ', gift: ' + gift_data);
            }
        });
    }

    if(kids) {
        kids.forEach((kid) => {
            kid_data += kid_stringify(kid) + "\n";
        })

        fs.appendFile('./kids_data_file', kid_data, function (err) {
            if(err) {
                console.log('Error: ' + err + ', kid: ' + kid_data);
            }
        });
    }

    response.send("OK");
});

app.listen(app.get('port'));