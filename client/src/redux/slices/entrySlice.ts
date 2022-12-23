import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Entry, IdToType } from '../../types';

interface EntryState {
  idToEntry: IdToType<Entry>
}

const initialState: EntryState = {
  idToEntry: {},
}

export const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {
    mergeEntries: (state, action: PayloadAction<Entry[]>) => {
      action.payload.forEach(entry => {
        state.idToEntry[entry.id] = entry;
      });
    },
  },
})

export const { mergeEntries } = entrySlice.actions;

export const selectIdToEntry = (state: RootState) => state.entry.idToEntry;

export const selectEntryById = createSelector([
  selectIdToEntry,
  (_: RootState, id: string) => id,
], (idToEntry, id) => idToEntry[id]);

export default entrySlice.reducer