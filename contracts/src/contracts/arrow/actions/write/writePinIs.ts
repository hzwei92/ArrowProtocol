import { ArrowAction, ArrowState, ContractResult } from '../../types';

declare const ContractError;

export const writePinIs = async (
  state: ArrowState,
  { caller, input: { pinIs } }: ArrowAction
): Promise<ContractResult> => {
  // TODO authorize via role.permits

  const iToTrue = {};
  const hasDuplicate = pinIs.some(pinI => {
    if (iToTrue[pinI]) {
      return true;
    }
    iToTrue[pinI] = true;
    return false
  });
  if (hasDuplicate) {
    throw new ContractError('Duplicate pinI found')
  }

  state.pinIs = pinIs;
  
  return { state }; 
};
