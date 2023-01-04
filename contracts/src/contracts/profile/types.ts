export interface Lead {
  txId: string; // Profile.txId of the lead; a lead is a Profile trusted for its upvotes/indexing
  scalar: number; // the scalar to apply to the lead's upvotes
  createDate: number;
  updateDate: number;
  deleteDate: number | null;
}

export interface ProfileState {
  creatorAddress: string;
  uuid: string; 
  text: string;
  draft: string;
  color: string;
  data: string;
  tabs: string[]; // txIds of Arrows that are tabs
  leads: Lead[]; // the Profiles that are trusted sources for upvotes/indexing
  txIdToUpvotes: { // map of arrow.txId to number of upvotes for
    [txId: string]: number
  };
  sourceTxIdToTxIdToTrue: { // index of arrows by sourceTxId; a txId can be in this index if txIdToWeight[txId] !== undefined
    [sourceTxId: string]: {
      [txId: string]: true
    }
  };
  targetTxIdToTxIdToTrue: { // index of arrows by targetTxId; a txId can be in this index if txIdToWeight[txId] !== undefined
    [targetTxId: string]: {
      [txId: string]: true
    }
  };
  totalPoints: number; // the total number of points in the system, i.e. 10^9 points per profile
  // the ownership of the profile;
  // if you own a portion of the profile you may be entitled to a proprotion of the ad revenue generated by the profile
  addressToPointBalance: {
    [address: string]: number 
  };
  createDate: number;
  updateDate: number;
  deleteDate: number | null;
}

export interface ProfileAction {
  input: ProfileInput;
  caller: string;
}

export interface ProfileInput {
  function: ProfileFunction;
  text?: string;
  draft?: string;
  color?: string;
  tabs?: string[];
}


export interface ProfileResult {
}

export type ProfileFunction = 'writeTabs';

export type ContractResult = { state: ProfileState } | { result: ProfileResult };