export interface Twig {
  id: string; // UUID

  // i: number; // index is the position of this twig in the array of twigs, 

  // (x, y, z) coords of the twig are absolute, 
  // relative to the container arrow, i.e. the root twig, i.e. containerArrowState.twigs[0]
  x: number; 
  y: number;
  z: number;

  // abstractAddress: string; // the address of the arrow that contains this twig
  detailAddress: string; // the address of the arrow that the twig embeds within the container arrow.

  parentTwigId: string; // the twigs form a tree structure; dragging a twig will move the whole subtree

  createDate: number;
  updateDate: number;
  deleteDate: number | null;
}

export interface Vote {
  id: string; // UUID
  
  voterAddress: string;

  // quantity measured in AR tokens? ensure in handller that funds actually transfered to control of the Arrow address
  quantity: number; 

  createDate: number;
  updateDate: number;
  deleteDate: number | null;
}

export type Permit = 
'readSubgraph' | // this puts up a minor paywall to view the arrow's subgraph, on cooperative block/Arrow explorers
'createTwig' | // this resricts who can add an arrow to the subgraph
// this restricts who can modify the layout of the subgraph--
// it's a tree-shaped layout, so this means translating a post's x,y,z coords or changing its parent
'updateTwig' |
'deleteTwig' | // this restricts who can remove an arrow from the subgraph; of course this doesn't delete the arrow itself
'manageRoles'; // this restricts who can create/update/delete roles on the Arrow.


export interface Role {
  id: string; // UUID

  name: string; // the name of the role
  description: string; // the description of the role

  permits: Permit[] // the permissions avaialable to owners with this role

  pointThreshold: number; // the minimum number of points required to hold this role

  createDate: number;
  updateDate: number;
  deleteDate: number | null;
}


export interface ArrowState {
  // idAddress: string; // this is the address of the contract itself; is this necessary?
  name: string; // the title of the arrow
  data: string; // this is the payload of the arrow

  creatorAddress: string; // the address of the creator of the arrow

  // the arrow connects two Arrows, source --> target; 
  // an Arrow is just a transaction, 
  // where if sourceAddress !== targetAddress then the Arrow functions as a link. 
  // Otherwise, the Arrow functions as a post. So all transactions are de facto posts.
  sourceAddress: string; 
  targetAddress: string;


  // the original Arrow in which this Arrow is embedded
  // the arrow may be embedded in multiple Arrows, via those Arrows' twigs
  // however, the parentArrow is the Arrow in which this Arrow was created
  parentAddress: string | null;

  // the arrow contains within it a tree structure of twigs;
  // each twig is the embedding of a transaction within the arrow, 
  // as content that supplements the arrow's data. 
  // Arrows are indexed into subgraphs by Arrows; this is defined by the Twigs.
  twigs: Twig[]; 

  // the arrow can be weighted by votes; 
  // it functions like a bank for AR tokens, 
  // as committed tokens can be withdrawn minus fees and/or negative interest. 
  // The votes are supposed to generate interest in a literal sense, 
  // by advertising the target from the platform of the source.
  votes: Vote[]; 

  // ownership determines voting power for intra-arrow decisions, such as changing the name or data of the arrow.
  // ownership determines the payout of fees and interest collected from deposits made via voting
  // ownership is divided into 10^9 points; each point is worth a nano-share of the arrow's expected profit
  addressToPoints: {
    [address: string]: number;
  }

  // roles are assigned to owners based on how many points they own
  // roles determine priviliges within the arrow
  roles: Role[];

  createDate: number;
  updateDate: number;
  deleteDate: number | null;
}

export interface ArrowAction {
  input: ArrowInput;
  caller: string;
}

export interface ArrowInput {
  function: ArrowFunction;
  id: string;
  name: string;
}

export type ArrowResult = string;

export type ArrowFunction = 'arrowRead' | 'arrowWrite';

export type ContractResult = { state: ArrowState } | { result: ArrowResult };
