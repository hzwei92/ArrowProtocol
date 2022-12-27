import { ArrowAction, ArrowState, ContractResult } from '../../types';

declare const ContractError;

export const writeDraftAndText = async (
  state: ArrowState,
  { caller, input: { draft, text, date } }: ArrowAction
): Promise<ContractResult> => {
  if (caller !== state.creatorAddress) {
    throw new ContractError('Only the creator can write draft and text');
  }
  state.draft = draft;
  state.text = text;
  state.updateDate = date
  return { state }; 
};
