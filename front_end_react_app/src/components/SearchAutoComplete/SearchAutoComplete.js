import React from 'react';

function SearchAutoComplete (props) {
  const { searchResults, handleSelection } = props
  return (
    <ul>
      {searchResults &&
        searchResults.map((sym, i) => (
          <li key={i} id={sym["1. symbol"]} onClick={handleSelection}>
            {sym["1. symbol"]}  {sym["2. name"]}
          </li>
        ))}
    </ul>
  )
}

export default SearchAutoComplete
