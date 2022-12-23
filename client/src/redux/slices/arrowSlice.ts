import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Arrow, IdToType } from '../../types';

interface ArrowState {
  frameTxId: string | null;
  txIdToArrow: IdToType<Arrow>
}

const initialState: ArrowState = {
  frameTxId: null,
  txIdToArrow: {},
}

export const arrowSlice = createSlice({
  name: 'arrow',
  initialState,
  reducers: {
    setFrameTxId: (state, action: PayloadAction<string>) => {
      state.frameTxId = action.payload;
    },
    mergeArrows: (state, action: PayloadAction<Arrow[]>) => {
      action.payload.forEach(arrow => {
        state.txIdToArrow[arrow.txId] = arrow;
      });
    },
  },
})

export const { setFrameTxId,  mergeArrows } = arrowSlice.actions

export const selectFrameTxId = (state: RootState) => state.arrow.frameTxId

export const selectTxIdToArrow = (state: RootState) => state.arrow.txIdToArrow

export const selectFrame = (state: RootState): Arrow | null => state.arrow.frameTxId
  ? state.arrow.txIdToArrow[state.arrow.frameTxId]
  : null;

export const selectArrowByTxId = createSelector([
  selectTxIdToArrow,
  (_: RootState, txId: string) => txId,
], (txIdToArrow, txId) => txIdToArrow[txId]);

export default arrowSlice.reducer