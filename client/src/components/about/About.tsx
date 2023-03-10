import { IonCard, IonCardContent, IonCardHeader } from "@ionic/react";
import { useContext } from "react";
import { OFF_WHITE, TAB_HEIGHT } from "../../constants";
import { AppContext } from "../app/AppProvider";

const About = () => {
  const { isDarkMode } = useContext(AppContext);

  return (
    <IonCard style={{
      margin: 0,
      borderRadius: 0,
      backgroundColor: isDarkMode
        ? 'black'
        : OFF_WHITE,
      height: '100%',
    }}>
      <IonCardHeader style={{
        height: TAB_HEIGHT,
      }}>
        ABOUT
      </IonCardHeader>
      <IonCardContent style={{
        height: `calc(100% - ${TAB_HEIGHT}px)`,
        overflowY: 'scroll',
        padding: 0,
      }}>
        <IonCard style={{
          marginTop: 0,
        }}>
          <IonCardHeader style={{
            fontWeight: 'bold',
          }}>
            Introduction
          </IonCardHeader>
          <ul style={{
            marginTop: 0,
            paddingRight: 10,
          }}>
            <li>
              You know how we browse the Web one page at a time?

              Imagine zooming out to see the pages and links of the Web
              displayed as a <b>graph</b> (i.e. a flowchart). 
            </li>
            <li>
              Suppose you could <b>upvote/downvote</b> the links of the graph 
              to prioritize them for browsing,
              thus helping to direct the flow of attention across the Web.
            </li>
            <li>
              What if you could <b>filter</b> these votes by various demographics
              (e.g.the people you follow)
              to see the information digest of a particular slice of the population?
            </li>
          </ul>
        </IonCard>
        <IonCard>
          <IonCardHeader style={{
            fontWeight: 'bold',
          }}>
            Motivation
          </IonCardHeader>
          <ul style={{
            marginTop: 0,
            paddingRight: 10,
          }}>
            <li>
              The <b>zeitgeist</b> is characterized by the media through which it moves.
            </li>
            <li>
              Today, <b>social media</b> organizes posts into timelines and algorithmic feeds.
              Tree structure is also employed to organize the threads that are accessible via these <b>linear structures</b>.
            </li>
            <li>
              In timelines, old posts disappear into the past, even if they are still relevant.
            </li>
            <li>
              Algorithmic feeds don't offer much opportunity for decision making in the exploration of content.
            </li>
            <li>
              Regarding <b>tree structure</b>, most frontends
              allow a user to extend a tree with new posts. 
              But they don't provide the ability to construct a tree of arbitrary posts,
              using that tree as a modular expression.
              The tree could import posts from other trees,
              quoting them, reusing them in new contexts.
            </li>
            <li>
              Mindscape enables the composition of posts into 
              a <b>nested, weighted, directed graph structure</b>, 
              which has the power to express the three structures described above.
            </li>
            <li>
              It also offers the free <b>spatial composition</b> of posts, similar to the placement of icons on desktops.
            </li>
            <li>
              Mindscape is <b>enzymatic</b> in function, enabling the holding of different reagents in place, 
              in the view of the user, 
              so a reaction can occur.
            </li>
            <li>
              To bridge echo chambers and treat social amnesia by increasing the <b>modularity</b> of posts, 
              enabling new modes of <b>composition</b>.
            </li>
          </ul>
        </IonCard>
        <IonCard>
          <IonCardHeader style={{
            fontWeight: 'bold',
          }}>
            Theory
          </IonCardHeader>
          <ul style={{
            marginTop: 0,
            paddingRight: 10,
          }}>
          <li>
            One of the guiding principles in our research and development is
            the idea that we should design information to 
            leverage our <b>physical intuition</b> regarding material in space-time.
          </li>
          <li>
            For instance, today's operating systems 
            typically use the metaphor of nested folders to 
            give the user some material intuition for how 
            a directory tree is structured.
          </li>
          <li>
            This has inspired us to use a model of nested graphs in space, which 
            allows the user to <b>compose posts</b> in two key ways: 
          </li>
          <li>
            Firstly, this type of interface materializes posts as objects 
            that can be moved around in space.

            Thus, one can <b>position</b> posts in a way that uses distance and direction 
            to convey information
            regarding the relationships between posts.
          </li>
          <li>
            Secondly, it provides a new way to link posts: the <b>arrow</b>. 

            While hyperlinks exist embedded within posts as properties of those posts, 
            arrows exist alongside the posts as objects in their own right.

            This results in their having significantly different properties.
          </li>
          <li>
            For instance, a hyperlink can only be traversed in one direction
            while an arrow can be traversed in either direction.
          </li>
          <li>
            By connecting posts with arrows, we place the posts into a graph,
            i.e. an abstract space of arbitrary dimensionality.

            In this kind of space, distance and direction remain meaningful concepts for 
            expressing relationships between posts.
          </li>
          <li>
            Composition of posts is meaningful 
            because it is the application of <b>syntax</b> onto posts.

            Within a post, syntax is applied to simpler expressions, composing them
            to produce more complex expressions.
            
            This is a fundamental, recursive process that occurs in all acts of expression.
          </li>
          <li>
            For instance, one organizes characters into words, 
            words into sentences, sentences into paragraphs, etc.
          </li>
          <li>
            Previously, it was difficult to express oneself in the composition of posts.

            Now, we can define relationships between posts, composing them
            to form graphs.
          </li>
          <li>
            Since graphs are nested, each graph is essentially a post in a meta-graph,
            so we unlock not just one additional level of organization,
            but an arbitrary number of levels.
          </li>
          <li>
            The point of composing posts into graphs is to be able to express
            oneself in terms of <b>preexisting posts</b>.
            
            This means that one can easily cite another person's post,
            integrating it into their own statements.

            This in turn means a reduction in redundant posts,
            as people come to rely on common references in their compositions.
          </li>
        </ul>
        </IonCard>
        <IonCard>
          <IonCardHeader style={{
            fontWeight: 'bold',
          }}>
            Practice
          </IonCardHeader>
          <ul style={{
            marginTop: 0,
            paddingRight: 10,
          }}>
            <li>
              Mindscape uses a single data type, the <b>Arrow</b>, to represent
              both the posts and the links of a graph.
            </li>
            <li>
              We can think of each post as an arrow that starts and ends at itself, 
              like identity arrows in category theory.
            </li>
            <li>
              This is significant because it means that each link has a text fields
              that can be used to label the link.
            </li>
            <li>
              Also, each arrow can be said to connect two arrows. This means
              that we can have arrows between all three: post and post, post and link, link and link.
            </li>
            <li>
              Another data type, the <b>Pin</b>, is used to define additional structure on a graph.
            </li>
            <li>
              The pin expresses the tagging of a set of arrows with the id of a single arrow.

              We can imagine this as the nesting of a set of details under an abstract.
            </li>
            <li>
              The detail-arrows are further structured by pins, into a tree structure rooted 
              at the abstract-arrow.

              This tree structure is used to position arrows; drag an arrow and its subtree moves with it.
            </li>
          </ul>
        </IonCard>
      </IonCardContent>
 
    </IonCard>
  )
}

export default About;