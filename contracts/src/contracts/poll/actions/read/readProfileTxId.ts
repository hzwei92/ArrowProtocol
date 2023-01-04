import { ContractResult, PollAction, PollState } from '../../types';

declare const ContractError;

export const readProfile = async (
  state: PollState, 
  { caller }: PollAction
): Promise<ContractResult> => {
  const result = { profileTxId: state.addressToProfileTxId[caller] };
  return { result };
};
