export interface PollState {
  uuid: string; 
  text: string;
  draft: string;
  data: string;
  creatorAddress: string;
  addressToProfileTxId: {
    [address: string]: string;
  };
  defaultTabs: string[];
  createDate: number;
  updateDate: number;
  deleteDate: number | null;
}

export interface PollAction {
  input: PollInput;
  caller: string;
}

export interface PollInput {
  function: PollFunction;
  profileTxId?: string;
}


export interface PollResult {
  profileTxId?: string;
  defaultTabs?: string[];
}

export type PollFunction = 'registerProfileTxId' | 'readProfileTxId' | 'readDefaultTabs';

export type ContractResult = { state: PollState } | { result: PollResult };
