import { useContext } from "react";
import { AppContext } from "../../../../components/app/AppProvider";
import { useAppDispatch } from "../../../../redux/store";
import { ArrowState } from "../../types";
import signer from '../../../../wallet/signer';
import { mergeArrows } from "../../../../redux/slices/arrowSlice";
import { Arrow, IdToType } from "../../../../types";

const useReadArrowState = () => {
  const dispatch = useAppDispatch();

  const { warp } = useContext(AppContext);

  const readArrowState = async (contractTxId: string) => {
    if (!warp) return;

    const contract = await warp.contract(contractTxId).connect({
      signer,
      type: 'arweave',
    });
    const { cachedValue } = await contract.readState();

    const state = cachedValue.state as ArrowState;

    const twigIToDescIToTrue: IdToType<IdToType<true>> = {};
    state.twigs.forEach((twig, i) => {
      let t = twig;

      // add to own descendants 
      twigIToDescIToTrue[i] = {
        ...twigIToDescIToTrue[i],
        [i]: true,
      };

      // add to all ancestors' descendants
      while (t.parentTwigI !== null) {
        twigIToDescIToTrue[t.parentTwigI] = {
          ...twigIToDescIToTrue[t.parentTwigI],
          [i]: true,
        };

        t = state.twigs[t.parentTwigI];
      }
    });

    const arrow: Arrow = {
      txId: contractTxId,
      focusI: 0,
      twigIToDescIToTrue,
      state,
    };

    dispatch(mergeArrows([arrow]));

    return arrow;
  }

  return readArrowState;
}

export default useReadArrowState;