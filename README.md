# The Arrow Protocol 
Using smart contracts, 
instead of embedded URLs (aka hyperlinks), 
as the arrows that organize the objects of the Web.

# Why
Sorting a data structure facilitates searching it later.

Crowdsourcing the organization of the Web into a weighted directed graph
would allow us to browse more intelligently. 

Arrows are better suited to this task than hyperlinks.
Both function as linkage mechanisms, 
but hyperlinks are embedded within posts, 
while Arrows have been abstracted out from posts to exist alongside them. 
This means that: 

(1) Hyperlinks are only easily detectable/traversable in one direction.
In contrast, Arrows can be indexed by sourceURI and targetURI,
enabling one to easily query for Arrows pointing into and out from specific posts.

(2) To modify the hyperlinks pointing out from a post one must modify the post itself, 
which requires that 
(A) the post be mutable and that 
(B) the person writing the hypering has permissions to write to the post.
On the other hand, Arrows exist alongside posts, 
and they can be modified independently of the posts.

(3) If we imagine the Arrow to be a row in a database, 
we can extend the schema (id, sourceId, targetId)
with other data, like the identity of the author, 
the number of upvotes deposited, timestamps, text, types, etc.

(4) By putting Arrows onchain, as smart contracts stored in Arweave,
we store the Arrows in a durable, decentralized, and censorship-resistant manner.


# The Problem
The problem that Arrows address is the optimization of open-ended search through the Web.

This is the same type of search problem that people address using timelines and algorithmic feeds.

How do we make the Web surfable?

Arrows will guide people through the content, facillitating this type of browsing search.

Keyword search helps you find known unknowns; you can name some part of the unknown.

Browsing search helps you find unknkown unknonws; once keyword search inserts you into the graph,
you have to browse around, reading hypertext, to find the new keyword.

If browsing resembles A* search, 
then the weight of links is inversely proportional to the cost of traversing that link.


# A Web of Arrows
Each Arrow is a Warp/SmartWeave contract that defines a sourceTxId and a targetTxId in its state.
Each Arrow is also tagged with `Arrow-Source-TxId` and `Arrow-Target-TxId`.

Think of the Arrow as the Permaweb's version of the Tweet.

If an Arrow has sourceTxId === targetTxId === null, then the Arrow functions as a Post.
Think of the Post as an Arrow that loops around to point back into itself.

Otherwise, the Arrow has sourceTxId !== targetTxId, and the Arrow functions as a Link.

Together, Posts and Links define a Web structure similar to a directed graph.
Except it's more like a kind of hypergraph, because we can Link not only between (Post, Post) pairs,
but also between (Link, Link), as well as (Post, Link).


# Inside each Arrow, a forum
Each Arrow defines an internal space that is moderated by the creator of the Arrow.

Within each Arrow, people can pin Posts into a tree structure,
and they can pin Links between the Posts there as well.

This mechanism of pinning gives users the ability to define a subgraph of Arrows, 
identifying this composition of Arrows with a txId. 

Each Arrow is an enzyme for people's attention, bringing them into conversation.


# Upvote Arrows by indexing them
A Profile is a smart contract controlled by a single wallet,
used to define a collection of the indexes of Arrows.

Each Profile indexes Arrows in several ways, including:

(1) tabs; a list of the Arrow.txId that the user is viewing in their tabs.

(2) arrowTxIdToUpvotes; a map from Arrow.txId to the integer number of upvotes the user has assigned to it 

(3) sourceTxIdToTxIdToTrue; the Arrows in (2), indexed by sourceTxId

(4) targetTxIdToTxIdToTrue; the Arrows in (2), indexed by targetTxId

(5) leads; a list of Profile.txId that the user trusts to use for indexes.


# Participate in Polls, i.e. indexing pools
A Poll is a smart contract that aggregates the upvotes/indices of the participating Profiles.

A user only has access to the Links they have upvoted/indexed and the Links upvoted/indexed by their leads.

A new user will not be featured in any Profile's leads; how do they get their Links get discovered?

They can participate in a Poll, to expose their Links to Profiles that follow that Poll.

Additionally, by pinning Arrows inside of other Arrows, they can get exposure.


# Conclusion

The Arrow Protocol is a protocol for organizing the Web into a weighted directed graph.

See https://mindscape.pub/g/arrow-protocol/0 for more details.

mindscape.pub is a prototype for the Arrow Protocol client currently in development.