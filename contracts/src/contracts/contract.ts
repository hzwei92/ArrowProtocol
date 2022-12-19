import { arrowRead } from './actions/read/arrowRead';
import { arrowWrite } from './actions/write/arrowWrite';
import { ContractResult, ArrowAction, ArrowState } from './types/types';

declare const ContractError;

export async function handle(state: ArrowState, action: ArrowAction): Promise<ContractResult> {
  const input = action.input;

  switch (input.function) {
    case 'arrowWrite':
      return await arrowWrite(state, action);
    case 'arrowRead':
      return await arrowRead(state, action);
    default:
      throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
  }
}
