import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { createContext, Dispatch, SetStateAction, useMemo, useState } from "react";
import { Warp } from "warp-contracts";
import { DEFAULT_MENU_X } from "../../constants";
import { Cursor, Drag, Mode, PendingLink, Profile } from "../../types";


export type AppContextType = {
  warp: Warp | undefined;
  setWarp: Dispatch<SetStateAction<Warp | undefined>>;

  isWalletLoaded: boolean;
  setIsWalletLoaded: Dispatch<SetStateAction<boolean>>;
  
  walletAddress: string | undefined;
  setWalletAddress: Dispatch<SetStateAction<string | undefined>>;

  profile: Profile | undefined;
  setProfile: Dispatch<SetStateAction<Profile | undefined>>;

  cursor: Cursor;
  setCursor: Dispatch<SetStateAction<Cursor>>;

  drag: Drag;
  setDrag: Dispatch<SetStateAction<Drag>>;

  pendingLink: PendingLink;
  setPendingLink: Dispatch<SetStateAction<PendingLink>>;

  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;

  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;

  menuX: number;
  setMenuX: Dispatch<SetStateAction<number>>;
  menuIsResizing: boolean;
  setMenuIsResizing: Dispatch<SetStateAction<boolean>>;

  showRegisterModal: boolean;
  setShowRegisterModal: Dispatch<SetStateAction<boolean>>;
  showCreateArrowModal: boolean;
  setShowCreateArrowModal: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType>({} as AppContextType);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [warp, setWarp] = useState<Warp | undefined>(undefined);

  const [isWalletLoaded, setIsWalletLoaded] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | undefined>(undefined);
  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  const [cursor, setCursor] = useState<Cursor>({
    x: 0,
    y: 0,
  });
  
  const [drag, setDrag] = useState<Drag>({
    isScreen: false,
    pinI: null,
    targetPinI: null,
  });

  const [pendingLink, setPendingLink] = useState<PendingLink>({
    sourcePinI: null,
    targetPinI: null,
  });
  
  const [mode, setMode] = useState<Mode>(Mode.PORTAL);
  
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCreateArrowModal, setShowCreateArrowModal] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(true);

  const [menuX, setMenuX] = useState(DEFAULT_MENU_X);
  const [menuIsResizing, setMenuIsResizing] = useState(false);

  const appContextValue: AppContextType = useMemo(() => ({
    warp,
    setWarp,

    isWalletLoaded,
    setIsWalletLoaded,

    walletAddress,
    setWalletAddress,

    profile,
    setProfile,

    cursor,
    setCursor,

    drag,
    setDrag,

    pendingLink,
    setPendingLink,

    mode,
    setMode,

    isDarkMode,
    setIsDarkMode,

    menuX,
    setMenuX,
    menuIsResizing,
    setMenuIsResizing,

    showRegisterModal,
    setShowRegisterModal,
    showCreateArrowModal,
    setShowCreateArrowModal
  }), [
    warp,
    isWalletLoaded, walletAddress, profile, 
    cursor, drag, pendingLink, mode, isDarkMode, menuX, 
    showRegisterModal, showCreateArrowModal
  ]);

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