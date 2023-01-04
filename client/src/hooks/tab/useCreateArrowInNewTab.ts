import { useContext } from "react";
import { v4 } from "uuid";
import { AppContext } from "../../components/app/AppProvider";
import useDeployArrow from "../../warp/arrow/actions/write/useDeployArrow";
import useWriteTabs from "../../warp/profile/actions/write/useWriteTabs";

interface CreateArrowInNewTabProps {
  text: string;
  draft: string;
};

const useCreateArrowInNewTab = () => {
  const { walletAddress, profile, setProfile } = useContext(AppContext);

  const deployArrow = useDeployArrow();
  const writeTabs = useWriteTabs();

  const createArrowInNewTab = async ({
    text,
    draft,
  }: CreateArrowInNewTabProps) => {
    if (!walletAddress || !profile?.txId) return;

    const contractTxId = await deployArrow({
      walletAddress,
      profileTxId: profile.txId,
      data: '',
      uuid: v4(),
      text,
      draft,
      color: profile.state.color,
      parentTxId: null,
      sourceTxId: null,
      targetTxId: null,
      date: Date.now(),
    });

    if (!contractTxId) return;

    const tabs1 = [...profile.state.tabs, contractTxId];
    setProfile({
      ...profile,
      state: {
        ...profile.state,
        tabs: tabs1,
      }
    });
    writeTabs(tabs1);
  }

  return createArrowInNewTab;
}

export default useCreateArrowInNewTab;