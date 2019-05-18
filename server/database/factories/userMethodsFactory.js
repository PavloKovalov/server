const UserSchema = require('../models/user');
const isNull = require('../../utilities/isNull');

function userMethodsFactory(userModelName) {
  if (isNull(userModelName)) {
    return {};
  }

  const Users = UserSchema(userModelName);

  const getAllUsers = (fields = null) => {
    return Users.find({}, fields).exec();
  };

  const querySearch = (query, fields = null) => {
    return Users.find(query, fields).exec();
  };

  const getUserById = (id, fields = null) => {
    return Users.findOne({ _id: id }, fields).exec();
  };

  const putUserDepartment = (userId, department) => {
    return Users.findOneAndUpdate(
      { _id: userId },
      { $set: { department } },
      { useFindAndModify: false, new: true },
      (err, data) => data
    );
  };

  const postNewUser = user => {
    const newUser = new Users(user);

    return new Promise((resolve, reject) => {
      newUser.save((err, addedUser) => {
        if (err) reject(err);
        resolve(addedUser);
      });
    });
  };

  const getAllUsersByEventId = id => {
    return Users.find({ 'events.eventId': id }).exec();
  };

  const putUserBan = (user, banned) => {
    return Users.findOneAndUpdate(
      user,
      { $set: { banned } },
      { useFindAndModify: false, new: true },
      (err, data) => data
    );
  };

  const saveNewUser = user => {
    return new Promise((resolve, reject) => {
      const newUser = new Users({
        lastName: user.last_name,
        firstName: user.first_name,
        telegramUserId: user.id,
        avatar: user.photo_url,
        username: user.username
      });

      newUser.save((err, addedUser) => {
        if (err) reject(err);
        resolve(addedUser);
      });
    });
  };

  return {
    getAllUsers,
    getUserById,
    putUserDepartment,
    postNewUser,
    getAllUsersByEventId,
    querySearch,
    putUserBan,
    saveNewUser
  };
}

module.exports = userMethodsFactory;
