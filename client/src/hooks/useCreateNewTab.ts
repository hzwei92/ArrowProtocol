import { useContext } from "react";
import { v4 } from "uuid";
import { AppContext } from "../components/app/AppProvider";
import useDeployArrow from "../warp/arrow/actions/write/useDeployArrow";
import useWriteTabs from "../warp/jamn/actions/write/useWriteTabs";

interface CreateNewTabProps {
  name: string;
  description: string;
};

const useCreateNewTab = () => {
  const { walletAddress, profile, setProfile } = useContext(AppContext);

  const deployArrow = useDeployArrow();
  const writeTabs = useWriteTabs();

  const createNewTab = async ({
    name,
    description,
  }: CreateNewTabProps) => {
    if (!walletAddress || !profile) return;

    const contractTxId = await deployArrow({
      walletAddress,
      uuid: v4(),
      name,
      description,
      color: profile.color,
      data: '',
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

  return createNewTab;
}

export default useCreateNewTab;