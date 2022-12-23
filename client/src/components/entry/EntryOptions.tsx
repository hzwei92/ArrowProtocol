import { IonButton, IonButtons, IonPopover } from "@ionic/react"
import { Dispatch, SetStateAction, useContext } from "react";
import { selectSlice } from "../../redux/slices/explorerSlice";
import { useAppSelector } from "../../redux/store";
import { Arrow, Entry } from "../../types"
import { AppContext } from "../app/AppProvider";

interface EntryOptionsProps {
  entry: Entry;
  arrow: Arrow;
  depth: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const EntryOptions = ({ entry, arrow, depth, isOpen, setIsOpen }: EntryOptionsProps) => {
  const { walletAddress } = useContext(AppContext);

  const slice = useAppSelector(selectSlice);

  const handlePromoteClick = () => {
    handleClose();
  }
  const handleUnsubClick = () => {

  }
  const handleSubClick = () => {

  }
  const handleCopyClick = () => {

  }
  const handlePasteClick = () => {

  }
  const handleClose = () => {
    setIsOpen(false);
  }
  return (
    <IonPopover trigger={`entry-options-${entry.id}`} isOpen={isOpen} onWillDismiss={handleClose}>
      <div style={{
        margin: 10,
        borderBottom: '1px solid',
        paddingTop: 5,
        paddingBottom: 10,
      }}>
        <IonButtons>
          <IonButton disabled={depth === 0 && slice.entryIds.length === 1} onClick={handlePromoteClick}>
            MOVE TO TOP
          </IonButton>
        </IonButtons>
        <IonButtons>
          {
            false// ?? isSubbed
              ? <IonButton 
                  disabled={arrow.state.creatorAddress === walletAddress}
                  onClick={handleUnsubClick}
                >
                  UNSUBSCRIBE
                </IonButton>
              : <IonButton onClick={handleSubClick}>
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
        padding: 10,
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
            color: arrow.state.color
          }}>
            {arrow.state.creatorAddress}
          </div>
        </div>
      </div>
    </IonPopover>
  )
}

export default EntryOptions