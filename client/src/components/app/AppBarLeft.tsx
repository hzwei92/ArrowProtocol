import { IonButton, IonButtons, IonCard, IonIcon, isPlatform } from "@ionic/react"
import { apertureOutline, globeOutline, informationCircleOutline, moonOutline, peopleOutline, personCircleOutline, sunnyOutline } from "ionicons/icons";
import { useContext, useState } from "react";
import { Mode } from "../../types";
import { AppContext } from "./AppProvider";
import icon from './favicon.png';

const AppBarLeft = () => {
  const { profile, mode, setMode, isDarkMode, setIsDarkMode } = useContext(AppContext);

  const [label, setLabel] = useState<Mode>(Mode.PORTAL);

  const handleMenuMouseEnter = (mode: Mode) => () => {
    setLabel(mode);
  }
  const handleMenuMouseLeave = () => {
    setLabel(Mode.PORTAL);
  }

  const handleMenuClick = (m: Mode) => () => {
    console.log(m, mode);
    if (m === mode && !isPlatform('mobile')) {
      setMode(Mode.PORTAL);
    }
    else {
      setMode(m);
    }
  }
  return (
    <IonCard style={{
      margin: 0,
      borderRadius: 0,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      minHeight: '100%',
      width: 50,
      overflow: 'visible',
      zIndex: 100,
    }}>
      <IonButtons style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <IonButton 
          style={{
            height: 50,
            width: 50,
          }}
        >
          <img src={icon} style={{
            transform: 'scale(.85)',
          }}/>
        </IonButton>
        <IonButton 
          onMouseEnter={handleMenuMouseEnter(Mode.PORTAL)}
          onMouseLeave={handleMenuMouseLeave}
          onClick={handleMenuClick(Mode.PORTAL)}
          style={{
            display: isPlatform('mobile')
              ? null
              : 'none',
            width: 50,
            height: 50,
            borderLeft: mode === Mode.PORTAL
              ? `5px solid ${profile?.color}`
              : null,
          }}
        >
          <IonIcon icon={apertureOutline} style={{
            color: mode === Mode.PORTAL
              ? profile?.color
              : null,
          }}/>
        </IonButton>
        <IonButton 
          onMouseEnter={handleMenuMouseEnter(Mode.PROFILE)}
          onMouseLeave={handleMenuMouseLeave}
          onClick={handleMenuClick(Mode.PROFILE)}
          style={{
            width: 50,
            height: 50,
            borderLeft: mode === Mode.PROFILE
              ? `5px solid ${profile?.color}`
              : null,
          }}
        >
          <IonIcon icon={personCircleOutline} style={{
            color: mode === Mode.PROFILE
              ? profile?.color
              : null,
          }}/>
        </IonButton>
        <IonButton  
          onMouseEnter={handleMenuMouseEnter(Mode.EXPLORER)}
          onMouseLeave={handleMenuMouseLeave}
          onClick={handleMenuClick(Mode.EXPLORER)}
          style={{
            width: 50,
            height: 50,
            borderLeft: mode === Mode.EXPLORER
              ? `5px solid ${profile?.color}`
              : null,
          }}
        >
          <IonIcon icon={globeOutline} style={{
            color: mode === Mode.EXPLORER
              ? profile?.color
              : null,
          }}/>
        </IonButton>
        <IonButton 
          onMouseEnter={handleMenuMouseEnter(Mode.CONTACTS)}
          onMouseLeave={handleMenuMouseLeave}
          onClick={handleMenuClick(Mode.CONTACTS)}
          style={{
            height: 50,
            width: 50,
            borderLeft: mode === Mode.CONTACTS
              ? `5px solid ${profile?.color}`
              : null,
          }}
        >
          <IonIcon icon={peopleOutline} style={{
            color: mode === Mode.CONTACTS
              ? profile?.color
              : null,
          }}/>
        </IonButton>
        <IonButton 
          id={'menu-info-button'}
          onMouseEnter={handleMenuMouseEnter(Mode.ABOUT)}
          onMouseLeave={handleMenuMouseLeave}
          onClick={handleMenuClick(Mode.ABOUT)}
          style={{
            height: 50,
            width: 50,
            borderLeft: mode === Mode.ABOUT
              ? `5px solid ${profile?.color}`
              : null,
          }}
        >
          <IonIcon icon={informationCircleOutline} style={{
            color: mode === Mode.ABOUT
              ? profile?.color
              : null,
          }}/>
        </IonButton>
      </IonButtons>
      <IonButtons style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <IonButton onClick={() => setIsDarkMode(val => !val)} style={{
          height: 50,
          width: 50,
        }}>
          <IonIcon 
            icon={isDarkMode ? moonOutline : sunnyOutline} 
            style={{
              transform: isDarkMode
                ? 'scale(.75)'
                : null,
            }}
          />
        </IonButton>
      </IonButtons>
      <IonCard style={{
        display: label === Mode.PROFILE && !isPlatform('mobile')
          ? 'block'
          : 'none',
        position: 'absolute',
        left: 45,
        top: 50,
        padding: 5,
        border: `1px solid`,
      }}>
        PROFILE
      </IonCard>
      <IonCard style={{
        display: label === Mode.EXPLORER && !isPlatform('mobile')
          ? 'block'
          : 'none',
        position: 'absolute',
        left: 45,
        top: 100,
        padding: 5,
        border: `1px solid`,
      }}>
        EXPLORER
      </IonCard>
      <IonCard style={{
        display: label === Mode.CONTACTS && !isPlatform('mobile')
          ? 'block'
          : 'none',
        position: 'absolute',
        left: 45,
        top: 150,
        padding: 5,
        border: `1px solid`,
      }}>
        CONTACTS
      </IonCard>
      <IonCard style={{
        display: label === Mode.ABOUT && !isPlatform('mobile')
          ? 'block'
          : 'none',
        position: 'absolute',
        left: 45,
        top: 200,
        padding: 5,
        border: `1px solid`,
      }}>
        ABOUT
      </IonCard>
    </IonCard>
  )
}

export default AppBarLeft;