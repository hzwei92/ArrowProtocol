import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { createContext, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { defaultCacheOptions, Warp } from "warp-contracts";
//@ts-ignore
import { WarpFactory } from "warp-contracts/web";
import { Cursor, Drag } from "../../types";
import { Profile } from "../../warp/jamn/types";


export type AppContextType = {
  warp: Warp | undefined;

  walletAddress: string | undefined;
  setWalletAddress: Dispatch<SetStateAction<string | undefined>>;

  profile: Profile | undefined;
  setProfile: Dispatch<SetStateAction<Profile | undefined>>;

  cursor: Cursor;
  setCursor: Dispatch<SetStateAction<Cursor>>;

  drag: Drag;
  setDrag: Dispatch<SetStateAction<Drag>>;

  showRegisterModal: boolean;
  setShowRegisterModal: Dispatch<SetStateAction<boolean>>;
  showCreateArrowModal: boolean;
  setShowCreateArrowModal: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType>({} as AppContextType);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [warp, setWarp] = useState<Warp | undefined>(undefined);

  const [walletAddress, setWalletAddress] = useState<string | undefined>(undefined);
  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  const [cursor, setCursor] = useState<Cursor>({
    x: 0,
    y: 0,
  });
  
  const [drag, setDrag] = useState<Drag>({
    isScreen: false,
    twigI: null,
    targetTwigI: null,
  });
  
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCreateArrowModal, setShowCreateArrowModal] = useState(false);

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

  const appContextValue: AppContextType = useMemo(() => ({
    warp,

    walletAddress,
    setWalletAddress,

    profile,
    setProfile,

    cursor,
    setCursor,
    drag,
    setDrag,

    showRegisterModal,
    setShowRegisterModal,
    showCreateArrowModal,
    setShowCreateArrowModal
  }), [warp, walletAddress, profile, cursor, drag, showRegisterModal, showCreateArrowModal]);

  return (
    <IonApp>
      <IonReactRouter>
        <AppContext.Provider value={appContextValue}>
          {children}
        </AppContext.Provider>
      </IonReactRouter>
    </IonApp>
  );
}
 
export { AppContext, AppProvider };