import { ContractResult, ArrowAction, ArrowState } from '../../types';

export const arrowRead = async (state: ArrowState, { input }: ArrowAction): Promise<ContractResult> => {
  return { result: null };
};
