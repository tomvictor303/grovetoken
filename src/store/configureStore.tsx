import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import mainReducer from './slices/main.slice';
import snackbarReducer from './slices/snackbar.slice';
import backdropReducer from './slices/backdrop.slice';

const rootReducer = combineReducers({
    main: mainReducer,
    snackbar: snackbarReducer,
    backdrop: backdropReducer,
});

const makeStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }),
});

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
