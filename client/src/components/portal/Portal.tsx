import { TAB_HEIGHT } from "../../constants";
import Space from "../space/Space";
import TabBar from "../tab/TabBar";
import { isPlatform } from "@ionic/react";

const Portal = () => {
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
        <Space />
      </div>
    </div>
  );
}

export default Portal;