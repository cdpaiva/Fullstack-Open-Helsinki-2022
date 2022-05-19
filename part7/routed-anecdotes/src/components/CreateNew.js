import { useNavigate } from "react-router-dom"
import { useForm } from "../hooks/useForm"

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  const navigate = useNavigate()
  const content = useForm('text')
  const info = useForm('text')
  const author = useForm('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setNotification(`New note ${content.value} has been created`)
    setTimeout(() => props.setNotification(""),3000)
    navigate('/')
  }

  const handleReset = () => {
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew