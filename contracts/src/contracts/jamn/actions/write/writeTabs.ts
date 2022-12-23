import { JamnAction, JamnState, ContractResult } from '../../types';

declare const ContractError;

export const writeTabs = async (
  state: JamnState,
  { caller, input: { tabs } }: JamnAction
): Promise<ContractResult> => {
  const i = state.addressToProfileI[caller];
  if (i === undefined) {
    throw new ContractError(`Caller not registered`);
  }
  state.profiles[i].tabs = tabs;
  return { state }; 
};
