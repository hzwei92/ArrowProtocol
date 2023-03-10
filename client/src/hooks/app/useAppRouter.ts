import { useIonRouter } from "@ionic/react";
import { useContext, useEffect } from "react";
import { AppContext } from "../../components/app/AppProvider";
import { mergeArrows, selectFrame, selectTxIdToArrow, setFrameTxId } from "../../redux/slices/arrowSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import useWriteTabs from "../../warp/profile/actions/write/useWriteTabs";

const useAppRouter = () => {
  const dispatch = useAppDispatch();

  const router = useIonRouter();

  const { profile, setProfile } = useContext(AppContext);
  
  const txIdToArrow = useAppSelector(selectTxIdToArrow);
  const frame = useAppSelector(selectFrame);

  const writeTabs = useWriteTabs();

  useEffect(() => {
    if (!profile) return;

    const path = router.routeInfo.pathname.split('/');

    if (path[1] !== 'j' || path[2] === undefined || path[2] === '') {
      const txId = profile.state.tabs[profile.state.tabs.length - 1];
      const arrow = txIdToArrow[txId];
      if (arrow) {
        router.push(`/j/${txId}/${arrow.focusI}`);
      }
      return;
    }
    
    if (!profile.state.tabs.includes(path[2])) {
      const tabs1 = [...profile.state.tabs, path[2]];
      setProfile({
        ...profile,
        state: {
          ...profile.state,
          tabs: tabs1,
        }
      });
      writeTabs(tabs1);
      return;
    }
    
    if (frame?.txId !== path[2]) {
      dispatch(setFrameTxId(path[2]));
      return;
    }

    if (isNaN(parseInt(path[3]))) {
      router.push(`/j/${path[2]}/${frame.focusI}`);
      return;
    }

    if (frame.focusI !== parseInt(path[3])) {
      dispatch(mergeArrows([{
        ...frame,
        focusI: parseInt(path[3])
      }]));
      return;
    }
  }, [router.routeInfo, profile, txIdToArrow, frame])
}

export default useAppRouter;