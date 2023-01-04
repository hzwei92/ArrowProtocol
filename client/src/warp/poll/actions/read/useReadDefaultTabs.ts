import { useContext } from "react";
import { AppContext } from "../../../../components/app/AppProvider";
import { POLL_CONTRACT_TX_ID } from "../../../../constants";
import { PollInput, PollResult } from "../../types";

const useReadDefaultTabs = () => {
  const { warp } = useContext(AppContext);

  const readDefaultTabs = async () => {
    if (!warp) return;

    const contract = await warp.contract(POLL_CONTRACT_TX_ID);
    const result = await contract.viewState<PollInput, PollResult>({
      function: 'readDefaultTabs',
    });

    console.log(result);

    return result;
  }

  return readDefaultTabs;
}

export default useReadDefaultTabs;