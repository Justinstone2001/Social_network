const { Schema, model, Types } = require('mongoose');
// const moment = require('moment');

const reactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    // createdAt: { type: Date, default: Date.now, get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY') }
},
    {
        toJSON: { getters: true },
        id: false
    }
);

const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    // createdAt: { type: Date, default: Date.now, get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY') },
    createdAt: { type: Date, default: Date.now,},
    username: { type: String, required: true },
    reactions: [reactionSchema],
},
    {
        toJSON: { virtuals: true, getters: true },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const thought = model('Thought', thoughtSchema);

module.exports = thought;