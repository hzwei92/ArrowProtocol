import { IonCard } from '@ionic/react';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { selectArrowByTxId } from '../../redux/slices/arrowSlice';
import { mergeEntries } from '../../redux/slices/entrySlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Entry } from '../../types';
import ArrowComponent from '../arrow/ArrowComponent';
import EntryControls from './EntryControls';

interface EntryComponentProps {
  entry: Entry;
  depth: number;
}

export default function EntryComponent(props: EntryComponentProps) {
  const dispatch = useAppDispatch();

  const arrow = useAppSelector(state => selectArrowByTxId(state, props.entry.arrowTxId));

  useEffect(() => {
    if (!props.entry.shouldGetLinks) return;
    if (props.entry.showOuts) {
      //getOuts(0);
    }
    else if (props.entry.showIns) {
      //getIns(0);
    }
    dispatch(mergeEntries([{
      ...props.entry,
      shouldGetLinks: false,
    }]));
  }, [props.entry.shouldGetLinks]);


  useEffect(() => {
    if (props.entry.showOuts || props.entry.showIns) return;
    if (arrow.state.sourceTxId === arrow.state.targetTxId) return;
    //getEndpoints();
  }, [props.entry.showOuts, props.entry.showIns]);

  const handleClick = (e: MouseEvent) => {

  }

  const handleMouseEnter = (e: MouseEvent) => {

  }

  const handleMouseLeave = (e: MouseEvent) => {

  }

  if (!arrow) return null;

  const isLinking = false;

  return (
    <IonCard
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      onClick={handleClick}
      style={{
        margin: 5,
        marginBottom: 0,
        width: 'calc(100% - 10px)',
        backgroundColor: isLinking
          ? arrow.state.color
          : null,
        cursor: false //pendingLink.sourceArrowId
          ? 'crosshair'
          : null, 
        borderLeft: arrow.state.sourceTxId === arrow.state.targetTxId
          ? `4px solid ${arrow.state.color}`
          : null,
        padding: 10,
        paddingLeft: 7,
        position: 'relative',
      }}
    >
      <div>
      <ArrowComponent
        arrow={arrow}
        showLinkLeft={!!props.entry.targetEntryId && props.entry.targetEntryId === props.entry.parentEntryId}
        showLinkRight={!!props.entry.sourceEntryId && props.entry.sourceEntryId === props.entry.parentEntryId}
      />
      <EntryControls
        entry={props.entry}
        arrow={arrow}
        depth={props.depth}
      />
      {
        props.entry.bonusText && (
          <div style={{
            marginLeft: 14,
            marginTop: 10,
            fontSize: 10,
          }}>
            {props.entry.bonusText && props.entry.bonusText.map((text, i) => {
              return (
                <div key={i}>
                  {text}
                </div>
              )
            })}
          </div>
        )
      }
      </div>
    </IonCard>
  )
}