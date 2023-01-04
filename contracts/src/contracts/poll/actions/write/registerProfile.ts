import { PollAction, PollState, ContractResult } from '../../types';

declare const ContractError;

export const registerProfile = async (
  state: PollState,
  { caller, input: { profileTxId } }: PollAction
): Promise<ContractResult> => {
  if (state.addressToProfileTxId[caller] !== undefined) {
    throw new ContractError(`Caller already registered`);
  }
  state.addressToProfileTxId[caller] = profileTxId;
  return { state }; 
};
