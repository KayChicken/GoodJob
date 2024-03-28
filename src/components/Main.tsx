import React, { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
import SkeletonBlog from './SkeletonBlog'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { searchPostThunk } from '../slices/postSlice'
import { setSearchValue } from '../slices/inputSlice'
import PostView from './PostView'





export interface IPost {
    id: number,
    title: string,
    body: string
    likes: number
    dislikes: number
    liked: boolean,
    disliked: boolean
}


export default function Main() {
    const dispatch = useDispatch<AppDispatch>()
    const { posts, status } = useSelector((state: RootState) => state.posts)
    const { search } = useSelector((state: RootState) => state.input)
    const [input, setInput] = useState<string>('');




    useEffect(() => {
        setInput(search)
    }, [search])

    const inputDelay = useCallback(
        debounce((s: string) => {
            dispatch(setSearchValue(s))
        }, 500),
        []
    )


    const onChange = (string: string) => {
        setInput(string)
        inputDelay(string)
    }





    return (

        <section className='blog'>
            <div>
                <h1 className='blog__header'>Блог</h1>
                <p className='blog__paragraph'>Здесь мы делимся интересными кейсами из наших проектов,
                    пишем про IT, а также переводим зарубежные статьи</p>
            </div>
            <div className='blog__search'>
                <svg className='blog__search-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.31 15.9L20.71 19.29C20.8993 19.4778 21.0058 19.7334 21.0058 20C21.0058 20.2666 20.8993 20.5222 20.71 20.71C20.5222 20.8993 20.2666 21.0058 20 21.0058C19.7334 21.0058 19.4778 20.8993 19.29 20.71L15.9 17.31C14.5025 18.407 12.7767 19.0022 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11C19.0022 12.7767 18.407 14.5025 17.31 15.9ZM11 5C7.68629 5 5 7.68629 5 11C5 14.3137 7.68629 17 11 17C14.3137 17 17 14.3137 17 11C17 7.68629 14.3137 5 11 5Z" fill="#333333" />
                </svg>
                <input value={input} onChange={(e) => onChange(e.target.value)} type="text" className='blog__input' placeholder='Поиск по названию статьи' />
            </div>
            <div className='blog__posts'>
                {status !== 'loading' ? posts.map((element, index) => <PostView key={element.title} id={element.id} title={element.title} description={element.body} descriptionActive={index === 0 ? true : false} likes={element.likes} dislikes={element.dislikes} disliked={element.disliked} liked={element.liked} />

                ) : [...Array(8)].map((element, index) => (<SkeletonBlog key={index} descriptionActive={index === 0 ? true : false} />))}
            </div>
        </section>

    )
}


