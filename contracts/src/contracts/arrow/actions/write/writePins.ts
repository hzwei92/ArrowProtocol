import { ArrowAction, ArrowState, ContractResult } from '../../types';

declare const ContractError;

export const writePins = async (
  state: ArrowState,
  { caller, input: { pins } }: ArrowAction
): Promise<ContractResult> => {
  pins.forEach((pin, i) => {
    const t = state.pins[i];
    if (t && pin.txId === t.txId) {
      t.x = pin.x;
      t.y = pin.y;
      t.isExpanded = pin.isExpanded
    }
  });
  return { state }; 
};
