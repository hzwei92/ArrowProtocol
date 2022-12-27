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
  
    // TODO differentiate between tx of type Arrow and tx in general; use tx tags?

    const commentIToDescIToTrue: IdToType<IdToType<true>> = {};
    state.comments.forEach((comment, i) => {
      let t = comment;

      // add to own descendants 
      commentIToDescIToTrue[i] = {
        ...commentIToDescIToTrue[i],
        [i]: true,
      };

      // add to all ancestors' descendants
      while (t.parentCommentI !== null) {
        commentIToDescIToTrue[t.parentCommentI] = {
          ...commentIToDescIToTrue[t.parentCommentI],
          [i]: true,
        };

        t = state.comments[t.parentCommentI];
      }
    });

    const arrow: Arrow = {
      txId: contractTxId,
      focusI: 0,
      commentIToDescIToTrue,
      state,
    };

    dispatch(mergeArrows([arrow]));

    return arrow;
  }

  return readArrowState;
}

export default useReadArrowState;