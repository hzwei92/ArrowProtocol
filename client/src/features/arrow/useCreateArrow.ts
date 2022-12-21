import { useContext } from "react";
import { AppContext } from "../../app/AppProvider";
import { ArrowState } from "../../types/types";

const useCreateArrow = () => {
  const { warp } = useContext(AppContext);

  const createArrow = async (
    initState: ArrowState,
  ) => {
    if (!warp) return;

    const { contractTxId } = await warp.deployFromSourceTx({
      wallet: {
        signer: async (tx) => {
          const tx1 = await window.arweaveWallet.sign(tx);
          Object.keys(tx1).forEach(key => {
            console.log(key, tx[key], tx1[key]);
            if (key === 'data') return;
            tx[key] = tx1[key];
          })
        },
        type: 'arweave',
      },
      initState: JSON.stringify(initState),
      srcTxId: 'yEX3stRZ8JXy1D53fArSu8I2Mm5wqd5X3c0d0SubPk0',
      tags: [
        { name: 'Arrow-A-Address', value: initState.sourceAddress ?? '' },
        { name: 'Arrow-B-Address', value: initState.targetAddress ?? '' },
      ]
    });

    console.log(`Deployment completed. Checkout contract in SonAr: https://sonar.warp.cc/#/app/contract/${contractTxId}?network=testnet`);

    return contractTxId;
  }

  return createArrow;
}

export default useCreateArrow;