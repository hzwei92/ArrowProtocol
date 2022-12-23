import { selectArrowByTxId } from "../../redux/slices/arrowSlice";
import { selectEntryById } from "../../redux/slices/entrySlice";
import { useAppSelector } from "../../redux/store";
import EntryComponent from "./EntryComponent";

interface EntryTreeProps {
  entryId: string;
  depth: number;
}

export default function EntryTree({ entryId, depth }: EntryTreeProps) {
  const entry = useAppSelector(state => selectEntryById(state, entryId));
  const arrow = useAppSelector(state => selectArrowByTxId(state, entry.arrowTxId));
  if (!entry || entry.isDeleted) return null;


  const handleLoadClick = (event: React.MouseEvent) => {
    if (entry.showIns) {
      //getIns(entry.inIds.length >= LOAD_LIMIT ? entry.inIds.length : 0);
    }
    else if (entry.showOuts) {
      //getOuts(entry.outIds.length >= LOAD_LIMIT ? entry.outIds.length : 0);
    }
  }

  let remaining = 0;
  let entryIds = [] as string[];

  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <EntryComponent entry={entry} depth={depth} />
      </div>
      <div style={{
        borderLeft: entry.showIns || entry.showOuts
          ? `2px solid ${arrow.state.color}`
          : undefined,
        marginLeft: 5,
      }}>
        {
          entryIds.map(entryId => {
            return (
              <EntryTree
                key={`surveyor-tree-${entryId}`}
                entryId={entryId}
                depth={depth + 1}
              />
            )
          })
        }
        {
          remaining > 0
            ? <div onClick={handleLoadClick} style={{
                fontSize: 12,
                marginTop: 5,
                marginLeft: 4,
                textAlign: 'left',
                cursor: 'pointer',
              }}>
                <div style={{
                  color: arrow.state.color,
                }}>
                  load {remaining} more
                </div>
              </div>
            : null
        }
      </div>
    </div>
  );
}