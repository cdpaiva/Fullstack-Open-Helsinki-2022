import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({ good, bad, neutral }) => {
  let all = good + neutral + bad
  let average = (good - bad) / all
  average = average.toFixed(2)
  let positive = Math.round((good / all) * 100)

  if (all === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <tr>
            <StatisticsLine name="good" value={good} />
          </tr>
          <tr>
            <StatisticsLine name="neutral" value={neutral} />
          </tr>
          <tr>
            <StatisticsLine name="bad" value={bad} />
          </tr>
          <tr>
            <StatisticsLine name="all" value={all} />
          </tr>
          <tr>
            <StatisticsLine name="average" value={average} />
          </tr>
          <tr>
            <StatisticsLine name="positive" value={positive} isPercentual="true" />
          </tr>
        </tbody>
      </table>
    </>
  )
}

const StatisticsLine = ({ name, value, isPercentual }) => {
  const formattedValue = `${value} ${isPercentual ? '%' : ''}`
  return (
    <>
      <td>{name}</td>
      <td>{formattedValue}</td>
    </>
  )
}

const App = () => {
  //save clicks on each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  if (good + neutral + bad === 0) {
    return (
      <div>
        <h2>Give feedback</h2>
        <Button handleClick={() => setGood(good + 1)} text="Good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="Bad" />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    )
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
