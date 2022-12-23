import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ExplorerSlice } from '../../types'

interface ExplorerState {
  stack: ExplorerSlice[];
  index: number;
}

const initialState: ExplorerState = {
  stack: [{
    originalQuery: '',
    query: '',
    entryIds: [],
  }],
  index: 0,
}

export const explorerSlice = createSlice({
  name: 'explorer',
  initialState,
  reducers: {
    goBack: (state) => {
      const stack = [...state.stack];
      const query = stack[state.index - 1].originalQuery;
      stack.splice(state.index - 1, 1, {
        ...stack[state.index - 1],
        query,
      });
      return {
        ...state,
        stack,
        index: state.index - 1,
      };
    },
    goForward: (state) => {
      const stack = [...state.stack];
      const query = stack[state.index + 1].originalQuery;
      stack.splice(state.index + 1, 1, {
        ...stack[state.index + 1],
        query,
      });
      return {
        ...state,
        stack,
        index: state.index + 1,
      };
    },
    pushSlice: (state, action: PayloadAction<ExplorerSlice>) => {
      const stack = state.stack.slice(0, state.index + 1);
      stack.push(action.payload);
      return {
        ...state,
        stack,
        index: state.index + 1,
      };
    },
    spliceSlice: (state, action: PayloadAction<ExplorerSlice>) => {
      const stack = [...state.stack];
      stack.splice(state.index, 1, action.payload);
      return {
        ...state, 
        stack,
      };
    },
  },
})

export const { goBack, goForward, pushSlice, spliceSlice } = explorerSlice.actions

export const selectStack = (state: RootState) => state.explorer.stack;
export const selectIndex = (state: RootState) => state.explorer.index;

export const selectSlice = createSelector([
  selectStack,
  selectIndex,
], (stack, index) => stack[index]);

export default explorerSlice.reducer