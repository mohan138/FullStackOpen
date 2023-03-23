import React from 'react'
import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Anecdote = ({ text, vote }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {vote} votes</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Winner = ({ anecdotes, vote }) => {
  const arr: number[] = Object.values(vote);
  let highestVoted = Math.max(...arr);
  const indexOfHighestVoted = arr.indexOf(highestVoted);
  return (
    <div>
      <Header text="Anecdote with most votes" />
      <p>{anecdotes[indexOfHighestVoted]}</p>
    </div>
  )
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(8).fill(0));

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const giveVote = () => {
    const newVotes = { ...vote };
    newVotes[selected]++;
    setVote(newVotes);
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} vote={vote[selected]} />
      <Button handleClick={giveVote} text="vote" />
      <Button handleClick={nextAnecdote} text="next anecdote" />
      <Winner anecdotes={anecdotes} vote={vote} />
    </div>
  )
}

export default App