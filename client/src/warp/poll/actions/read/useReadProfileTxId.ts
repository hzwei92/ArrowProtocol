import { useContext } from "react"
import { AppContext } from "../../../../components/app/AppProvider"
import { POLL_CONTRACT_TX_ID } from "../../../../constants";
import { PollInput, PollResult } from "../../types";
import signer from "../../../../wallet/signer";

const useReadProfileTxId = () => {
  const { warp } = useContext(AppContext);

  const readProfileTxId = async () => {
    if (!warp) return;

    const contract = await warp.contract(POLL_CONTRACT_TX_ID).connect({
      signer,
      type: 'arweave',
    });

    const result = await contract.viewState<PollInput, PollResult>({
      function: 'readProfileTxId',
    });
    console.log(result);

    return result;
  }

  return readProfileTxId;
}

export default useReadProfileTxId;