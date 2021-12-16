import { connect } from "react-redux";
import * as actions from "../../actions";

function Signout(props) {
  props.signout();

  return <div>Logged out</div>;
}

export default connect(null, actions)(Signout);
