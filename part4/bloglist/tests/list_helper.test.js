const listHelper = require('../utils/list_helper')

const singleBlog = [{
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 1,
    __v: 0
}]

const blogs = [{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
},
{
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 20,
    __v: 0
},
{
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 20,
    __v: 0
},
{
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
},
{
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
},
{
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 3,
    __v: 0
}]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('can sum likes for a single blog', () => {
        const totalLikes = listHelper.totalLikes(singleBlog)
        expect(totalLikes).toBe(1)
    })

    test('can sum likes for several blog posts', () => {
        const totalLikes = listHelper.totalLikes(blogs)
        expect(totalLikes).toBe(60)
    })

    test('returns 0 for an empty list of blogs', () => {
        const totalLikes = listHelper.totalLikes([])
        expect(totalLikes).toBe(0)
    })
})

describe('favorite blog', () => {
    test('returns the correct blog for a list of several blogs', () => {
        const favoriteBlog = listHelper.favoriteBlog(blogs)

        const expectedFavorite = {
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            likes: 20
        }
        expect(favoriteBlog).toEqual(expectedFavorite)
    })

    test('picks first top liked blog when there is a tie', () => {
        const expectedFavorite = {
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            likes: 20
        }

        const favorite = listHelper.favoriteBlog(blogs)
        expect(favorite).toEqual(expectedFavorite)
    })

    test('can pick favorite for a list with a single item', () => {
        const expectedFavorite = {
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            likes: 1
        }
        const favorite = listHelper.favoriteBlog(singleBlog)
        expect(favorite).toEqual(expectedFavorite)
    })

    test('return null for an empty list of blogs', () => {
        const favorite = listHelper.favoriteBlog([])
        expect(favorite).toBeNull()
    })
})

describe('author with most blogs', () => {
    test('can pick the author with the highest number of blogs', () => {
        const mostBlogsAuthor = listHelper.mostBlogs(blogs)
        expect(mostBlogsAuthor).toEqual({author: 'Robert C. Martin', blogs: 3})
    })
})

describe('highest number of likes', () => {
    test('can determine the author with the most likes', () => {
        const mostLikedAuthor = listHelper.mostLikes(blogs)
        expect(mostLikedAuthor).toEqual({author: 'Edsger W. Dijkstra', likes: 40})
    })
})