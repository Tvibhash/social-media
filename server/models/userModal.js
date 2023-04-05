import mongoose from 'mongoose'

const userScheme = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    id: { type: String },
})

const userModal = mongoose.model("user", userScheme);
export default userModal;