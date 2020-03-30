import React from 'react'
import './SearchAutoComplete.css'

function SearchAutoComplete (props) {
  const { searchResults, handleSelection } = props
  return (
    <ul className='search-list-container'>
      {searchResults &&
        searchResults.map((sym, i) => (
          <li
            key={i}
            className='search-list-item'
            id={sym['1. symbol']}
            onClick={handleSelection}
          >
            {sym['1. symbol']} {sym['2. name']}
          </li>
        ))}
    </ul>
  )
}

export default SearchAutoComplete
