import * as api from '../api/index.js';
import { UPDATE, FETCH_ALL, CREATE, DELETE, UPDATE_LIKE, FETCH_BY_SEARCH } from '../constants/actionTypes';

//actions creators

export const getPosts = (page) => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts(page);
        console.log(data);
        dispatch({ type: FETCH_ALL, payload: data })
    } catch (error) {
        console.log({ error: error.message })
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        console.log(data);
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}


export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error.message)
    }

}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error.message);
    }
}

export const updateLike = (id) => async (dispatch) => {
    try {
        const { data } = await api.updateLike(id);
        dispatch({ type: UPDATE_LIKE, payload: data })
    } catch (error) {
        console.log(error.message);
    }
}


export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data: { data } } = await api.fetchPostBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data })
    } catch (error) {
        console.log(error);
    }
}