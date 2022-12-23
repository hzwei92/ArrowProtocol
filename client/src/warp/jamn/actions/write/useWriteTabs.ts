import { useContext } from "react";
import { AppContext } from "../../../../components/app/AppProvider";
import { JAMN_CONTRACT_TX_ID } from "../../../../constants";
import signer from "../../../../wallet/signer";

const useWriteTabs = () => {
  const { warp } = useContext(AppContext);

  const writeTabs = async (tabs: string[]) => {
    if (!warp) return;

    const contract = await warp.contract(JAMN_CONTRACT_TX_ID).connect({
      signer,
      type: 'arweave',
    });

    await contract.writeInteraction({
      function: 'writeTabs',
      tabs,
    });
  }
  return writeTabs;
}

export default useWriteTabs;