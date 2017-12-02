const TodoFolder = require('../../../models/user').TodoFolder;
const todo = require('../../../models/user').todo;
exports.delete = function (req, res, done) {

    const id = req.body.id,
        OwnerId = req.user._id;

  TodoFolder.findOneAndRemove({
      _id : id,
      ownerId : OwnerId
  })
      .catch((err)=>res.send(err));
  todo.remove({
      folderId : id,
      ownerId : OwnerId
  })
      .then(()=>{
          res.send(`Folder (and all TODO from it) with ${req.body.id.toUpperCase()} have been deleted`);
      })
};
