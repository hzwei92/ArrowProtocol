import { ArrowAction, ArrowState, ContractResult } from '../../types/types';

declare const ContractError;

export const arrowWrite = async (
  state: ArrowState,
  { caller, input: { name } }: ArrowAction
): Promise<ContractResult> => {

  if (!name) {
    throw new ContractError(`Creator must provide a name.`);
  }

  if (state[caller]) {
    throw new ContractError(`Creator already added.`)
  }

  state[caller] = name

  return { state };
};
