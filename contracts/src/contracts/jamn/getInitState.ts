import { JamnState } from "./types";
import { v4 } from 'uuid';

export const getInitState = (
  creatorAddress: string, 
  defaultTabAddresses: string[],
) => {
  const date = Date.now();
  const initState: JamnState = {
    uuid: v4(),
    name: '',
    description: '',
    data: '',
    creatorAddress,
    profiles: [{
      address: creatorAddress,
      name: '',
      description: '',
      color: '',
      pointBalance: 1000000000,
      tabs: [...defaultTabAddresses],
      createDate: date,
      updateDate: date,
      deleteDate: null,
    }],
    addressToProfileI: {
      [creatorAddress]: 0,
    },
    defaultTabs: [...defaultTabAddresses],
    createDate: date,
    updateDate: date,
    deleteDate: null,
  };

  return initState;
}