import { Arrow } from "../../types";
import AddressComponent from "../address/AddressComponent";
import ArrowVoter from "./ArrowVoter";

interface ArrowComponentProps {
  arrow: Arrow;
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
      <br />
      {arrow.state.name}
      <br />
      {arrow.state.description}
      <br />
      {arrow.state.data}
    </div>
  );
}

export default ArrowComponent;

