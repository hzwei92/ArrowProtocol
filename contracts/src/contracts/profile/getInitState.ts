import { ProfileState } from "./types";
import { v4 } from 'uuid';

interface GetInitStateProps {
  creatorAddress: string;
}
export const getInitState = ({ creatorAddress }: GetInitStateProps) => {
  const date = Date.now();
  const initState: ProfileState = {
    uuid: v4(),
    text: 'JAMN',
    draft: '',
    data: '',
    color: '#' + Math.round(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'),
    creatorAddress,
    tabs: [],
    leads: [],
    totalPoints: 10 ** 9,
    addressToPointBalance: {
      [creatorAddress]: 10 ** 9,
    },
    txIdToUpvotes: {},
    sourceTxIdToTxIdToTrue: {},
    targetTxIdToTxIdToTrue: {},
    createDate: date,
    updateDate: date,
    deleteDate: null,
  };

  return initState;
}