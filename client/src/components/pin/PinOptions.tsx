import { IonButton, IonButtons, IonPopover } from "@ionic/react";
import { Dispatch, SetStateAction, useContext } from "react";
import { AppContext } from "../app/AppProvider";
import { Pin } from "../../warp/arrow/types";
import { Arrow } from "../../types";

interface PinOptionsProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  i: number;
  pin: Pin
  arrow: Arrow;
}
const PinOptions = ({ isOpen, setIsOpen, i, pin, arrow }: PinOptionsProps) => {
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
    //navigator.clipboard.writeText(`https://mindscape.pub/g/${abstract?.routeName}/${props.pin.i}`);
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
    //dispatch(setCommitArrowId(props.pin.detailId))
  }
  const handleClose = () => {
    setIsOpen(false);
  }
  return (
    <IonPopover trigger={'pinOptions-' + i} isOpen={isOpen} onWillDismiss={handleClose}>
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
              pinCreatorAddress
            </div>
            <div style={{
              display: 'table-cell',
            }}>
              {pin.creatorAddress}
            </div>
          </div>
        </div>
      </IonPopover>
  );
}

export default PinOptions;