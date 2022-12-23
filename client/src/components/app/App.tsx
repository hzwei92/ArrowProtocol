import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../../theme/variables.css';

import Menu from '../menu/Menu';
import Explorer from '../explorer/Explorer';
import AppBarLeft from './AppBarLeft';
import AppBarTop from './AppBarTop';
import RegisterModal from '../profile/RegisterModal';
import useAppRouter from '../../hooks/useAppRouter';

setupIonicReact();

const App = () => {
  useAppRouter();
  
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
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: 'calc(100% - 50px)',
        }}>
          <Menu />
          <Explorer />
          <RegisterModal />
        </div>
      </div>
    </div>
  );
};

export default App;
