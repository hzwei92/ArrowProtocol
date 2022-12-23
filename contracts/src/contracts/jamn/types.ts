export interface Profile {
  address: string;
  name: string;
  description: string;
  color: string;
  tabs: string[];
  pointBalance: number;
  createDate: number;
  updateDate: number;
  deleteDate: number | null;
}

export interface JamnState {
  uuid: string; 
  name: string;
  description: string;
  data: string;
  creatorAddress: string;
  profiles: Profile[];
  addressToProfileI: {
    [address: string]: number;
  };
  defaultTabs: string[];
  createDate: number;
  updateDate: number;
  deleteDate: number | null;
}

export interface JamnAction {
  input: JamnInput;
  caller: string;
}

export interface JamnInput {
  function: JamnFunction;
  name?: string;
  description?: string;
  color?: string;
  date?: number;
  tabs?: string[];
}


export interface JamnResult {
  profile: Profile | undefined;
}

export type JamnFunction = 'register' | 'readProfile' | 'writeTabs';

export type ContractResult = { state: JamnState } | { result: JamnResult };
