import { ArrowAction, ArrowState, ContractResult, Comment } from '../../types';

declare const ContractError: any;

export const createComment = async (
  state: ArrowState,
  {caller, input: { detailAddress, parentCommentI, sourceCommentI, targetCommentI, x, y, date }}: ArrowAction
): Promise<ContractResult> => {
  if (!detailAddress) {
    throw new ContractError(`No detailAddress supplied`);
  }
  if (x === undefined || x === null) {
    throw new ContractError(`No x supplied`);
  }
  if (y === undefined || y === null) {
    throw new ContractError(`No y supplied`);
  }
  if (!date) {
    throw new ContractError(`No date supplied`);
  }

  const comment: Comment = {
    creatorAddress: caller,
    detailAddress,
    parentCommentI,
    sourceCommentI,
    targetCommentI,
    x,
    y,
    createDate: date,
    updateDate: date,
    deleteDate: null,
  };

  state.commentIs.push(state.comments.length);
  state.comments.push(comment);

  return { state }; 
};