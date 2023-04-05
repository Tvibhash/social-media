import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name:String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes:[String],
    createdAt: {
        type: Date,
        default: new Date()
    }

})

const postModal = mongoose.model('postmodal', postSchema);

export default postModal;