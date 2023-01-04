import signer from '../../../../wallet/signer';
import { ARROW_CONTRACT_SOURCE_TX_ID } from "../../../../constants";
import { useContext } from "react";
import { AppContext } from "../../../../components/app/AppProvider";
import initializeProfileState from '../../initializeProfileState';

export interface DeployProfileProps {
  walletAddress: string; 
  data: string;
  uuid: string; 
  text: string; 
  draft: string; 
  color: string;
  date: number;
  tabs: string[];
}

const useDeployProfile = () => {
  const { warp } = useContext(AppContext);

  const deployProfile = async (props: DeployProfileProps) => {
    if (!warp) return;

    const initState = initializeProfileState(props)
  
    const { contractTxId } = await warp.deployFromSourceTx({
      wallet: {
        signer,
        type: 'arweave',
      },
      initState: JSON.stringify(initState),
      srcTxId: ARROW_CONTRACT_SOURCE_TX_ID,
      tags: [
        { name: 'Profile-Protocol-Version', value: '0.1'},
      ]
    });
  
    console.log(`Deployment completed. Checkout contract in SonAr: https://sonar.warp.cc/#/app/contract/${contractTxId}?network=testnet`);
  
    return contractTxId;
  }

  return deployProfile;
}


export default useDeployProfile;