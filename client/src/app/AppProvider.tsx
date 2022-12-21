import { JWKInterface } from "arweave/node/lib/wallet";
import { createContext, useEffect, useState } from "react";
import { defaultCacheOptions, Warp, WarpFactory } from "warp-contracts";

export type AppContextType = {
  warp: Warp | undefined;
  walletAddress: string | undefined;
};

const AppContext = createContext<AppContextType>({
  warp: undefined,
  walletAddress: undefined,
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [warp, setWarp] = useState<Warp | undefined>(undefined);
  const [walletAddress, setWalletAddress] = useState<string | undefined>(undefined);
  useEffect(() => {
    const init = async () => {
      const warp = await WarpFactory.forTestnet({ ...defaultCacheOptions, inMemory: true });
      setWarp(warp);
      // const { address } = await warp.generateWallet();
      // setWalletAddress(address);
    }
    init();

    const handleArweaveWalletLoaded = async () => {
      console.log('arweaveWalletLoaded');
      const address = await window.arweaveWallet.getActiveAddress()
      setWalletAddress(address);
    }

    const handleWalletSwitch = (e: any) => {
      console.log('walletSwitch', e);
      setWalletAddress(e.detail.address);
    }

    window.addEventListener('arweaveWalletLoaded', handleArweaveWalletLoaded);
    window.addEventListener('walletSwitch', handleWalletSwitch);

    return () => {
      window.removeEventListener('arweaveWalletLoaded', handleArweaveWalletLoaded);
      window.removeEventListener('walletSwitch', handleWalletSwitch);
    }
  }, []);

  return (
    <AppContext.Provider value={{
      warp,
      walletAddress,
    }}>
      {children}
    </AppContext.Provider>
  );
}
 
export { AppContext, AppProvider };