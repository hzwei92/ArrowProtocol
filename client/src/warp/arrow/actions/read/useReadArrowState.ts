import { useContext } from "react";
import { AppContext } from "../../../../components/app/AppProvider";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ArrowState } from "../../types";
import signer from '../../../../wallet/signer';
import { mergeArrows, selectTxIdToArrow } from "../../../../redux/slices/arrowSlice";
import { Arrow, IdToType } from "../../../../types";

const useReadArrowState = () => {
  const dispatch = useAppDispatch();

  const { warp } = useContext(AppContext);

  const txIdToArrow = useAppSelector(selectTxIdToArrow);

  const readArrowState = async (contractTxId: string) => {
    if (!warp) return;

    const contract = await warp.contract(contractTxId).connect({
      signer,
      type: 'arweave',
    });
    const { cachedValue } = await contract.readState();

    const state = cachedValue.state as ArrowState;
  
    // TODO differentiate between tx of type Arrow and tx in general; use tx tags?

    const pinIToDescIToTrue: IdToType<IdToType<true>> = {};
    state.pins.forEach((pin, i) => {
      let t = pin;

      // add to own descendants 
      pinIToDescIToTrue[i] = {
        ...pinIToDescIToTrue[i],
        [i]: true,
      };

      // add to all ancestors' descendants
      while (t.parentPinI !== null) {
        pinIToDescIToTrue[t.parentPinI] = {
          ...pinIToDescIToTrue[t.parentPinI],
          [i]: true,
        };

        t = state.pins[t.parentPinI];
      }
    });

    const arrow: Arrow = {
      txId: contractTxId,
      focusI: txIdToArrow[contractTxId]?.focusI ?? 0,
      pinIToDescIToTrue,
      state,
    };

    dispatch(mergeArrows([arrow]));

    return arrow;
  }

  return readArrowState;
}

export default useReadArrowState;