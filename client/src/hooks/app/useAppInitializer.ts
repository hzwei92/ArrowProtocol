import { useContext, useEffect } from "react";
import { AppContext } from "../../components/app/AppProvider";
import { useAppDispatch } from "../../redux/store";
import { setFrameTxId } from "../../redux/slices/arrowSlice";
import useReadProfile from "../../warp/jamn/actions/read/useReadProfile";
import useRegister from "../../warp/jamn/actions/write/useRegister";
import useReadDefaultTabs from "../../warp/jamn/actions/read/useReadDefaultTabs";
//@ts-ignore
import { WarpFactory } from "warp-contracts/web";
import { defaultCacheOptions } from "warp-contracts";
import { Profile } from "../../warp/jamn/types";

const useAppInitializer = () => {
  const dispatch = useAppDispatch();

  const { 
    setWarp, 
    isWalletLoaded,
    setIsWalletLoaded, 
    walletAddress,
    setWalletAddress, 
    setProfile,
    isDarkMode,
  } = useContext(AppContext);

  const readProfile = useReadProfile();
  const register = useRegister();
  const readDefaultTabs = useReadDefaultTabs();

  useEffect(() => {
    const initializeWarp = async () => {
      const warp = await WarpFactory.forTestnet({ ...defaultCacheOptions, inMemory: true });
      setWarp(warp);
    }
    initializeWarp();

    const handleArweaveWalletLoaded = async () => {
      console.log('arweaveWalletLoaded');
      try {
        const address = await window.arweaveWallet.getActiveAddress()
        setWalletAddress(address);
        setIsWalletLoaded(true);
      } catch (e: any) {
        if (e === 'Insufficient permissions to access "getActiveAddress"') {
          setIsWalletLoaded(true);
        }
        else {
          throw e;
        }
      }
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

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode])

  useEffect(() => {
    if (!isWalletLoaded) return;

    const loadProfile = async () => {
      let profile: Profile | undefined;

      if (walletAddress) {    
        const result = await readProfile();
        if (result?.type === 'ok') {
          ({ profile } = result.result);

          if (!profile) {
            await register({
              name: walletAddress,
              description: '',
              color: '#' + Math.round(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'),
            });

            const result = await readProfile();
            if (result?.type === 'ok') {
              ({ profile } = result.result);
            }
          }
        }
      }
      else {
        const result = await readDefaultTabs()
        if (result?.type === 'ok') {
          const { defaultTabs } = result.result;
          if (defaultTabs) {
            profile = {
              address: '',
              name: '',
              description: '',
              color: '',
              tabs: defaultTabs,
              pointBalance: 0,
              createDate: 0,
              updateDate: 0,
              deleteDate: null,
            }
          }
        }
      }

      if (profile) {
        setProfile(profile);
        dispatch(setFrameTxId(profile?.tabs[profile.tabs.length - 1]))
      }
      else {
        throw new Error('Failed to load profile');
      }
    }

    loadProfile();
  }, [isWalletLoaded, walletAddress])
}

export default useAppInitializer;