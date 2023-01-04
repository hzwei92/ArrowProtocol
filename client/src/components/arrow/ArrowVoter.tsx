import { useContext, useState } from 'react';
import { IonButton, IonButtons, IonIcon } from '@ionic/react';
import { caretDownOutline, caretUpOutline, chevronDownOutline, chevronUpOutline } from 'ionicons/icons';
import { AppContext } from '../app/AppProvider';
import { Arrow } from '../../types';

interface ArrowVoterProps {
  arrow: Arrow;
}
export default function ArrowVoter({ arrow }: ArrowVoterProps) {
  const { profile } = useContext(AppContext);

  const [isVoting, setIsVoting] = useState(false);

  const handleVoteClick = (clicks: number) => (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsVoting(true);
  }

  const handleButtonMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
  }
  const userVote = null as any;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <IonButtons style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <IonButton
          disabled={isVoting || userVote?.weight === 10}
          onMouseDown={handleButtonMouseDown}
          onClick={handleVoteClick(
            userVote
              ? userVote?.weight + 1
              : 1
          )}
          style={{
            color: (userVote?.weight || 0) > 0
              ? profile?.state.color
              : null,
            height: 20,
          
          }}
        >
          { 
            (userVote?.weight || 0) > 0
              ? <IonIcon icon={caretUpOutline} style={{
                  fontSize: 10,
                }}/>
              : <IonIcon icon={chevronUpOutline} style={{
                  fontSize: 10,
                }}/>
          }
        </IonButton>
        <IonButton
          disabled={isVoting}
          onMouseDown={handleButtonMouseDown}
          color='inherit'
          size='small'
          title={`${(userVote?.weight || 0) > 0 ? '+' : ''}${userVote?.weight || 0}`}
          style={{
            height: 20,
            fontSize: 10,
          }}
        >
          1
        </IonButton>
        <IonButton
          onMouseDown={handleButtonMouseDown}
          disabled={isVoting || userVote?.weight === -10}
          size='small' 
          onClick={handleVoteClick(
            userVote
              ? userVote?.weight - 1
              : -1
          )}
          style={{
            color: (userVote?.weight || 0) < 0
              ? profile?.state.color
              : null,
            height: 20,
          }}
        >
          {
            (userVote?.weight || 0) < 0
              ? <IonIcon icon={caretDownOutline} style={{
                  fontSize: 10,
                }}/>
              : <IonIcon icon={chevronDownOutline} style={{
                  fontSize: 10,
                }}/>
          }
        </IonButton>
      </IonButtons>
    </div>
  )
}