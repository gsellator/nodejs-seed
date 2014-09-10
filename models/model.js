//var mongoose = require('mongoose'),
//    Schema = mongoose.Schema,
//    model = module.exports;
//
//
//var OAuthWelcomePackSchema = new Schema({
//    user_id: { type: String }
//});
//
//mongoose.model('OAuthWelcomePack', OAuthWelcomePackSchema);
//var OAuthWelcomePackModel = mongoose.model('OAuthWelcomePack');
//
////CRUD WelcomePack
//model.createWelcomePack = function (user_id, callback) {
//    var newWelcomePack = new OAuthWelcomePackModel({
//        user_id: user_id
//    });
//    newWelcomePack.save(function (err, result) {
//        callback(result);
//    });
//};
//
//model.getWelcomePackFromId = function (id, callback) {
//    OAuthWelcomePackModel.findOne({"_id": id}, function (err, result) {
//        if (err) { throw err; }
//        callback(result);
//    });
//};
