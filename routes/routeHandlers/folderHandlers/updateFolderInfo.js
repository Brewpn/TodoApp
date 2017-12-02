const TodoFolder = require('../../../models/user').TodoFolder;
const mongoose = require('mongoose');

exports.put = function (req, res, done) {

    const _id = req.body.id,
        ownerId = req.user.id,
        title = req.body.title,
        priority = req.body.priority,
        success = req.body.success;

    TodoFolder.findOne({_id, ownerId})
        .exec()
        .then(todoFolder => {
            if(title) todoFolder.title = title;
            if(priority) todoFolder.params.priority = priority;
            if(success) todoFolder.params.success = success;
            return todoFolder;
        })
        .then((todoFolder)=>{
            todoFolder.save();
            return todoFolder;
        })
        .then((todoFolder)=>res.status(200).send(todoFolder))
        .catch((err)=>res.status(500).send(err))

};