const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    userId: {
        type: Number,
        ref: "User",
    },
    task: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = TodoModel;
