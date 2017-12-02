const todo = require('../../../models/user').todo;

exports.put = function (req, res, done) {
    const _id = req.body.id,
        ownerId = req.user.id,
        description = req.body.description,
        status = req.body.status;

    todo.findOne({_id,ownerId})
        .exec()
        .then((Todo)=>{
            if(description) Todo.todoDescription = description;
            if(status) Todo.todoDone = status;
            return Todo;
        })
        .then((Todo)=>{
            Todo.save();
            return Todo;
        })
        .then((Todo)=>res.status(200).send(Todo))
        .catch((err)=>res.status(500).send(err))
};