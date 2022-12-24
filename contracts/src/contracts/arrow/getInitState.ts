import { ArrowState } from "./types";
import { v4 } from 'uuid';

export const getInitState = (
  creatorAddress: string, 
  sourceTxId: string, 
  targetTxId: string, 
  parentTxId: string,
) => {
  const date = Date.now();
  const initState: ArrowState = {
    uuid: v4(),
    name: 'JAMN testnet Arrow',
    description: 'JAMN is a community of citizen journalists. The Arrow Protocol is our tool for organizing and sharing information.',
    color: '#' + Math.round(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'),
    weight: 0,
    data: '',
    creatorAddress,
    sourceTxId,
    targetTxId,
    parentTxId,
    comments: [{
      creatorAddress,
      txId: null,
      parentCommentI: null,
      sourceCommentI: null,
      targetCommentI: null,
      x: 0,
      y: 0,
      isExpanded: true,
      createDate: date,
      updateDate: date,
      deleteDate: null,
    }],
    commentIs: [0],
    votes: [{
      creatorAddress,
      weight: 1,
      createDate: date,
      updateDate: date,
      deleteDate: null,
    }],
    roles: [{
      name: 'member',
      description: 'A member owns at least 1e6 points, i.e. 1e-3 of the supply',
      permits: ['readSubgraph', 'createComment', 'updateComment', 'deleteComment'],
      pointThreshold: 1000000,
      createDate: date,
      updateDate: date,
      deleteDate: null,
    }, {
      name: 'non-member',
      description: 'A non-member is someone with 0 points',
      permits: ['readSubgraph', 'createComment'],
      pointThreshold: 0,
      createDate: date,
      updateDate: date,
      deleteDate: null,
    }],
    addressToPointBalance: {
      [creatorAddress]: 1000000000,
    },
    createDate: date,
    updateDate: date,
    deleteDate: null,
  };

  return initState;
}