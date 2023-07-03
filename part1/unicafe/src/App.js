import {useState} from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text="good" />
      <Button handleClick={increaseNeutral} text="neutral" />
      <Button handleClick={increaseBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistics = ({good, bad, neutral}) => {
  if ((good + bad + neutral) > 0) {
    return (
      <div>
        <table>
        <StatisticsLine text="good" value={good} per="" />
        <StatisticsLine text="neutral" value={neutral} per="" />
        <StatisticsLine text="bad" value={bad} per="" />
        <StatisticsLine text="all" value={good + bad + neutral} per="" />
        <StatisticsLine text="average" value={((good * 1) + (neutral * 0) + (bad * -1)) / (good + neutral + bad)} per="" />
        <StatisticsLine text="positive" value={((good) * 100) / (good + bad + neutral)} per="%" />
        </table>
      </div>
    )
  }
  return <div><p>No feedback given</p></div> 
}

const StatisticsLine = ({text, value, per}) => {
  return (
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value} {per}</td>
        </tr>
      </tbody>
  )
}

export default App