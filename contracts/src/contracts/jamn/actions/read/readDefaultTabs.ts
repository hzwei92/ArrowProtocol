import { ContractResult, JamnAction, JamnState } from '../../types';

declare const ContractError;

export const readDefaultTabs = async (
  state: JamnState, 
): Promise<ContractResult> => {
  const result = { defaultTabs: state.defaultTabs };
  return { result };
};
