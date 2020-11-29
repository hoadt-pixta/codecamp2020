const fs = require('fs');
var csvWriter = require('csv-write-stream');
var writer = csvWriter({sendHeaders: false});

function degrees_to_radians(degrees) {
    return degrees * (Math.PI / 180);
}

function get_time(distance) {
    const S = 1000;
    return distance / S;
}

function calculate_distance(lai1, loi1, lai2, loi2) {
    lai1 = degrees_to_radians(lai1);
    loi1 = degrees_to_radians(loi1);
    lai2 = degrees_to_radians(lai2);
    loi2 = degrees_to_radians(loi2);

    const diff_long = loi2 - loi1;
    const diff_lat = lai2 - lai1;
    const R = 6367;

    const val = Math.pow(Math.sin(diff_lat / 2), 2) + Math.cos(lai1) * Math.cos(lai2) * Math.pow(Math.sin(diff_long / 2), 2);
    const distance = R * (2 * Math.asin(Math.sqrt(val)));
    return distance;
}

function calculate_time(km) {
    let x = get_time(km);
    return 90 * Math.sin(x / 2 - 1) / (Math.pow((x / 2 - 3), 2) + 1) + 15;
}

function match_gioitinh_type(gioitinh, type) {
    let calculation = {
        "nam": {
            "1": 2, // doll
            "2": 10, // robot
            "3": 10, // lego
            "4": 8, // musical
            "5": 9, // car
            "6": 9, // sport
            "7": 4, // cooking
            "8": 4, // fashion
            "9": 5, // stuffed
            "10": 7, // comic
            "11": 8 // paiting
        },
        "nu": {
            "1": 10, // doll
            "2": 3, // robot
            "3": 6, // lego
            "4": 8, // musical
            "5": 6, // car
            "6": 7, // sport
            "7": 8, // cooking
            "8": 10, // fashion
            "9": 10, // stuffed
            "10": 7, // comic
            "11": 8 // paiting
        }
    }

    if(parseInt(gioitinh) === 1) {
        // Nam
        return calculation["nam"][String(type)];
    } else {
        return calculation["nu"][String(type)];
    }
}

function match_tuoi(kid_age, gift_ages) {
    let range = gift_ages.split("-");
    if(parseInt(kid_age) >= parseInt(range[0]) && parseInt(kid_age) <= parseInt(range[1])) {
        return 10;
    }

    return 2;
}

function match_mausac(kid_like_color, kid_dislike_color, gift_color) {
    if(gift_color === kid_like_color) {
        return 1.2;
    } else if (gift_color === kid_dislike_color) {
        return 0.8;
    }

    return 1;
}

function match_interest_type(kid_interest, gift_type) {
    if(kid_interest === gift_type) {
        return 2;
    }

    return 1;
}

function hpi (kid, gift) {
    let calculate_gioitinh_type = match_gioitinh_type(kid["gender"], gift["type"]);
    let calculate_tuoi = match_tuoi(kid["age"], gift["ages"]);
    let calculate_mausac = match_mausac(kid["like_color"], kid["dislike_color"], gift["color"]);
    let calculate_interest_type = match_interest_type(kid["interest"], gift["type"]);
    let distance = calculate_distance(kid["latitude"], kid["longitude"], gift["latitude"], gift["longitude"]);
    let received_time = calculate_time(distance);

    let result = ((calculate_gioitinh_type + calculate_tuoi + received_time/4)) * calculate_mausac * calculate_interest_type;

    writer.write({kid_id: kid["id"], gift_id: gift["id"], happy_index: parseInt(result)});
}

// kid = {"id": "1516", "gender": "1", "age": "10", "interest": "10", "like_color": "White", "dislike_color": "Pink", "latitude": "61.479", "longitude": "-58.313"};
// gift = {"id": "6501384", "type": "10", "ages": "13-15", "color": "White", "latitude": "18.704", "longitude": "110.68"};

// kid1 = {"id": "1517", "gender": "0", "age": "16", "interest": "7", "like_color": "Red", "dislike_color": "Yellow", "latitude": "-82.405", "longitude": "-45.392"};
// gift1 = {"id": "6501385", "type": "11", "ages": "4-10", "color": "Green", "latitude": "-54.504", "longitude": "-75.766"};

// writer.pipe(fs.createWriteStream('./output.csv'));

// hpi(kid1, gift1);
// hpi(kid, gift);

// writer.end();