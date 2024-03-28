import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setDislike, setLike } from '../slices/postSlice'



interface IBlogProps {
    id: number,
    title: string,
    description: string,
    descriptionActive: boolean,
    likes: number,
    dislikes: number,
    liked: boolean,
    disliked: boolean
}


export default function LittleBlog({ id, title, description, descriptionActive, likes, dislikes, liked, disliked }: IBlogProps) {

    const dispatch = useDispatch()
    return (
        <div className='post'>
            <img className='post__img' src="https://placehold.co/1140x600" alt="" />
            <div className='post__bottom'>
                <div className='post__top'>
                    <h2 className='post__header post__header-small'>{title}</h2>
                    <div className='post__rating post__rating-small'>
                        <div className='flex-center'>
                            <div className='post__rate-container'>
                                <svg onClick={() => dispatch(setLike(id))} className='post__like' width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.666687 24.1667H3.33335C4.06669 24.1667 4.66669 23.5667 4.66669 22.8334V10.8334C4.66669 10.1 4.06669 9.50002 3.33335 9.50002H0.666687V24.1667ZM27.1067 14.6734C27.2534 14.34 27.3334 13.98 27.3334 13.6067V12.1667C27.3334 10.7 26.1334 9.50002 24.6667 9.50002H17.3334L18.56 3.30002C18.6267 3.00669 18.5867 2.68669 18.4534 2.42002C18.1467 1.82002 17.76 1.27335 17.28 0.793354L16.6667 0.166687L8.12002 8.71335C7.61335 9.22002 7.33335 9.90002 7.33335 10.6067V21.06C7.33335 22.7667 8.73335 24.1667 10.4534 24.1667H21.2667C22.2 24.1667 23.08 23.6734 23.56 22.8734L27.1067 14.6734Z" fill={liked ? `#219653` : '#959298'} />
                                </svg>
                                <span className='post__rate'>{likes}</span>
                            </div>

                            <div className='post__rate-container'>
                                <svg onClick={() => dispatch(setDislike(id))} className='post__dislike' width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.66666 0.833313H3.33333C4.06666 0.833313 4.66666 1.43331 4.66666 2.16665V14.1666C4.66666 14.9 4.06666 15.5 3.33333 15.5H0.66666V0.833313ZM27.1067 10.3266C27.2533 10.66 27.3333 11.02 27.3333 11.3933V12.8333C27.3333 14.3 26.1333 15.5 24.6667 15.5H17.3333L18.56 21.7C18.6267 21.9933 18.5867 22.3133 18.4533 22.58C18.1467 23.18 17.76 23.7266 17.28 24.2066L16.6667 24.8333L8.12 16.2866C7.61333 15.78 7.33333 15.1 7.33333 14.3933V3.95331C7.33333 2.23331 8.73333 0.833313 10.4533 0.833313H21.2533C22.2 0.833313 23.0667 1.32665 23.5467 2.12665L27.1067 10.3266Z" fill={disliked ? "#EB5757" : "#959298"} />
                                </svg>
                                <span className='post__rate'>{dislikes}</span>
                            </div>
                        </div>
                        <div className='post__btn'>
                            <Link to={`/post/${id}`} className='post__view'>Читать далее</Link>
                        </div>

                    </div>
                </div>
                <p className={`post__description ${descriptionActive ? "" : "hidden"}`}>
                    {description}
                </p>

            </div>
        </div>
    )
}
