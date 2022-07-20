const router = require('express').Router();
const {
    createThought,
    getThoughts,
    getSingleThoughtById,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction

} = require('../../controllers/thought_controller');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId')
.get(getSingleThoughtById)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions')
.post(createReaction);

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);


module.exports = router;