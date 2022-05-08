import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

test('<NewBlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<NewBlogForm createBlog={createBlog}/>)

    const titleInput = screen.getByLabelText('Title')
    await user.type(titleInput, 'title-test')
    const authorInput = screen.getByLabelText('Author')
    await user.type(authorInput, 'author-test')
    const urlInput = screen.getByLabelText('URL')
    await user.type(urlInput, 'url-test')

    const sendButton = screen.getByText('Create new blog post')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    console.log(createBlog.mock.calls)
    expect(createBlog.mock.calls[0][0]).toEqual({ title: 'title-test', author: 'author-test', url: 'url-test' })
})