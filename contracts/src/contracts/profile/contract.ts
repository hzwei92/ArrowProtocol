import { writeTabs } from "./actions/write/writeTabs";
import { ContractResult, ProfileAction, ProfileState } from "./types";

declare const ContractError: any;

export async function handle(state: ProfileState, action: ProfileAction): Promise<ContractResult> {
  const input = action.input;

  switch (input.function) {
    case 'writeTabs':
      return await writeTabs(state, action);
    default:
      throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
  }
}
