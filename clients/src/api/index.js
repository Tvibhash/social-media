import axios from 'axios'


const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile'))
        req.headers.Authorization = `bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    return req
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPostBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const updateLike = (id) => API.patch(`/posts/${id}/updatePost`)


export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
