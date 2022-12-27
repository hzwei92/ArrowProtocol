import { useContext, useEffect, useState } from "react";
import { Arrow } from "../../types";
import { AppContext } from "../app/AppProvider";
import { ContentState, convertFromRaw, convertToRaw, EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import 'draft-js/dist/Draft.css';
import { IonButton, IonButtons } from "@ionic/react";
import { CHAR_LIMIT } from "../../constants";
import useWriteDraftAndText from "../../warp/arrow/actions/write/useWriteDraftAndText";

interface ArrowEditorProps {
  arrow: Arrow;
}
const ArrowEditor = ({ arrow }: ArrowEditorProps) => {
  const { walletAddress } = useContext(AppContext);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    let editorState1: EditorState;
    if (arrow.state.draft) {
      const contentState = convertFromRaw(JSON.parse(arrow.state.draft));
      editorState1 = EditorState.createWithContent(contentState);
    }
    else if (arrow.state.text) {
      const contentState = ContentState.createFromText(arrow.state.text);
      editorState1 = EditorState.createWithContent(contentState);
    }
    else {
      editorState1 = EditorState.createEmpty();
    }
    setEditorState(editorState1);
  }, [arrow.txId])

  const [text, setText] = useState(arrow.state.text);

  const writeDraftAndText = useWriteDraftAndText();

  const handleChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    setText(contentState.getPlainText('\n'));
  }

  const handleSubmit = () => {
    const contentState = editorState.getCurrentContent();
    const draft = JSON.stringify(convertToRaw(contentState));
    if (text.length <= 280) {
      writeDraftAndText({
        txId: arrow.txId,
        draft,
        text,
        date: Date.now(),
      });
    }
    else {
      console.log('text too long');
    }
  }

  return (
    <div>
      <Editor 
        editorState={editorState} 
        onChange={handleChange}
        readOnly={walletAddress !== arrow.state.creatorAddress}
        spellCheck={true}
        placeholder={arrow.state.creatorAddress === walletAddress
          ? arrow.state.sourceTxId === arrow.state.targetTxId ? 'Post text...' : 'Link text...'
          : ''
        }
      />
      {
        walletAddress === arrow.state.creatorAddress && (
          <IonButtons>
            { text.length } / { CHAR_LIMIT }
            <IonButton disabled={text.length > CHAR_LIMIT} onClick={handleSubmit} style={{
              fontSize: 10,
            }}>
              SAVE
            </IonButton>
          </IonButtons>
        )
      }
    </div>
  );
}


export default ArrowEditor;