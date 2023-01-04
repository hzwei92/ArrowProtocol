import { useIonRouter } from "@ionic/react";
import { useContext } from "react";
import { AppContext } from "../../components/app/AppProvider";
import { selectFrameTxId, setFrameTxId } from "../../redux/slices/arrowSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import useWriteTabs from "../../warp/profile/actions/write/useWriteTabs";

interface RemoveTabProps {
  arrowTxId: string;
}

const useRemoveTab = () => {
  const dispatch = useAppDispatch();

  const router = useIonRouter();

  const { walletAddress, profile, setProfile } = useContext(AppContext);

  const frameTxId = useAppSelector(selectFrameTxId);

  const writeTabs = useWriteTabs();

  const removeTab = async ({ arrowTxId }: RemoveTabProps) => {
    if (!profile) return;

    const tabs1 = profile.state.tabs.filter(txId => txId !== arrowTxId);

    setProfile({
      ...profile,
      state: {
        ...profile.state,
        tabs: tabs1,
      }
    });

    if (arrowTxId === frameTxId) {
      if (tabs1.length === 0) {
        router.push(`/`);
        dispatch(setFrameTxId(null));
      }
      else {
        router.push(`/j/${tabs1[tabs1.length - 1]}`);
      }
    }

    if (walletAddress) {
      writeTabs(tabs1);
    }
  }

  return removeTab;
}

export default useRemoveTab;