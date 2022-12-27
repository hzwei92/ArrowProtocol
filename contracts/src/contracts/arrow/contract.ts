import { createComment } from './actions/write/createComment';
import { writeComments } from './actions/write/writeComments';
import { writeDraftAndText } from './actions/write/writeDraftAndText';
import { ContractResult, ArrowAction, ArrowState } from './types';

declare const ContractError: any;

export async function handle(state: ArrowState, action: ArrowAction): Promise<ContractResult> {
  const input = action.input;

  switch (input.function) {
    case 'createComment':
      return await createComment(state, action);
    case 'writeComments': 
      return await writeComments(state, action);
    case 'writeDraftAndText':
      return await writeDraftAndText(state, action);
    default:
      throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
  }
}
