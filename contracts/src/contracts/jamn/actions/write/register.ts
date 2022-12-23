import { JamnAction, JamnState, ContractResult, Profile } from '../../types';

declare const ContractError;

export const register = async (
  state: JamnState,
  { caller, input: { name, color, description, date } }: JamnAction
): Promise<ContractResult> => {
  if (state.addressToProfileI[caller] !== undefined) {
    throw new ContractError(`Caller already registered`);
  }
  const profile: Profile = {
    address: caller,
    name,
    description,
    color,
    tabs: [...state.defaultTabs],
    pointBalance: 0,
    createDate: date,
    updateDate: date,
    deleteDate: null,
  };
  state.addressToProfileI[caller] = state.profiles.length;
  state.profiles.push(profile);
  return { state }; 
};
