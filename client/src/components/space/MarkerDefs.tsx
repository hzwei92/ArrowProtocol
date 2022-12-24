import { selectFrame, selectTxIdToArrow } from "../../redux/slices/arrowSlice";
import { useAppSelector } from "../../redux/store";
import { IdToType } from "../../types";


const MarkerDefs = () => {
  const frame = useAppSelector(selectFrame);
  const txIdToArrow = useAppSelector(selectTxIdToArrow);

  const colorToTrue: IdToType<true> = {};

  frame?.state.comments.forEach(t => {
    if (!t.detailAddress) return;
    if (t.sourceCommentI === null || t.targetCommentI === null) return;
    if (t.sourceCommentI === t.targetCommentI) return;

    const a = txIdToArrow[t.detailAddress];

    if (!a) return;

    colorToTrue[a.state.color] = true;
  });

  return (
    <defs>
    { 
      Object.keys(colorToTrue).map(color => {
        return (
          <marker 
            key={`marker-${color}`}
            id={`marker-${color}`} 
            markerWidth='6'
            markerHeight='10'
            refX='7'
            refY='5'
            orient='auto'
          >
            <polyline 
              points='0,0 5,5 0,10'
              fill='none'
              stroke={color}
              strokeWidth={2}
            />
          </marker>
        )
      })
    }
  </defs>
  )
}

export default MarkerDefs;