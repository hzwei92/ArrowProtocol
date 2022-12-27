import { Arrow } from "../../types";
import AddressComponent from "../address/AddressComponent";
import ArrowEditor from "./ArrowEditor";
import ArrowVoter from "./ArrowVoter";

interface ArrowComponentProps {
  arrow: Arrow;
  showLinkLeft?: boolean;
  showLinkRight?: boolean;
}

const ArrowComponent = ({ arrow }: ArrowComponentProps) => {
  return (
    <div style={{
      position: 'relative',
      paddingLeft: 14,
    }}>
      <div style={{
        position: 'absolute',
        left: -10,
        top: -5,
      }}>
        <ArrowVoter arrow={arrow}/>
      </div>
      <AddressComponent address={arrow.state.creatorAddress} fontSize={8}/>
      <ArrowEditor arrow={arrow} />
    </div>
  );
}

export default ArrowComponent;

