import { createTwig } from './actions/write/createTwig';
import { writeTwigs } from './actions/write/writeTwigs';
import { ContractResult, ArrowAction, ArrowState } from './types';

declare const ContractError: any;

export async function handle(state: ArrowState, action: ArrowAction): Promise<ContractResult> {
  const input = action.input;

  switch (input.function) {
    case 'createTwig':
      return await createTwig(state, action);
    case 'writeTwigs': 
      return await writeTwigs(state, action);
    default:
      throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
  }
}
