import { useContext } from "react";
import { Warp } from "warp-contracts";
import { AppContext } from "../../../../components/app/AppProvider";
import { JAMN_CONTRACT_TX_ID } from "../../../../constants";
import signer from "../../../../wallet/signer";

interface RegisterProps {
  name: string;
  description: string;
  color: string;
}
const useRegister = () => {
  const { warp } = useContext(AppContext);

  const register = async ({ name, description, color }: RegisterProps) => {
    if (!warp) return;
    
    const contract = await warp.contract(JAMN_CONTRACT_TX_ID).connect({
      signer,
      type: 'arweave',
    });
    
    await contract.writeInteraction({
      function: 'register',
      name,
      description,
      color,
      date: Date.now(),
    });
  }

  return register;
}


export default useRegister;