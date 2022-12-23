import { ArrowState } from "./warp/arrow/types";

export type IdToType<T> = {
  [id: string]: T;
}

export type Arrow = {
  txId: string;
  focusI: number;
  twigIToDescIToTrue: IdToType<IdToType<true>>;
  state: ArrowState;
}

export type Cursor = {
  x: number;
  y: number;
}

export type Drag = {
  isScreen: boolean;
  twigI: number | null;
  targetTwigI: number | null;
}