import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Types } from '.';
import { callApi } from '../../common/util/api';
import { makeFetchSaga } from '../../common/util/fetch';
import { actions } from '../state'

function* fetchUser({ name }) {
    const { isSuccess, data } = yield call(callApi, {
        url: '/user/search',
        params: { keyword: name },
    });
    if (isSuccess && data) {
        const user = data.find(item => item.name === name);
        if (user) {
            yield put(actions.setValue('user', user));
        }
    }
}

export default function* () {
    yield all([
        // takeEvery(Types.FetchUser, fetchUser)
        takeEvery(
            Types.FetchUser,
            makeFetchSaga({ fetchSaga: fetchUser, canCache: true }),
        ),
    ]);
}