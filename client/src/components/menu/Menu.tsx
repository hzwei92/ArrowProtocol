import { isPlatform } from "@ionic/react";
import { useContext, useState } from "react";
import { APP_BAR_X } from "../../constants";
import { Mode } from "../../types";
import About from "../about/About";
import { AppContext } from "../app/AppProvider";
import Contacts from "../contacts/Contacts";
import Explorer from "../explorer/Explorer";
import Profile from "../profile/Profile";

const Menu = () => {
  const { profile, mode, isDarkMode, menuX, setMenuIsResizing } = useContext(AppContext);

  const [showResizer, setShowResizer] = useState(false);

  const handleResizeMouseEnter = (event: React.MouseEvent) => {
    setShowResizer(true);
  }

  const handleResizeMouseLeave = (event: React.MouseEvent) => {
    setShowResizer(false);
  }

  const handleResizeMouseDown = (event: React.MouseEvent) => {
    setMenuIsResizing(true);
  }

  return (
    <div style={{
      position: 'relative',
      height: '100%',
      width: isPlatform('mobile')
        ? '100%'
        : menuX - APP_BAR_X,
      display: 'flex',
      flexDirection: 'row',
    }}>
      <div style={{
        height: '100%',
        width: 'calc(100% - 5px)',
      }}>
        { 
          mode === Mode.EXPLORER
            ? <Explorer />
            : null
        }
        { 
          mode === Mode.PROFILE
            ? <Profile />
            : null
        }
        {
          mode === Mode.CONTACTS
            ? <Contacts />
            : null
        }
        {
          mode === Mode.ABOUT
            ? <About />
            : null
        }
      </div>
      <div 
        onMouseEnter={handleResizeMouseEnter}
        onMouseLeave={handleResizeMouseLeave}
        onMouseDown={handleResizeMouseDown}
        style={{
          width: 5,
          backgroundColor: showResizer
            ? profile?.state.color
            : isDarkMode
              ? '#222222'
              : 'lavender',
          cursor: 'col-resize',
        }}
      />
    </div>
  );
}

export default Menu;