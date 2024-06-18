import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { id2item, push_non_duplicate, push_non_duplicate_id } from 'src/utils/custom'

export type MainSliceState = {
  // primary
  taskStore: Array<any>,
};

const initialState: MainSliceState = {
  // primary
  taskStore: [],
};

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        // primary
        setTaskStore(state, action: PayloadAction<Array<any>>) {
            let tasks: Array<any> = action.payload;
            state.taskStore = tasks;
        },
    },
});

export const {
  // primary
  setTaskStore,
} = mainSlice.actions;

export default mainSlice.reducer;
