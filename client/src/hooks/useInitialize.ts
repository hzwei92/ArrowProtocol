import { useContext } from "react";
import { AppContext } from "../components/app/AppProvider";
import { useAppDispatch } from "../redux/store";
import { setFrameTxId } from "../redux/slices/arrowSlice";
import useReadProfile from "../warp/jamn/actions/read/useReadProfile";

const useInitialize = () => {
  const dispatch = useAppDispatch();

  const { setProfile, setShowRegisterModal } = useContext(AppContext);

  const readProfile = useReadProfile();

  const initialize = async () => {
    const result = await readProfile();

    if (result?.type === 'error' && result.errorMessage === `Caller not registered`) {
      setShowRegisterModal(true);
    } 
    else if (result?.type === 'ok') {
      const { profile } = result.result;
      if (profile) {
        setProfile(profile);
        dispatch(setFrameTxId(profile?.tabs[profile.tabs.length - 1]))
      }
    }
  }
  return initialize;
}

export default useInitialize;