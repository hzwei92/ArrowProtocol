import { readDefaultTabs } from './actions/read/readDefaultTabs';
import { readProfile } from './actions/read/readProfileTxId';
import { registerProfile } from './actions/write/registerProfile';
import { ContractResult, PollAction, PollState } from './types';

declare const ContractError: any;

export async function handle(state: PollState, action: PollAction): Promise<ContractResult> {
  const input = action.input;

  switch (input.function) {
    case 'registerProfile':
      return await registerProfile(state, action);
    case 'readDefaultTabs':
      return await readDefaultTabs(state);
    case 'readProfileTxId': 
      return await readProfile(state, action);
    default:
      throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
  }
}
