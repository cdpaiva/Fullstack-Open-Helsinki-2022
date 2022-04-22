const dummy = (blog) => {
    return 1
}

const totalLikes = (blog) => {
    return blog.reduce((sum, blog) => sum += blog.likes, 0)
}

const favoriteBlog = (blog) => {
    if(blog.length===0) {
        return null
    }
    const favoriteComplete = blog.reduce((max, b) => b.likes > max.likes ? b : max)

    const pick = (obj, keys) => {
        return Object.assign({}, ...keys.map(k => ({[k]:obj[k]})))
    }
    return pick(favoriteComplete, ['title', 'author','likes'])
}

module.exports = { dummy, totalLikes, favoriteBlog }