const router = require('express').Router();
const {
    createUser,
    getUsers,
    getSingleUserById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend

} = require('../../controllers/user_controller');

router.route('/').get(getUser).post(createUser);

router.route('/:userId')
.get(getSingleUserById)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friends/:friendId')
.post(deleteFriend)
.delete(deleteFriend);