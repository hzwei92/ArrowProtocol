import { ProfileAction, ProfileState, ContractResult } from '../../types';

declare const ContractError;

export const writeTabs = async (
  state: ProfileState,
  { caller, input: { tabs } }: ProfileAction
): Promise<ContractResult> => {
  state.tabs = tabs;
  return { state }; 
};
