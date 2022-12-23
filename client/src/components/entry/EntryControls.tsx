import { useState } from 'react';
import { IonButton, IonButtons, IonIcon, useIonRouter } from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';
import { useAppDispatch } from '../../redux/store';
import { Arrow, Entry } from '../../types';
import EntryOptions from './EntryOptions';

interface EntryControlsProps {
  entry: Entry;
  arrow: Arrow;
  depth: number;
}

export default function EntryControls({entry, arrow, depth}: EntryControlsProps) {
  const dispatch = useAppDispatch();

  const router = useIonRouter();

  const [showOptions, setShowOptions] = useState(false);

  const isSubbed = false;



  const handleReplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  const handlePrevClick = (e: React.MouseEvent) => {

  }

  const handleNextClick = (e: React.MouseEvent) => {

  }
  const handleOpenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  }


  const handleOptionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(true);
  }

  return (
    <IonButtons style={{
      marginLeft: 8,
      marginBottom: -8,
    }}>
      <IonButton onClick={handleReplyClick} style={{
        fontSize: 10,
        height: 22,
      }}>
        REPLY
      </IonButton>
      <IonButton onClick={handleLinkClick} style={{
        fontSize: 10,
        height: 22,
      }}>
        LINK
      </IonButton>
      <IonButton id={'entryOptionsButton-' + entry.id} onClick={handleOptionsClick} style={{
        color: false //isSubbed
          ? arrow.state.color
          : null,
        height: 22,
      }}>
        <IonIcon icon={ellipsisVertical} style={{
          fontSize: 10,
        }}/>
      </IonButton>
      <EntryOptions 
        entry={entry}
        arrow={arrow}
        depth={depth}
        isOpen={showOptions}
        setIsOpen={setShowOptions}
      />
      &nbsp;&nbsp;
      <span style={{
        whiteSpace: 'nowrap',
      }}>
        <IonButton onClick={handlePrevClick} style={{
          borderBottom: entry.showIns
            ? `2px solid ${arrow.state.color}`
            : null,
          borderRadius: 5,
          fontSize: 10,
          height: 22,
          color: entry.showIns
            ? arrow.state.color
            : null,
        }}>
          IN
        </IonButton>
        &nbsp;
        <IonButton onClick={handleNextClick} style={{
          borderBottom: entry.showOuts
            ? `2px solid ${arrow.state.color}`
            : null,
          borderRadius: 5,
          fontSize: 10,
          height: 22,
          color: entry.showOuts
            ? arrow.state.color
            : null,
        }}>
          OUT
        </IonButton>
        <IonButton onClick={handleOpenClick} style={{
          fontSize: 10,
        }}>
          OPEN
        </IonButton>
      </span>
    </IonButtons>
  )
}