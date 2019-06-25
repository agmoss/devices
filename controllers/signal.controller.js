var signal = require('../models/signal.model');


exports.signal_model_all = function(req, res, next) {

    signal.scan({},(err,list_signals) => {
        if (err) { return next(err); }
        //Successful, so render
        res.render('index', { title: 'Signal List', json: list_signals});
        //res.status(200).json(list_signals);
    })
};

exports.signal_model_assetUN = function(req, res, next) {

    signal.scan('AssetUN').eq(req.params.assetun).exec(function (err,data) {
        if (err) { return next(err); }
        //Successful, so render
        res.status(200).json(data);
    })
};

exports.signal_model_status = function(req, res, next) {

    signal.scan('status').eq(req.params.status).exec(function (err,data) {
        if (err) { return next(err); }
        //Successful, so render
        res.status(200).json(data);
    })
};

exports.signal_model_assetUN_status = function(req, res, next) {

    signal.scan('status').eq(req.params.status).and().where('AssetUN').eq(req.params.assetun).exec(function (err,data) {
        if (err) { return next(err); }
        //Successful, so render
        res.status(200).json(data);
    })
};


// POST Data
exports.add_signal = function(req,res){

    let sig = new signal({
        key: req.body.key,
        AssetUN: req.body.assetUn,
        entry_date: req.body.entry_date,
        status:req.body.status
    })

    sig.save().then((stat)=>{
        res.send(stat)
    })
    .catch(error => {
        console.log(error);
        res.send(error);
      });

}

// Delete a signal