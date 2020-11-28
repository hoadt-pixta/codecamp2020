var MongoClient = require('mongodb').MongoClient;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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

    if(gioitinh == 1) {
        // Nam
        return calculation["nam"][type.to_string];
    } else {
        return calculation["nu"][type.to_string];
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
   
}