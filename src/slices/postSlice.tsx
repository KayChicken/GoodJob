import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IPost } from '../components/Main'
import axios from 'axios'
import { randomInteger } from '../utils/randomInteger'

export interface PostsState {
    posts: IPost[],
    status: string
}




const initialState: PostsState = {
    posts: [],
    status: 'loading'
}

export const searchPostThunk = createAsyncThunk(
    'posts/searchPosts',
    async (search: string) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts${search ? `?title=${search}` : ''}`)
        return response.data
    }
)






export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<IPost[]>) => {
            state.posts = action.payload
        },


        setLike: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            state.posts = state.posts.map(post =>
                post.id === id
                    ? {
                        ...post,
                        likes: post.liked ? post.likes - 1 : post.likes + 1,
                        liked: !post.liked,
                        dislikes: post.disliked ? post.dislikes - 1 : post.dislikes,
                        disliked: false,

                    }
                    : post
            );

        },

        setDislike: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            state.posts = state.posts.map(post =>
                post.id === id
                    ? {
                        ...post,
                        dislikes: post.disliked ? post.dislikes - 1 : post.dislikes + 1,
                        disliked: !post.disliked,
                        likes: post.liked ? post.likes - 1 : post.likes,
                        liked: false,

                    }
                    : post
            );
        }


    },
    extraReducers: (builder) => {

        builder.addCase(searchPostThunk.pending, (state) => {
            state.status = 'loading'
        });
        builder.addCase(searchPostThunk.fulfilled, (state, action) => {
            state.status = 'succesful'
            const updatePosts = action.payload.map((post: IPost) => {
                post.likes = randomInteger(0, 50)
                post.dislikes = randomInteger(0, 50)
                post.liked = false
                post.disliked = false
                return post
            })
            state.posts = updatePosts
        });
        builder.addCase(searchPostThunk.rejected, (state, action) => {
            state.status = 'error'
        });
    },
})


export const { setLike, setDislike } = postSlice.actions

export default postSlice.reducer