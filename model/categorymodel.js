let mongoose = require('mongoose');
let catSchema = mongoose.Schema({
    category:String,
    categoryTitle:String,
    categoryMeta:String,
    categoryDesc:String,
    categoryUrl:String,
    categoryDetails:String,
    categoryPhoto:String    
})


let catModel = mongoose.model('catTable', catSchema)

// let coll = db.collection('catTable');
// coll.count().then((count) => {
//     console.log(count);
// });


module.exports = catModel