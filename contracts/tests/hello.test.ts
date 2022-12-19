import ArLocal from 'arlocal';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { LoggerFactory, Warp, WarpFactory, Contract } from 'warp-contracts';
import { HelloState } from '../src/contracts/types/types';
import fs from 'fs';
import path from 'path';

jest.setTimeout(30000);

describe('Testing Hello contract', () => {
  let ownerWallet: JWKInterface;
  let owner: string;

  let initialState: HelloState;

  let arlocal: ArLocal;
  let warp: Warp;
  let hello: Contract<HelloState>;

  let contractSrc: string;

  let contractId: string;

  beforeAll(async () => {
    arlocal = new ArLocal(1820, false);
    await arlocal.start();

    LoggerFactory.INST.logLevel('error');

    warp = WarpFactory.forLocal(1820);

    ({ jwk: ownerWallet, address: owner } = await warp.generateWallet());

    initialState = {};

    contractSrc = fs.readFileSync(path.join(__dirname, '../dist/contract.js'), 'utf8');

    ({ contractTxId: contractId } = await warp.deploy({
      wallet: ownerWallet,
      initState: JSON.stringify(initialState),
      src: contractSrc,
    }));
    console.log('Deployed contract: ', contractId);
    hello = warp.contract<HelloState>(contractId).connect(ownerWallet);
  });

  afterAll(async () => {
    await arlocal.stop();
  });

  it('should properly deploy contract', async () => {
    const contractTx = await warp.arweave.transactions.get(contractId);

    expect(contractTx).not.toBeNull();
  });

  it('should read Hello state', async () => {
    expect((await hello.readState()).cachedValue.state).toEqual(initialState);
  });

  it('should not post with no name', async () => {
    await expect(hello.writeInteraction({ function: 'helloWrite' }, { strict: true })).rejects.toThrow(
      'Cannot create interaction: Creator must provide a name.'
    );
  });

  it('should properly post name', async () => {
    await hello.writeInteraction({ function: 'helloWrite', name: 'Asia' });

    const { cachedValue } = await hello.readState();
    expect(cachedValue.state[owner]).toEqual('Asia');
  });

  it('should not be possible for creator post name twice', async () => {
    await expect(hello.writeInteraction({ function: 'helloWrite', name: 'Tomek' }, { strict: true })).rejects.toThrow(
      'Cannot create interaction: Creator already added.'
    );
  });

  it('should properly view message', async () => {
    const { result } = await hello.viewState({ function: 'helloRead', id: owner });

    expect(result).toEqual('Asia');
  });
});
