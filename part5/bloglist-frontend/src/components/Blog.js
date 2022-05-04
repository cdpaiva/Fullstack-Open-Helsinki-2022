import { useState } from "react"
import PropTypes from "prop-types";

const Blog = ({ blog, addLike, removeBlog }) => {

  const [visible, setVisible] = useState(false)

  const userJSON = window.localStorage.getItem('loggedBloglistUser')
  const user = JSON.parse(userJSON)

  const blogStyle = {
    padding: 5,
    marginBottom: 5,
    border: 'solid',
    borderWidth: 1
  }

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

  const userIsAuthor = () => {
    return blog.user.name === user.name
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
        <button onClick={handleLike}>Like</button>
      </p>
      <p>
        {blog.user.name}
      </p>
      {userIsAuthor()
        ? <button onClick={handleDelete}>Remove</button>
        : null
      }
    </div>
  )

  return <div style={blogStyle}>
    {blog.title} {blog.author}
    <button onClick={() => setVisible(!visible)}>
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