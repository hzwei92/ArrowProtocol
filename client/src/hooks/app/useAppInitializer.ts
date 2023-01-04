import { useContext, useEffect } from "react";
import { AppContext } from "../../components/app/AppProvider";
import { useAppDispatch } from "../../redux/store";
import { setFrameTxId } from "../../redux/slices/arrowSlice";
//@ts-ignore
import { WarpFactory } from "warp-contracts/web";
import { defaultCacheOptions } from "warp-contracts";
import useReadProfileTxId from "../../warp/poll/actions/read/useReadProfileTxId";
import useRegisterProfileTxId from "../../warp/poll/actions/write/useRegisterProfile";
import useReadDefaultTabs from "../../warp/poll/actions/read/useReadDefaultTabs";
import useDeployProfile from "../../warp/profile/actions/write/useDeployProfile";
import { v4 } from "uuid";
import useReadProfileState from "../../warp/profile/actions/read/useReadProfileState";
import { Profile } from "../../types";

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

  const readProfileTxId = useReadProfileTxId();
  const registerProfileTxId = useRegisterProfileTxId();
  const readDefaultTabs = useReadDefaultTabs();

  const readProfileState = useReadProfileState();
  const deployProfile = useDeployProfile();

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
        const result = await readProfileTxId();

        if (result?.type !== 'ok') {
          throw new Error('Failed to load profile; readProfileTxId failed');
        }

        let { profileTxId } = result.result;

        if (profileTxId === undefined) {
          const result = await readDefaultTabs();

          if (result?.type !== 'ok') {
            throw new Error('Failed to load profile; readDefaultTabs failed');
          }

          const { defaultTabs } = result.result;

          if (defaultTabs === undefined) {
            throw new Error('Failed to load profile; readDefaultTabs failed');
          }
  
          profileTxId = await deployProfile({
            walletAddress,
            uuid: v4(),
            data: '',
            text: walletAddress,
            draft: '',
            color: '#' + Math.round(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'),
            date: Date.now(),
            tabs: defaultTabs,
          });

          if (profileTxId === undefined) {
            throw new Error('Failed to load profile; deployProfile failed');
          }

          await registerProfileTxId({
            profileTxId,
          });
        }

        const state = await readProfileState(profileTxId);

        if (state === undefined) {
          throw new Error('Failed to load profile; readProfileState failed')
        }

        profile = {
          txId: profileTxId,
          state,
        }
      }
      else {
        const result = await readDefaultTabs();

        if (result?.type !== 'ok') {
          throw new Error('Failed to load profile; readDefaultTabs failed');
        }

        const { defaultTabs } = result.result;

        if (defaultTabs === undefined) {
          throw new Error('Failed to load profile; readDefaultTabs failed');
        }

        profile = {
          txId: null,
          state: {
            creatorAddress: '',
            uuid: v4(),
            text: '',
            draft: '',
            data: '',
            color: '#' + Math.round(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'),
            tabs: defaultTabs,
            leads: [],
            txIdToUpvotes: {},
            sourceTxIdToTxIdToTrue: {},
            targetTxIdToTxIdToTrue: {},
            totalPoints: 0,
            addressToPointBalance: {},
            createDate: 0,
            updateDate: 0,
            deleteDate: null,
          }
        }
      }

      if (profile) {
        setProfile(profile);
        dispatch(setFrameTxId(profile?.state.tabs[profile.state.tabs.length - 1]))
      }
      else {
        throw new Error('Failed to load profile');
      }
    }

    loadProfile();
  }, [isWalletLoaded, walletAddress])
}

export default useAppInitializer;