import { ArrowAction, ArrowState, ContractResult } from '../../types';

declare const ContractError;

export const writeComments = async (
  state: ArrowState,
  { caller, input: { comments } }: ArrowAction
): Promise<ContractResult> => {
  comments.forEach((comment, i) => {
    const t = state.comments[i];
    if (t && comment.detailAddress === t.detailAddress) {
      t.x = comment.x;
      t.y = comment.y;
    }
  });
  return { state }; 
};
