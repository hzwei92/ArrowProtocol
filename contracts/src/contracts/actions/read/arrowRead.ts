import { ContractResult, ArrowAction, ArrowState } from '../../types/types';

declare const ContractError;

export const arrowRead = async (state: ArrowState, { input: { id } }: ArrowAction): Promise<ContractResult> => {
  const arrow = state[id];

  if (!arrow) {
    throw new ContractError(`Creator with id: ${id} does not exist`);
  }

  return { result: arrow };
};
