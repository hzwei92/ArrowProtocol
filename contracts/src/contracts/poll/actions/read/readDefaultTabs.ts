import { ContractResult, PollAction, PollState } from '../../types';

declare const ContractError;

export const readDefaultTabs = async (
  state: PollState, 
): Promise<ContractResult> => {
  const result = { defaultTabs: state.defaultTabs };
  return { result };
};
