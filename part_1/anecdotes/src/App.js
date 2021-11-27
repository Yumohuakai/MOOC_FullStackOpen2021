import React, { useState } from 'react'

const Header = ({info}) => {
  return (
    <>
      <h1> {info} </h1>
    </>
  )
}

const Anecdote = ({info}) => {
  return (
    <>
      <div> {info} </div>
    </>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0))

  // console.log('Original points: ', points)


  // to generate a random number
  const getRandomInt = (num) => {
    return Math.floor(Math.random() * num)
  }

  // to set a random state by giving the bound number (the length of anecdotes) for displaying random anecdotes later
  const handleSelectedClick = () => {
    setSelected(getRandomInt(anecdotes.length))
  }

  console.log('the random num: ', selected)

  // to store the votes of each anecdote into point-array
  const handleVotedClick = () => { 
    const newPoints = [...points]
    newPoints[selected.toString()] += 1
    setPoints(newPoints)
  }

  console.log('Voting result: ', points)
  
  //to find maximum voting point:
  let maxPoint = Math.max(...points)
  
  console.log('MAX vote point: ', maxPoint)  

  //2nd method to find the key of max-value in the array
  const maxkeytest = Object.entries(points).find(([key, value]) => value === maxPoint ? key : null)  

  // reminding user to vote, if none of anecdote is voted
  if (maxkeytest[1] === 0) {
    return (
      <>
        <Header info='Anecdote of the day' />
        <Anecdote info={anecdotes[selected]} />
        <div> has {points[selected]} vote(s)</div>
        <Button handleClick={handleVotedClick} text='Vote' />
        <Button handleClick={handleSelectedClick} text='Next anecdote' />
        <Header info='Anecdote with most votes' />
        <Anecdote info='please vote ...' />
      </>
    )
  }
  console.log('MAX vote (maxkeytest): ', anecdotes[maxkeytest[0]]) 


  //1st method to find the key of max-value in the array by using for-loop
  // let maxkey = 0
  // reminding user to vote, if none of anecdote is voted
  // if (maxPoint === 0) {
  //   return (
  //     <>
  //       <Header info='Anecdote of the day' />
  //       <Anecdote info={anecdotes[selected]} />
  //       <div> has {points[selected]} vote(s)</div>
  //       <Button handleClick={handleVotedClick} text='Vote' />
  //       <Button handleClick={handleSelectedClick} text='Next anecdote' />
  //       <Header info='Anecdote with most votes' />
  //       <Anecdote info='please vote ...' />
  //     </>
  //   )
  // } else {
  //   for (let i=0; i<anecdotes.length; i++ ){
  //     if (points[i] === maxPoint) {
  //       maxkey = i
  //       console.log('MAX vote: ', anecdotes[maxkey]) 
  //     }
  //   }
  // }
 
  console.log('--------------------------------------------------')  

  return (
    <>
      <Header info='Anecdote of the day' />
      <Anecdote info={anecdotes[selected]} />
      <div> has {points[selected]} vote(s)</div>
      <Button handleClick={handleVotedClick} text='Vote' />
      <Button handleClick={handleSelectedClick} text='Next anecdote' />
      <Header info='Anecdote with most votes' />
      <Anecdote info={anecdotes[maxkeytest[0]]} />
    </>
  )
} 

export default App