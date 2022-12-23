import { ArrowAction, ArrowState, ContractResult, Twig } from '../../types';

declare const ContractError: any;

export const createTwig = async (
  state: ArrowState,
  {caller, input: { detailAddress, parentTwigI, sourceTwigI, targetTwigI, x, y, date }}: ArrowAction
): Promise<ContractResult> => {
  if (!detailAddress) {
    throw new ContractError(`No detailAddress supplied`);
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

  const twig: Twig = {
    creatorAddress: caller,
    detailAddress,
    parentTwigI,
    sourceTwigI,
    targetTwigI,
    x,
    y,
    createDate: date,
    updateDate: date,
    deleteDate: null,
  };

  state.twigIs.push(state.twigs.length);
  state.twigs.push(twig);

  return { state }; 
};
