import { useContext } from "react"
import { AppContext } from "../../../../components/app/AppProvider"
import { JAMN_CONTRACT_TX_ID } from "../../../../constants";
import { JamnInput, JamnResult } from "../../types";
import signer from "../../../../wallet/signer";

const useReadProfile = () => {
  const { warp } = useContext(AppContext);

  const readProfile = async () => {
    if (!warp) return;

    const contract = await warp.contract(JAMN_CONTRACT_TX_ID).connect({
      signer,
      type: 'arweave',
    });

    const result = await contract.viewState<JamnInput, JamnResult>({
      function: 'readProfile',
    });
    console.log(result);

    return result;
  }

  return readProfile;
}

export default useReadProfile;