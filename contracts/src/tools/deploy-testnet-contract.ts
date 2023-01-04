import fs from 'fs';
import path from 'path';
import { WarpFactory } from 'warp-contracts';
import { getInitState as getInitArrowState } from '../contracts/arrow/getInitState';
import { getInitState as getInitProfileState } from '../contracts/profile/getInitState';
import { getInitState as getInitPollState } from '../contracts/poll/getInitState';

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

  const profileSrc = fs.readFileSync(path.join(__dirname, '../../dist/profile/contract.js'), 'utf8');
  const profileState = getInitProfileState({
    creatorAddress: address
  });
  const { contractTxId: profileTxId } = await warp.deploy({
    wallet,
    initState: JSON.stringify(profileState),
    src: profileSrc,
  });

  console.log(`
    Profile deployment completed. 
    Checkout contract in SonAr:
    https://sonar.warp.cc/#/app/contract/${profileTxId}?network=testnet
  `);

  const arrowSrc = fs.readFileSync(path.join(__dirname, '../../dist/arrow/contract.js'), 'utf8');
  const arrowState = getInitArrowState({
    creatorAddress: address, 
    profileTxId, 
    sourceTxId: null, 
    targetTxId: null, 
    parentTxId: null,
  });
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

  const pollSrc = fs.readFileSync(path.join(__dirname, '../../dist/poll/contract.js'), 'utf8');
  const pollState = getInitPollState({
    creatorAddress: address,
    profileTxId,
    defaultTabs: [arrowTxId],
  });
  const { contractTxId: pollTxId } = await warp.deploy({
    wallet,
    initState: JSON.stringify(pollState),
    src: pollSrc,
  });

  console.log(`
    Poll deployment completed. 
    Checkout contract in SonAr:
    https://sonar.warp.cc/#/app/contract/${pollTxId}?network=testnet
  `);
})();
