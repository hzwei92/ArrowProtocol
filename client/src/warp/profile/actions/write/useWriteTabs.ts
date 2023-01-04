import { useContext } from "react";
import { AppContext } from "../../../../components/app/AppProvider";
import signer from "../../../../wallet/signer";

const useWriteTabs = () => {
  const { warp, profile } = useContext(AppContext);

  const writeTabs = async (tabs: string[]) => {
    if (!warp || !profile?.txId) return;

    const contract = await warp.contract(profile.txId).connect({
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