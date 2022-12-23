import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Twig } from '../../warp/arrow/types'

interface TwigState {
}

const initialState: TwigState = {
}

export const twigSlice = createSlice({
  name: 'twig',
  initialState,
  reducers: {
  },
})

export const {  } = twigSlice.actions

// export const selectFrameTxId = (state: RootState) => state.twig.frameTxId
// export const selectIdToTwig = (state: RootState) => state.twig.idToTwig

export default twigSlice.reducer