export interface Comment {
  creatorAddress: string; // the address of the user that created this comment

  // abstractAddress: string; // the address of the arrow that contains this comment
  txId: string | null; // the address of the arrow that the comment embeds within the container arrow.

  parentCommentI: number | null; // parentComment.i the comments form a tree structure; dragging a comment will move the whole subtree
  
  sourceCommentI: number | null; // if detailArrow is to be rendered as a link, this is the comment that holds detailArrow.source
  targetCommentI: number | null; // if detailArrow is to be rendered as a link, this is the comment that holds detailArrow.target
  
  // x, y are rel to origin
  x: number; 
  y: number;

  createDate: number;
  updateDate: number;
  deleteDate: number | null;
}

export interface Vote {
  creatorAddress: string;

  // weight, measured in AR tokens? ensure in handler that funds actually transfered to control of the Arrow address
  weight: number; 

  createDate: number;
  updateDate: number;
  deleteDate: number | null;
}

export type Permit = 
  // this puts up a minor paywall to view the arrow's subgraph, on cooperative block/Arrow explorers
  'readSubgraph' | 
  // this resricts who can add an arrow to the subgraph
  'createComment' | 
  // this restricts who can modify the layout of the subgraph--
  // it's a tree-shaped layout, so this means translating a post's x,y,z coords or changing its parent
  'updateComment' |
  // this restricts who can remove an arrow from the subgraph; of course this doesn't delete the arrow itself
  'deleteComment' |
  // this restricts who can create/update/delete roles on the Arrow.
  'manageRoles'; 


export interface Role {
  name: string; // the name of the role
  description: string; // the description of the role

  permits: Permit[] // the permissions avaialable to owners with this role

  pointThreshold: number; // the minimum number of points required to hold this role

  createDate: number;
  updateDate: number;
  deleteDate: number | null;
}


export interface ArrowState {
  uuid: string;
  name: string; // the title of the arrow
  description: string // the description of the arrows
  color: string;
  weight: number;
  data: string; // this is the payload of the arrow

  creatorAddress: string; // the address of the creator of the arrow

  // the arrow connects two Arrows, source --> target; 
  // an Arrow is just a transaction, 
  // where if sourceTxId !== targetTxId then the Arrow functions as a link. 
  // Otherwise, the Arrow functions as a post. So all transactions are de facto posts.
  sourceTxId: string | null; 
  targetTxId: string | null;


  // the original Arrow in which this Arrow is embedded
  // the arrow may be embedded in multiple Arrows, via those Arrows' comments
  // however, the parentArrow is the Arrow in which this Arrow was created
  parentTxId: string | null;

  // the arrow contains within it a tree structure of comments;
  // each comment is the embedding of an Arrow within this Arrow, as content 
  // as content that supplements the arrow's data. 
  // Arrows are indexed into subgraphs by Arrows; this is defined by the Comments.
  comments: Comment[]; 

  commentIs: number[]; // the indexes of the comments in the comments array, ordered by increasing z-index

  // the arrow can be weighted by votes; 
  // it functions like a bank for AR tokens, 
  // as committed tokens can be withdrawn minus fees and/or negative interest. 
  // The votes are supposed to generate interest in a literal sense, 
  // by advertising the target from the platform of the source.
  votes: Vote[]; 

  // ownership determines voting power for intra-arrow decisions, such as changing the name or data of the arrow.
  // ownership determines the payout of fees and interest collected from deposits made via voting
  // ownership is divided into 10^9 points; each point is worth a nano-share of the arrow's expected profit
  addressToPointBalance: {
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
  txId?: string;
  parentCommentI?: number;
  sourceCommentI?: number | null;
  targetCommentI?: number | null;
  x?: number;
  y?: number;
  date?: number;
  comments?: Comment[];
}

export type ArrowResult = string;

export type ArrowFunction = 'createComment' | 'writeComments';

export type ContractResult = { state: ArrowState } | { result: ArrowResult };
