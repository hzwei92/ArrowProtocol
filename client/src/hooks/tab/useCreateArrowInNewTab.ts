import { useContext } from "react";
import { v4 } from "uuid";
import { AppContext } from "../../components/app/AppProvider";
import useDeployArrow from "../../warp/arrow/actions/write/useDeployArrow";
import useWriteTabs from "../../warp/jamn/actions/write/useWriteTabs";

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
    if (!walletAddress || !profile) return;

    const contractTxId = await deployArrow({
      walletAddress,
      data: '',
      uuid: v4(),
      text,
      draft,
      color: profile.color,
      parentTxId: null,
      sourceTxId: null,
      targetTxId: null,
      date: Date.now(),
    });

    if (!contractTxId) return;

    const tabs1 = [...profile.tabs, contractTxId];
    setProfile({
      ...profile,
      tabs: tabs1,
    });
    writeTabs(tabs1);
  }

  return createArrowInNewTab;
}

export default useCreateArrowInNewTab;