import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog }) => {

    const [visible, setVisible] = useState(false)

    const handleLike = () => {
        const { author, url, title, id } = blog
        addLike({
            likes: blog.likes + 1,
            user: blog.user.id,
            author,
            url,
            title,
            id
        })
    }

    const handleDelete = () => {
        if (window.confirm(`Please confirm you want to delete ${blog.title}`)) {
            removeBlog(blog.id)
        }
    }

    const showDetails = () => (
        <div>
            <p>
                {blog.url}
            </p>
            <p>
                {blog.likes}
                <button onClick={handleLike} id="like-button">Like</button>
            </p>
            <p>
                {blog.user.name}
            </p>
            <button onClick={handleDelete} id="blog-delete-button">Remove</button>
        </div>
    )

    return <div className="blog-card">
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)} id="blog-details-button">
            {visible ? 'Hide' : 'Show'}
        </button>
        {visible && showDetails()}
    </div>
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
}

export default Blog