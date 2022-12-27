import { useContext } from 'react';
import { AppContext } from '../../../../components/app/AppProvider';
import signer from '../../../../wallet/signer';

interface CreatePinProps {
  abstractAddress: string;
  txId: string;
  parentPinI: number | null;
  sourcePinI: number | null;
  targetPinI: number | null;
  x: number;
  y: number;
  date: number;
}
const useCreatePin = () => {
  const { warp } = useContext(AppContext);

  const createPin = async ({
    abstractAddress,
    txId,
    parentPinI,
    sourcePinI,
    targetPinI,
    x,
    y,
    date,
  }: CreatePinProps) => {
    if (!warp) return;

    const contract = await warp.contract(abstractAddress).connect({
      signer,
      type: 'arweave',
    })
    
    await contract.writeInteraction({
      function: 'createPin',
      txId,
      parentPinI,
      sourcePinI,
      targetPinI,
      x,
      y,
      date,
    })
  }

  return createPin;
}

export default useCreatePin;