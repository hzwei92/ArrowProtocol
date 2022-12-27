import fs from 'fs';
import path from 'path';
import { WarpFactory } from 'warp-contracts';
import { getInitState as getInitArrowState } from '../contracts/arrow/getInitState';
import { getInitState as getInitJamnState } from '../contracts/jamn/getInitState';

(async () => {
  const warp = WarpFactory.forTestnet();
  let wallet: any;
  let address: string;
  let walletDir = path.resolve('.secrets');
  let walletFilename = path.join(walletDir, `/wallet_${warp.environment}.json`);
  if (fs.existsSync(walletFilename)) {
    wallet = JSON.parse(fs.readFileSync(walletFilename, 'utf8'));
    address = await warp.arweave.wallets.jwkToAddress(wallet);
  } 
  else {
    ({ jwk: wallet, address } = await warp.generateWallet());
    if (!fs.existsSync(walletDir)) fs.mkdirSync(walletDir);
    fs.writeFileSync(walletFilename, JSON.stringify(wallet));
  }

  const arrowSrc = fs.readFileSync(path.join(__dirname, '../../dist/arrow/contract.js'), 'utf8');
  const arrowState = getInitArrowState(address, null, null, null);
  const { contractTxId: arrowTxId } = await warp.deploy({
    wallet,
    initState: JSON.stringify(arrowState),
    src: arrowSrc,
  });

  console.log(`
    Arrow deployment completed. 
    Checkout contract in SonAr:
    https://sonar.warp.cc/#/app/contract/${arrowTxId}?network=testnet
  `);

  const jamnSrc = fs.readFileSync(path.join(__dirname, '../../dist/jamn/contract.js'), 'utf8');
  const jamnState = getInitJamnState(address, [arrowTxId]);
  const { contractTxId: jamnTxId } = await warp.deploy({
    wallet,
    initState: JSON.stringify(jamnState),
    src: jamnSrc,
  });

  console.log(`
    JAMNN deployment completed. 
    Checkout contract in SonAr:
    https://sonar.warp.cc/#/app/contract/${jamnTxId}?network=testnet
  `);
})();
``;
