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
import '../theme/variables.css';
import AppBar from './AppBar';
import Menu from '../features/menu/Menu';
import Explorer from '../features/explorer/Explorer';

setupIonicReact();

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <div id='app'>
          <AppBar />
          <Menu />
          <Explorer />
        </div>
      </IonReactRouter>
    </IonApp> 
  );
};

export default App;
