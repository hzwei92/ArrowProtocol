import { useContext } from "react";
import { AppContext } from "../../../../components/app/AppProvider";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ProfileState } from "../../types";
import signer from '../../../../wallet/signer';

const useReadProfileState = () => {
  const { warp } = useContext(AppContext);

  const readProfileState = async (contractTxId: string) => {
    if (!warp) return;

    const contract = await warp.contract(contractTxId).connect({
      signer,
      type: 'arweave',
    });
    const { cachedValue } = await contract.readState();

    const state = cachedValue.state as ProfileState;

    return state;
  }

  return readProfileState;
}

export default useReadProfileState;