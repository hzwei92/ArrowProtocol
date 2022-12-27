import initializeArrowState from "../../initializeArrowState";
import signer from '../../../../wallet/signer';
import { ARROW_CONTRACT_SOURCE_TX_ID } from "../../../../constants";
import { useContext } from "react";
import { AppContext } from "../../../../components/app/AppProvider";

export interface DeployArrowProps {
  walletAddress: string;
  data: string;
  uuid: string;
  text: string;
  draft: string;
  color: string;
  parentTxId: string | null;
  sourceTxId: string | null;
  targetTxId: string | null;
  date: number;
}

const useDeployArrow = () => {
  const { warp } = useContext(AppContext);

  const deployArrow = async (props: DeployArrowProps) => {
    if (!warp) return;

    const initState = initializeArrowState(props)
  
    const { contractTxId } = await warp.deployFromSourceTx({
      wallet: {
        signer,
        type: 'arweave',
      },
      initState: JSON.stringify(initState),
      srcTxId: ARROW_CONTRACT_SOURCE_TX_ID,
      tags: [
        { name: 'Arrow-Protocol-Version', value: '0.1'},
        { name: 'Arrow-Source-TxId', value: initState.sourceTxId ?? '' },
        { name: 'Arrow-Target-TxId', value: initState.targetTxId ?? '' },
      ]
    });
  
    console.log(`Deployment completed. Checkout contract in SonAr: https://sonar.warp.cc/#/app/contract/${contractTxId}?network=testnet`);
  
    return contractTxId;
  }

  return deployArrow;
}


export default useDeployArrow;