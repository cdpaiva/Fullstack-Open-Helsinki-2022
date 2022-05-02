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

const mostBlogs = (blogs) => {
    const histogram = {}

    blogs.map(blog => {
        if(histogram[blog.author]){
            histogram[blog.author]++
        } else {
            histogram[blog.author] = 1
        }
    })

    let maxCount = 0
    let topAuthor = ''
    for (let author in histogram) {
        if(histogram[author] > maxCount) {
            maxCount = histogram[author]
            topAuthor = author
        }
    }
    return {
        author: topAuthor,
        blogs: maxCount
    }
}

const mostLikes = (blogs) => {
    const histogram = {}

    blogs.map(blog => {
        if(histogram[blog.author]){
            histogram[blog.author] += blog.likes
        } else {
            histogram[blog.author] = blog.likes
        }
    })

    let maxCount = 0
    let topAuthor = ''
    for (let author in histogram) {
        if(histogram[author] > maxCount) {
            maxCount = histogram[author]
            topAuthor = author
        }
    }
    return {
        author: topAuthor,
        likes: maxCount
    }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }