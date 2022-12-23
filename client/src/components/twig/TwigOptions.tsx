import { IonButton, IonButtons, IonPopover } from "@ionic/react";
import { Dispatch, SetStateAction, useContext } from "react";
import { AppContext } from "../app/AppProvider";
import { Twig } from "../../warp/arrow/types";
import { Arrow } from "../../types";

interface TwigOptionsProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  i: number;
  twig: Twig
  arrow: Arrow;
}
const TwigOptions = ({ isOpen, setIsOpen, i, twig, arrow }: TwigOptionsProps) => {
  const { walletAddress } = useContext(AppContext);

  const handleCopyClick = () => {

  }

  const handlePasteClick = () => {

  }

  const handleCopyURLClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    //navigator.clipboard.writeText(`https://mindscape.pub/g/${arrow?.routeName}`);
  }

  const handleCopyRelativeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    //navigator.clipboard.writeText(`https://mindscape.pub/g/${abstract?.routeName}/${props.twig.i}`);
  }

  const handleSubscribeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleClose()
  }
  
  const handleUnsubscribeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleClose()
  }

  const handleCommitClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    //dispatch(setCommitArrowId(props.twig.detailId))
  }
  const handleClose = () => {
    setIsOpen(false);
  }
  return (
    <IonPopover trigger={'twigOptions-' + i} isOpen={isOpen} onWillDismiss={handleClose}>
        <div style={{
          margin: 10,
          borderBottom: '1px solid',
          paddingTop: 5,
          paddingBottom: 10,
        }}>
          <IonButtons>
            {
              false //isSubbed
                ? <IonButton
                    disabled={
                      arrow.state.creatorAddress === walletAddress
                    } 
                    onClick={handleUnsubscribeClick}
                  >
                    UNSUBSCRIBE
                  </IonButton>
                : <IonButton onClick={handleSubscribeClick}>
                    SUBSCRIBE
                  </IonButton>
            }
          </IonButtons>
          <IonButtons>
            <IonButton onClick={handleCopyClick}>
              COPY
            </IonButton>
            <IonButton disabled={true} onClick={handlePasteClick}>
              PASTE
            </IonButton>
          </IonButtons>
        </div>
        <div style={{
          display: 'table',
          borderSpacing: 10,
        }}>
          <div style={{
            display: 'table-row',
            flexDirection: 'row',
          }}>
            <div style={{
              display: 'table-cell',
              fontWeight: 'bold',
            }}>
              arrowTxId
            </div>
            <div style={{
              display: 'table-cell',
            }}>
              {arrow.txId}
            </div>
          </div>
          <div style={{
            display: 'table-row',
          }}>
            <div style={{
              display: 'table-cell',
              fontWeight: 'bold',
            }}>
              arrowCreatorAddress
            </div>
            <div style={{
              display: 'table-cell',
            }}>
              {arrow.state.creatorAddress}
            </div>
          </div>
          <div style={{
            display: 'table-row',
          }}>
            <div style={{
              display: 'table-cell',
              fontWeight: 'bold',
            }}>
              twigCreatorAddress
            </div>
            <div style={{
              display: 'table-cell',
            }}>
              {twig.creatorAddress}
            </div>
          </div>
        </div>
      </IonPopover>
  );
}

export default TwigOptions;