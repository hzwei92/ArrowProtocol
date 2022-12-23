import { ArrowState } from "./types";
import { DeployArrowProps } from "./actions/write/useDeployArrow";

const initializeArrowState = ({ 
  walletAddress, 
  uuid, 
  name, 
  description, 
  color,
  data, 
  sourceAddress, 
  targetAddress, 
  parentAddress, 
  date
}: DeployArrowProps) => {
  const state: ArrowState = {
    uuid,
    name,
    description,
    color: color || '#' + Math.round(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'),
    data,
    weight: 0,
    creatorAddress: walletAddress,
    sourceAddress,
    targetAddress,
    parentAddress,
    twigs: [{
      x: 0,
      y: 0,
      creatorAddress: walletAddress,
      detailAddress: '',
      parentTwigI: null,
      sourceTwigI: null,
      targetTwigI: null,
      createDate: date,
      updateDate: date,
      deleteDate: null,
    }],
    twigIs: [0],
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
      permits: ['readSubgraph', 'createTwig', 'updateTwig', 'deleteTwig'],
      pointThreshold: 1000000,
      createDate: date,
      updateDate: date,
      deleteDate: null,
    }, {
      name: 'non-member',
      description: 'A non-member is someone with 0 points',
      permits: ['readSubgraph', 'createTwig'],
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