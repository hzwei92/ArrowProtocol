import { readProfile } from './actions/read/readProfile';
import { register } from './actions/write/register';
import { writeTabs } from './actions/write/writeTabs';
import { ContractResult, JamnAction, JamnState } from './types';

declare const ContractError: any;

export async function handle(state: JamnState, action: JamnAction): Promise<ContractResult> {
  const input = action.input;

  switch (input.function) {
    case 'register':
      return await register(state, action);
    case 'readProfile': 
      return await readProfile(state, action);
    case 'writeTabs':
      return await writeTabs(state, action);
    default:
      throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
  }
}
