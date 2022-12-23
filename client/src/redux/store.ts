import { configureStore } from '@reduxjs/toolkit';
import arrowSlice from './slices/arrowSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import entrySlice from './slices/entrySlice';
import explorerSlice from './slices/explorerSlice';

export const store = configureStore({
  reducer: {
    arrow: arrowSlice,
    entry: entrySlice,
    explorer: explorerSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

