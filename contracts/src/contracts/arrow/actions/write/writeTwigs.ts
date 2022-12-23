import { ArrowAction, ArrowState, ContractResult } from '../../types';

declare const ContractError;

export const writeTwigs = async (
  state: ArrowState,
  { caller, input: { twigs } }: ArrowAction
): Promise<ContractResult> => {
  twigs.forEach((twig, i) => {
    const t = state.twigs[i];
    if (t && twig.detailAddress === t.detailAddress) {
      t.x = twig.x;
      t.y = twig.y;
    }
  });
  return { state }; 
};
