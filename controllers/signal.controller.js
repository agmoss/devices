const Signal = require('../models/signal.model');


exports.signal_model_all = function(req, res, next) {

    Signal.scan({},(err,list_signals) => {
        if (err) { return next(err); }
        //Successful, so render
        res.render('index', { title: 'Signal List', json: list_signals});
        //res.status(200).json(list_signals);
    })
};

exports.signal_model_assetUN = function(req, res, next) {

    Signal.scan('AssetUN').eq(req.params.assetun).exec(function (err,data) {
        if (err) { return next(err); }
        //Successful, so render
        res.status(200).json(data);
    })
};

exports.signal_model_status = function(req, res, next) {

    Signal.scan('status').eq(req.params.status).exec(function (err,data) {
        if (err) { return next(err); }
        //Successful, so render
        res.status(200).json(data);
    })
};

exports.signal_model_assetUN_status = function(req, res, next) {

    Signal.scan('status').eq(req.params.status).and().where('AssetUN').eq(req.params.assetun).exec(function (err,data) {
        if (err) { return next(err); }
        //Successful, so render
        res.status(200).json(data);
    })
};


// POST Data
exports.add_signal = function(req,res){

    // Validate request
    if(!req.body.key && !req.body.assetUn && !req.body.entry_date && !req.body.status) {
        return res.status(400).send({
            message: "Signal can not be empty"
        });
    }

    let sig = new Signal({
        key: req.body.key,
        AssetUN: req.body.assetUn,
        entry_date: req.body.entry_date,
        status:req.body.status
    })

    sig.save().then((stat)=>{
        res.send(stat)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Signal entry."
        });
      });

}

// Delete a signal
exports.delete_signal = function (req,res){

    Signal.delete(req.params.key)
    .then(signal => {
        if(!signal) {
            return res.status(404).send({
                message: "Signal not found with id " + req.params.key
            });
        }
        res.send({message: "Signal deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Signal not found with id " + req.params.key
            });                
        }
        return res.status(500).send({
            message: "Could not delete signal with id " + req.params.key
        });
    });
}