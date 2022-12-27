import { ArrowAction, ArrowState, ContractResult, Pin } from '../../types';

declare const ContractError: any;

export const createPin = async (
  state: ArrowState,
  {caller, input: { txId, parentPinI, sourcePinI, targetPinI, x, y, date }}: ArrowAction
): Promise<ContractResult> => {
  if (!txId) {
    throw new ContractError(`No txId supplied`);
  }
  if (x === undefined || x === null) {
    throw new ContractError(`No x supplied`);
  }
  if (y === undefined || y === null) {
    throw new ContractError(`No y supplied`);
  }
  if (!date) {
    throw new ContractError(`No date supplied`);
  }

  const pin: Pin = {
    creatorAddress: caller,
    txId,
    parentPinI,
    sourcePinI,
    targetPinI,
    x,
    y,
    isExpanded: true,
    createDate: date,
    updateDate: date,
    deleteDate: null,
  };

  state.pinIs.push(state.pins.length);
  state.pins.push(pin);

  return { state }; 
};
