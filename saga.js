
import { delay } from 'redux-saga';
import { put, takeEvery, all, call, takeLatest, fork,  cancel, take } from 'redux-saga/effects'


export function* startSaga() {
    console.log('启动 Saga!');
    
}
// redux-saga

export function* incrementAsync() {
    yield call(delay, 1000);
    yield put({ type: 'INCREMENT' });  // putResovle
    const a = yield 20;
    console.log('a:', a);
}

export function* decrementAsync() {
    yield call(delay, 3000);
    yield put({ type: 'DECREMENT' });
}


function* setTimeOutDecrement(time) {
    yield call(delay, time);
    yield put({ type: 'DECREMENT' });
    console.log('DECREMENT:');
}

// fork 类似于 call，可以用来调用普通函数和 Generator 函数。不过，fork 的调用是非阻塞的，Generator 不会在等待 fn 返回结果的时候被 middleware 暂停；恰恰相反地，它在 fn 被调用时便会立即恢复执行。
//fork，以及 race，都是用于管理 Saga 间并发。
export function* cancleDecrement() {
    const  dataResult = yield fork(setTimeOutDecrement, 3000);
    yield take('CACLE_DECRMENT_SAGE');
    console.log('dataResult:', dataResult);
    yield cancel(dataResult);
}




export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_SAGA_ASYNC', incrementAsync);
}

// export function* watchDecrementAsync() {
//     yield takeLatest('DECREMENT_SAGA_ASYNC', decrementAsync);
// }

export function* watchCacleDecrement() {
    yield takeEvery('DECREMENT_SAGA_ASYNC', cancleDecrement);
}



export default function* rootSage() {
    yield all([
        startSaga(),
        watchIncrementAsync(),
        // watchDecrementAsync(),
        watchCacleDecrement(),
    ]);
}