import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonInput, IonItem, IonLabel, IonModal, IonTextarea } from "@ionic/react";
import { useContext, useState } from "react";
import { AppContext } from "../app/AppProvider";
import useCreateNewTab from "../../hooks/useCreateNewTab";
import { EditorState, convertToRaw } from "draft-js";
import Editor from '@draft-js-plugins/editor';
import 'draft-js/dist/Draft.css';
import { CHAR_LIMIT } from "../../constants";

const CreateArrowModal = () => {
  const { showCreateArrowModal, setShowCreateArrowModal } = useContext(AppContext);

  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });

  const [text, setText] = useState('');

  const createNewTab = useCreateNewTab();


  const handleChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    setText(contentState.getPlainText('\n'));
  }

  const handleClose = () => {
    setShowCreateArrowModal(false);
  }

  const handleSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText('\n');
    const draft = JSON.stringify(convertToRaw(contentState));
    createNewTab({
      text,
      draft,
    });
    handleClose();
  }

  return (
    <IonModal isOpen={showCreateArrowModal} onWillDismiss={handleClose}>
      <IonCard style={{
        margin: 0,
        height: '100%',
      }}>
        <IonCardHeader>
          Create Arrow
        </IonCardHeader>
        <IonCardContent>
          <Editor 
            editorState={editorState} 
            onChange={handleChange}
            spellCheck={true}
            placeholder='Post text...'
          />
          <IonButtons>
            { text.length } / { CHAR_LIMIT }&nbsp;
            <IonButton disabled={text.length > CHAR_LIMIT} onClick={handleSubmit}>
              CREATE
            </IonButton>
            <IonButton onClick={handleClose}>
              CANCEL
            </IonButton>
          </IonButtons>
        </IonCardContent>
      </IonCard>
    </IonModal>
  )
}

export default CreateArrowModal;