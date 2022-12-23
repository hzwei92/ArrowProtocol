import { useContext, useEffect } from "react";
import { AppContext } from "../app/AppProvider";
import { TAB_HEIGHT } from "../../constants";
import SpaceComponent from "../space/Space";
import TabBar from "../tab/TabBar";
import { isPlatform } from "@ionic/react";
import CreateArrowModal from "../tab/NewTabModal";
import useReadProfile from "../../hooks/useInitialize";

const Explorer = () => {
  const { walletAddress } = useContext(AppContext);

  const readProfile = useReadProfile();

  useEffect(() => {
    if (walletAddress) {
      readProfile();
    }
  }, [walletAddress])

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position:'relative',
    }}>
      <TabBar />
      <div style={{
        position: 'relative',
        width: '100%',
        height: `calc(100% - ${isPlatform('iphone') ? TAB_HEIGHT : TAB_HEIGHT + 1}px)`,
      }}>
        <SpaceComponent />
      </div>
      <CreateArrowModal />
    </div>
  );
}

export default Explorer;