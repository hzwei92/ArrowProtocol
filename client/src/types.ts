import { ArrowState } from "./warp/arrow/types";

export type IdToType<T> = {
  [id: string]: T;
}

export type Arrow = {
  txId: string;
  focusI: number;
  commentIToDescIToTrue: IdToType<IdToType<true>>;
  state: ArrowState;
}

export type Cursor = {
  x: number;
  y: number;
}

export type Drag = {
  isScreen: boolean;
  commentI: number | null;
  targetCommentI: number | null;
}

export type PendingLink = {
  sourceCommentI: number | null;
  targetCommentI: number | null;
}

export enum Mode {
  PORTAL = 'PORTAL',
  PROFILE = 'PROFILE',
  EXPLORER = 'EXPLORER',
  CONTACTS = 'CONTACTS',
  MAP = 'MAP',
  ABOUT = 'ABOUT',
}

export type ExplorerSlice = {
  originalQuery: string;
  query: string;
  entryIds: string[];
}

export type Entry = {
  id: string;
  userId: string;
  arrowTxId: string;
  showIns: boolean;
  showOuts: boolean;
  inIds: string[];
  outIds: string[];
  parentEntryId: string | null;
  sourceEntryId: string | null;
  targetEntryId: string | null;
  shouldRefreshArrow?: boolean;
  shouldGetLinks?: boolean;
  isDeleted?: boolean;
  bonusText?: string[];
}
