import postModal from "../models/postModal.js"
import mongoose from "mongoose";

export const getPost = async (req, res) => {
    const { page } = req.query
    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page
        const total = await postModal.countDocuments({});

        const posts = await postModal.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);


         res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })
    } catch (error) {
        res.status(404).json({ Error: error.message })
    }
}

export const getPostBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query
    try {
        const title = new RegExp(searchQuery, 'i')
        const posts = await postModal.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] })
        res.json({ data: posts })
    } catch (error) {
        res.status(404).json({ Error: error.message })
    }
}

export const createPost = async (req, res) => {
    const body = req.body;
    const newPost = new postModal({ ...body, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(404).json({ Error: error.message })
    }
}


export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with that id")

    const updatedPost = await postModal.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost)
}


export const deletePost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that id")

    await postModal.findByIdAndRemove(id)

    res.json({ message: "Post has been deleted" })
}
export const updateLike = async (req, res) => {
    const { id } = req.params;
    if (!req.userId)
        return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that id")
    const post = await postModal.findById(id);
    console.log(post.likes + "     mypost")
    const index = post.likes.findIndex((id) => id === String(req.userId))
    console.log(index + "     xxxindex")
    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await postModal.findByIdAndUpdate(id, post, { new: true })
    console.log(updatedPost)
    res.json(updatedPost)

}