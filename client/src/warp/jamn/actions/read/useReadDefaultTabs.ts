import { useContext } from "react";
import { AppContext } from "../../../../components/app/AppProvider";
import { JAMN_CONTRACT_TX_ID } from "../../../../constants";
import signer from "../../../../wallet/signer";
import { JamnInput, JamnResult } from "../../types";

const useReadDefaultTabs = () => {
  const { warp } = useContext(AppContext);

  const readDefaultTabs = async () => {
    if (!warp) return;

    const contract = await warp.contract(JAMN_CONTRACT_TX_ID);
    const result = await contract.viewState<JamnInput, JamnResult>({
      function: 'readDefaultTabs',
    });

    console.log(result);

    return result;
  }

  return readDefaultTabs;
}

export default useReadDefaultTabs;