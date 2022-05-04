import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ createBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlogPost = e => {
        e.preventDefault()
        createBlog({
            title, author, url
        })
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return <>
        <h2>Add new blog</h2>
        <form onSubmit={handleNewBlogPost}>
            <div>
                <label htmlFor='title'>Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}>
                </input>
            </div>
            <div><label htmlFor='author'>Author</label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}>
                </input></div>
            <div>
                <label htmlFor='URL'>URL</label>
                <input
                    type="text"
                    id="URL"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}>
                </input>
            </div>
            <button type="submit">Create new blog post</button>
        </form>
    </>
}

NewBlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default NewBlogForm