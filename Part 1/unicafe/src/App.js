import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td> {value}</td>
    </tr>
  );
}

const Statistics = ({ value }) => {
  const average = (value.good - value.bad) / value.total;
  let positive = (value.good / value.total) * 100 + "%";
  if (value.total > 0)
    return (
      <table>
        <StatisticLine text={"good"} value={value.good} />
        <StatisticLine text={"neutral"} value={value.neutral} />
        <StatisticLine text={"bad"} value={value.bad} />
        <StatisticLine text={"all"} value={value.total} />
        <StatisticLine text={"average"} value={average} />
        <StatisticLine text={"positive"} value={positive} />
      </table>
    )
}

const App = () => {
  const [rating, setRating] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0
  })

  const Click = (direction) => () => {
    if (direction === "good") {
      setRating({ ...rating, good: rating.good + 1, total: rating.total + 1 });
    }
    else if (direction === "neutral") {
      setRating({ ...rating, neutral: rating.neutral + 1, total: rating.total + 1 });
    }
    else if (direction === "bad") {
      setRating({ ...rating, bad: rating.bad + 1, total: rating.total + 1 });
    }
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={Click("good")} text="good" />
      <Button handleClick={Click("neutral")} text="neutral" />
      <Button handleClick={Click("bad")} text="bad" />
      <h1>statistics</h1>
      <Statistics value={rating} />
    </div>
  )
}

export default App