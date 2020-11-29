

const mongoose = require('mongoose');
mongoose.connect('mongodb://13.250.179.35:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const Kid = mongoose.model('kids', { id: String, gender: String, age: String, interest: String, like_color: String, dislike_color: String, latitude: String, longitude: String });
const Gift = mongoose.model('gifts', { id: String, type: String, ages: String, color: String, latitude: String, longitude: String });

// for (let i = 1; i < 12; i++) {
//     // Gift.count({ type: i }, function(err, data) {
//     //     console.log(data);
//     // })
//     get_gift_by_type(i)
// }

get_gift_by_type("1")


function get_gift_by_type(type){
    Gift.find({ type: type }, function(err, data){
        data.forEach(element => console.log(element.id));
    })

    // Kid.findOne({ interest: 8, gender: 1 }, function(err, data){
    //     console.log(data)
    //     // console.log(data.count);
    // })
}
