/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react'

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync, onCancleDecrement }) =>
      <div>
        <button onClick={onIncrement}>
          Increment
        </button>
        {' '}
        <button onClick={onDecrement}>
          Decrement
        </button>
        {'    '}
        <button onClick={onIncrementAsync}>
          Increment 1 after 1000ms
        </button>
         {'   '}
        <button onClick={onCancleDecrement}>
          right now Cancle Decrement
        </button>
        <hr />
        <div>
          Clicked: {value} times
        </div>
      </div>


export default Counter
