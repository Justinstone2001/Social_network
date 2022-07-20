
const { thought } = require('../models');
module.exports = {
    createthought(req, res) {
        if (req.body.thoughtId) {
            thought.create(req.body)
                .then((_id ) => {
                    return thought.findOneAndUpdate(
                        { _id: req.body.thoughtId },
                        { $addToSet: { thoughts: thought._id } },
                        { new: true }
                    );
                })
                .then((thought) =>
                    !thought
                        ? res.status(404).json({
                            message: 'thought created, but found no thought with that ID',
                        })
                        : res.json('Created the thought 🎉')
                )
                .catch((err) => {
                    console.log(err);
                    return res.status(500).json(err);
                });
        } else {
            return res.status(404).json({ message: 'thoughtId not provided!' });
        }
    },
    getThoughts(req, res) {
        thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSinglethoughtById(req, res) {
        thought.findOne({ _id: req.params.thoughtId })
            .populate({ path: 'thoughts' })
            .populate({ path: 'friends' })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    updatethought(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deletethought(req, res) {
        thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : thought.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((thought) =>
                !thought
                    ? res.json({ message: 'thought deleted but no thought with this id!' })
                    : res.json({ message: 'thought successfully deleted from thought!' })
            ).catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought frind with ID!" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      
      deleteReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought find with this ID!" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

};
