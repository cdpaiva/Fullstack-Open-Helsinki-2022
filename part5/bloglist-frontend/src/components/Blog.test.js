import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
    title: 'blog-test',
    author: 'author-test',
    url: 'url-test',
    likes: 0,
    user: { name: 'username-test' }
}

const mockAdd = jest.fn()
const mockRemove = jest.fn()

test('renders content', () => {
    const { container } = render(<Blog blog={blog} addLike={mockAdd} removeBlog={mockRemove}/>)

    const element = container.querySelector('.blog-card')
    expect(element).toHaveTextContent('blog-test')
    expect(element).toHaveTextContent('author-test')
    expect(element).not.toHaveTextContent('url-test')
    expect(element).not.toHaveTextContent(0)
})

test('clicking show btn displays num of likes', async () => {
    render(<Blog blog={blog} addLike={mockAdd} removeBlog={mockRemove}/>)

    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)

    const element = screen.getByText('0')
    expect(element).toBeDefined()
})

test('two clicks result in two addLike calls', async () => {
    render(<Blog blog={blog} addLike={mockAdd} removeBlog={mockRemove}/>)

    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockAdd.mock.calls).toHaveLength(2)
})
