import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { delay } from 'redux-saga';
import thunk from 'redux-thunk';

import Counter from './Counter'
import reducer from './reducers'
import rootSage from './saga';

const rootSageMiddleware = createSagaMiddleware(rootSage);
const store = createStore(reducer, compose(applyMiddleware(...[rootSageMiddleware, thunk])));

rootSageMiddleware.run(rootSage);

const action = type => store.dispatch({type})



// `reudx`的写法
const asyncAction = async (type) => {
  await delay(1000);
  return store.dispatch({type});
}

// redux-thunk的写法
export function setCountAsync() {
  return (dispatch, getState, extraArgument) => {
    // console.log('state:', getState());
    fetchData('user')(dispatch, getState);
  };
}


// fetchData
const fetchData = (user) => {
  // fetch data
  return (dispatch, getState) =>  setTimeout(() => {
    dispatch({ type: 'SET', payload: 100});
    console.log('state:', getState())
  },2000)
};


function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      // onIncrement={() => action('INCREMENT')}
      // onIncrement={() => asyncAction('INCREMENT')}
      onIncrement={() => setCountAsync()(store.dispatch)}
      // onIncrement={() => store.dispatch(setCountAsync())}
      onDecrement={() => action('DECREMENT_SAGA_ASYNC')}
      onIncrementAsync={() => action('INCREMENT_SAGA_ASYNC')}
      onCancleDecrement={() => action('CACLE_DECRMENT_SAGE')}
    />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
