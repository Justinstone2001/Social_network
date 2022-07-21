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

router.route('/').get(getUsers).post(createUser);

router.route('/:userId')
.get(getSingleUserById)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;