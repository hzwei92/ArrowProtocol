import { ArrowAction, ArrowState, ContractResult } from '../../types';

declare const ContractError;

export const writeCommentIs = async (
  state: ArrowState,
  { caller, input: { commentIs } }: ArrowAction
): Promise<ContractResult> => {
  // TODO authorize via role.permits

  const iToTrue = {};
  const hasDuplicate = commentIs.some(commentI => {
    if (iToTrue[commentI]) {
      return true;
    }
    iToTrue[commentI] = true;
    return false
  });
  if (hasDuplicate) {
    throw new ContractError('Duplicate commentI found')
  }

  state.commentIs = commentIs;
  return { state }; 
};
