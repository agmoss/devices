const Signal = require('../models/signal.model');


/**
 * Return all signal readings from the database
 * @param {req} HTTP request object
 * @param {res} HTTP response object
 * @param {next} callback arg to the middleware function
 */
exports.signal_model_all = function(req, res, next) {

    Signal.scan({},(err,list_signals) => {
        if (err) { return next(err); }
        //Successful, so render
        res.status(200).json(list_signals);
    })
};

/**
 * Filter signal readings by assetun and render
 * @param {req} HTTP request object
 * @param {res} HTTP response object
 * @param {next} callback arg to the middleware function
 */
exports.signal_model_assetUN = function(req, res, next) {

    Signal.scan('AssetUN').eq(req.params.assetun).exec(function (err,data) {
        if (err) { return next(err); }
        //Successful, so render
        res.status(200).json(data);
    })
};


/**
 * Filter signal readings by status and render
 * @param {req} HTTP request object
 * @param {res} HTTP response object
 * @param {next} callback arg to the middleware function
 */
exports.signal_model_status = function(req, res, next) {

    Signal.scan('status').eq(req.params.status).exec(function (err,data) {
        if (err) { return next(err); }
        //Successful, so render
        res.status(200).json(data);
    })
};


/**
 * Filter signal readings by assetun and status then render
 * @param {req} HTTP request object
 * @param {res} HTTP response object
 * @param {next} callback arg to the middleware function
 */
exports.signal_model_assetUN_status = function(req, res, next) {

    Signal.scan('status').eq(req.params.status).and().where('AssetUN').eq(req.params.assetun).exec(function (err,data) {
        if (err) { return next(err); }
        //Successful, so render
        res.status(200).json(data);
    })
};


/**
 * Add a signal reading to the database via POST request
 * @param {req} HTTP request object
 * @param {res} HTTP response object
 */
exports.add_signal = function(req,res){

    // Validate request body
    if(!req.body.key && !req.body.AssetUN && !req.body.entry_date && !req.body.status) {
        return res.status(400).send({
            message: "Signal can not be empty"
        });
    }

    let sig = new Signal({
        key: req.body.key,
        AssetUN: req.body.AssetUN,
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

/**
 * Delete a signal entry from the database
 * @param {req} HTTP request object
 * @param {res} HTTP response object
 */
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