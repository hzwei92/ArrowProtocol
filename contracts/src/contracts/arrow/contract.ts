import { createPin } from './actions/write/createPin';
import { writePins } from './actions/write/writePins';
import { writeDraftAndText } from './actions/write/writeDraftAndText';
import { ContractResult, ArrowAction, ArrowState } from './types';
import { writePinIs } from './actions/write/writePinIs';

declare const ContractError: any;

export async function handle(state: ArrowState, action: ArrowAction): Promise<ContractResult> {
  const input = action.input;

  switch (input.function) {
    case 'createPin':
      return await createPin(state, action);
    case 'writePins': 
      return await writePins(state, action);
    case 'writePinIs': 
      return await writePinIs(state, action);
    case 'writeDraftAndText':
      return await writeDraftAndText(state, action);
    default:
      throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
  }
}
