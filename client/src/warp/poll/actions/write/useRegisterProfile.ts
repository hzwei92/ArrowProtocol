import { useContext } from "react";
import { AppContext } from "../../../../components/app/AppProvider";
import { POLL_CONTRACT_TX_ID } from "../../../../constants";
import signer from "../../../../wallet/signer";

interface RegisterProfileProps {
  profileTxId: string;
}
const useRegisterProfile = () => {
  const { warp } = useContext(AppContext);

  const registerProfile = async ({ profileTxId }: RegisterProfileProps) => {
    if (!warp) return;
    
    const contract = await warp.contract(POLL_CONTRACT_TX_ID).connect({
      signer,
      type: 'arweave',
    });
    
    await contract.writeInteraction({
      function: 'registerProfile',
      profileTxId,
    });
  }

  return registerProfile;
}


export default useRegisterProfile;