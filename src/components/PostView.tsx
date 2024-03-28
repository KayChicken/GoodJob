import React from 'react'
import Blog, { IBlogProps } from './Blog'
import LittleBlog from './LittleBlog'





export default function PostView({ id, title, description, liked, likes, disliked, dislikes, descriptionActive }: IBlogProps) {

    switch (descriptionActive) {


        case true:
            return (
                <Blog id={id} title={title} description={description} descriptionActive={true} likes={likes} dislikes={dislikes} disliked={disliked} liked={liked} />
            )


        case false:
            return (
                <LittleBlog id={id} title={title} description={description} descriptionActive={false} likes={likes} dislikes={dislikes} disliked={disliked} liked={liked} />
            )

    }

}
