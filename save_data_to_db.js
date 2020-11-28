const mongoose = require('mongoose');
const lineReader = require('line-reader');

mongoose.connect('mongodb://13.250.179.35:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

type_of_gift = {
    "Doll": 1,
    "Robot": 2,
    "Lego": 3,
    "Musical": 4,
    "Car": 5,
    "Sport": 6,
    "Cooking": 7,
    "Fashion": 8,
    "Stuffed": 9,
    "Comic": 10,
    "Painting": 11
}

type_of_gender = {
    "Girl": 0,
    "Boy": 1
}

const Kid = mongoose.model('kids', { id: String, gender: String, age: String, interest: String, like_color: String, dislike_color: String, latitude: String, longitude: String });
const Gift = mongoose.model('gifts', { id: String, type: String, ages: String, color: String, latitude: String, longitude: String });

lineReader.eachLine('gifts_data_file', function(line) {
    json_line = JSON.parse(line);
    json_line["type"] = type_of_gift[json_line["type"]]

    const gift = new Gift(json_line)
    gift.save().then(() => console.log("Gift Success"), () => console.log("Gift Failed"));
});

lineReader.eachLine('kids_data_file', function(line) {
    json_line = JSON.parse(line);
    console.log(json_line["interest"]);
    json_line["interest"] = type_of_gift[json_line["interest"]]
    json_line["gender"] = type_of_gender[json_line["gender"]]

    const kid = new Kid(json_line)
    kid.save().then(() => console.log("Kid Success"), () => console.log("Kid Failed"));
});

