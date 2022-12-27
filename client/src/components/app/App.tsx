import { isPlatform, setupIonicReact } from '@ionic/react';
import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be pined out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../../theme/variables.css';

import Menu from '../menu/Menu';
import Portal from '../portal/Portal';
import AppBarLeft from './AppBarLeft';
import AppBarTop from './AppBarTop';
import { useContext } from 'react';
import { AppContext } from './AppProvider';
import CreateArrowModal from '../tab/NewTabModal';
import { Mode } from '../../types';
import { APP_BAR_X, APP_BAR_Y } from '../../constants';
import useAppRouter from '../../hooks/useAppRouter';
import useAppInitializer from '../../hooks/useAppInitializer';

setupIonicReact();

const App = () => {
  useAppRouter();  
  useAppInitializer();

  const { mode, menuX } = useContext(AppContext);
  
  return (
    <div id='app'>
      <AppBarLeft />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: 'calc(100% - 50px)',
        height: '100%',
      }}>
        <AppBarTop />
        <div style={{
          display: mode === Mode.PORTAL
            ? 'none'
            : 'block',
          height: '100%',
          position: 'fixed',
          left: APP_BAR_X,
          right: isPlatform('mobile')
            ? 0 
            : menuX,
          top: APP_BAR_Y,
          bottom: 0,
        }}>
          <Menu />
        </div>
        <div style={{
          display: mode !== Mode.PORTAL && isPlatform('mobile')
            ? 'none'
            : 'block',
          position: 'fixed',
          left: mode === Mode.PORTAL
            ? APP_BAR_X
            : menuX,
          right: 0,
          top: APP_BAR_Y,
          bottom: 0,
        }}>
          <Portal />
        </div>
      </div>
      <CreateArrowModal />
    </div>
  );
};

export default App;
