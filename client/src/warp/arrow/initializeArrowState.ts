import { ArrowState } from "./types";
import { DeployArrowProps } from "./actions/write/useDeployArrow";

const initializeArrowState = ({ 
  walletAddress, 
  data,
  uuid, 
  text, 
  draft, 
  color,
  sourceTxId, 
  targetTxId, 
  parentTxId, 
  date
}: DeployArrowProps) => {
  const state: ArrowState = {
    data,
    uuid,
    text,
    draft,
    color: color || '#' + Math.round(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'),
    weight: 0,
    creatorAddress: walletAddress,
    sourceTxId,
    targetTxId,
    parentTxId,
    comments: [{
      creatorAddress: walletAddress,
      txId: '',
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
      creatorAddress: walletAddress,
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
      [walletAddress]: 1000000000,
    },
    createDate: date,
    updateDate: date,
    deleteDate: null,
  };

  return state;
}

export default initializeArrowState;