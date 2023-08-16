const { Schema, model } = require('mongoose');


const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true, versionKey: false });

const BlogModel = model('blogs', BlogSchema);

module.exports = BlogModel;