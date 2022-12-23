import { ContractResult, JamnAction, JamnState } from '../../types';

declare const ContractError;

export const readProfile = async (
  state: JamnState, 
  { caller }: JamnAction
): Promise<ContractResult> => {
  const i = state.addressToProfileI[caller];
  if (i === undefined) {
    throw new ContractError(`Caller not registered`);
  }
  const result = { profile: state.profiles[i] };
  return { result };
};
