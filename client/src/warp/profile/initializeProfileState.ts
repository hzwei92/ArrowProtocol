import { ProfileState } from "./types";
import { DeployProfileProps } from "./actions/write/useDeployProfile";

// initialize profile state
const initializeProfileState = ({ 
  walletAddress, 
  data,
  uuid, 
  text, 
  draft, 
  color,
  date,
  tabs,
}: DeployProfileProps) => {
  const state: ProfileState = {
    data,
    uuid,
    text,
    draft,
    color: color,
    creatorAddress: walletAddress,
    tabs,
    leads: [],
    txIdToUpvotes: {},
    sourceTxIdToTxIdToTrue: {},
    targetTxIdToTxIdToTrue: {},
    totalPoints: 1000000000,
    addressToPointBalance: {
      [walletAddress]: 1000000000,
    },
    createDate: date,
    updateDate: date,
    deleteDate: null,
  };

  return state;
}

export default initializeProfileState;