import Transaction from "arweave/node/lib/transaction";

const signer = async (tx: Transaction) => {
  const tx1 = await window.arweaveWallet.sign(tx);
  Object.keys(tx1).forEach(key => {
    if (key === 'data') return;
    tx[key] = tx1[key];
  });
}

export default signer ;