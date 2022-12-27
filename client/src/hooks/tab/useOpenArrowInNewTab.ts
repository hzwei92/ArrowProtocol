import { useIonRouter } from "@ionic/react";
import { useContext } from "react";
import { AppContext } from "../../components/app/AppProvider";
import useWriteTabs from "../../warp/jamn/actions/write/useWriteTabs";

interface OpenArrowInNewTabProps {
  txId: string;
};

const useOpenArrowInNewTab = () => {
  const router = useIonRouter();

  const { walletAddress, profile, setProfile } = useContext(AppContext);

  const writeTabs = useWriteTabs();

  const openArrowInNewTab = async ({ txId }: OpenArrowInNewTabProps) => {
    if (!profile) return;

    router.push(`/j/${txId}/0`);
    
    if (!profile.tabs.includes(txId)) {
      const tabs1 = [...profile.tabs, txId];

      setProfile({
        ...profile,
        tabs: tabs1,
      });

      if (walletAddress) {
        writeTabs(tabs1);
      }
    }

  }

  return openArrowInNewTab;
}

export default useOpenArrowInNewTab;