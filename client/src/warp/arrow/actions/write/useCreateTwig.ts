import { useContext } from 'react';
import { AppContext } from '../../../../components/app/AppProvider';
import signer from '../../../../wallet/signer';

interface CreateTwigProps {
  abstractAddress: string;
  detailAddress: string;
  parentTwigI: number | null;
  sourceTwigI: number | null;
  targetTwigI: number | null;
  x: number;
  y: number;
  date: number;
}
const useCreateTwig = () => {
  const { warp } = useContext(AppContext);

  const createTwig = async ({
    abstractAddress,
    detailAddress,
    parentTwigI,
    sourceTwigI,
    targetTwigI,
    x,
    y,
    date,
  }: CreateTwigProps) => {
    if (!warp) return;

    const contract = await warp.contract(abstractAddress).connect({
      signer,
      type: 'arweave',
    })
    
    await contract.writeInteraction({
      function: 'createTwig',
      detailAddress,
      parentTwigI,
      sourceTwigI,
      targetTwigI,
      x,
      y,
      date,
    })
  }

  return createTwig;
}

export default useCreateTwig;