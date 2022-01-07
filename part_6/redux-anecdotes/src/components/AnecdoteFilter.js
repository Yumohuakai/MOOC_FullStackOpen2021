import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'
// import { useDispatch } from 'react-redux'

// const AnecdoteFilter = () => {
//   const dispatch = useDispatch()

//   const handleChange = (event) => {
//     // input-field value is in variable event.target.value
//     dispatch(filterChange(event.target.value))    
//   }
//   const style = {
//     marginBottom: 10
//   }

//   return (
//     <div style={style}>
//       filter <input onChange={handleChange} />
//     </div>
//   )
// }

// export default AnecdoteFilter

const AnecdoteFilter = (props) => {

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    props.filterChange(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterChange,
}

const ConnectedAnecdoteFilter = connect(
  null,
  mapDispatchToProps
)(AnecdoteFilter)

export default ConnectedAnecdoteFilter