import { PollState } from "./types";
import { v4 } from 'uuid';

interface GetInitStateProps {
  creatorAddress: string;
  profileTxId: string;
  defaultTabs: string[];
}
export const getInitState = ({
  creatorAddress,
  profileTxId,
  defaultTabs,
}: GetInitStateProps) => {
  const date = Date.now();
  const initState: PollState = {
    uuid: v4(),
    text: '',
    draft: '',
    data: '',
    creatorAddress,
    addressToProfileTxId: {
      [creatorAddress]: profileTxId,
    },
    defaultTabs,
    createDate: date,
    updateDate: date,
    deleteDate: null,
  };

  return initState;
}