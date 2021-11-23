import React, { useState } from 'react'

const Header = ({info}) => {
  return (
    <>
      <h1> {info} </h1>
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

const StatisticsNone = ({text}) => {
  return (
    <div>
      <Header info='Statistics' />
      <div> {text} </div>
    </div>
  )
}

const StatisticsTableLine = ({text, num}) => {  
  if (text === 'Positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{num} %</td>
      </tr>
    )  
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{num}</td>
    </tr>
  )  
}

const StatisticsTable = ({good, bad, neutral, all}) => {
  return (
    <div>
      <Header info='Statistics' />
      <table>
        <tbody>
          <StatisticsTableLine text='Good' num={good}/>
          <StatisticsTableLine text='Neutral' num={neutral}/>
          <StatisticsTableLine text='Bad' num={bad}/>
          <StatisticsTableLine text='All' num={all}/>
          <StatisticsTableLine text='Average' num={(good - bad) / all}/>
          <StatisticsTableLine text='Positive' num={good / all *100}/>
        </tbody>        
      </table>
    </div>    
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

 const handleBadClick = () => {
    setBad(bad + 1)
  }

  let all = good + neutral + bad
  //display this part, when feedback has not yet been gathered
  if (all === 0) {
    return (
      <>
        <Header info='Give feedback' />
        <Button handleClick={handleGoodClick} text='Good' />
        <Button handleClick={handleNeutralClick} text='Neutral' />
        <Button handleClick={handleBadClick} text='Bad' />  
        
        <StatisticsNone text='No feedback given'/>
      </>
    )
  }
  //display this part, when feedback has been gathered
  return (
    <>
      <Header info='Give feedback' />
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />

      <StatisticsTable good={good} neutral={neutral} bad={bad} all={all}/>
    </>
  )
} 

export default App

