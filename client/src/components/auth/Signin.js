import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { compose } from "redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions";

function Signin(props) {
  let navigate = useNavigate();

  const onSubmit = (formProps) => {
    props.signin(formProps, () => {
      navigate("/feature");
    });
  };

  return (
    <form onSubmit={props.handleSubmit(onSubmit)}>
      <fieldset>
        <label>Email</label>
        <Field name="email" type="text" component="input" autoComplete="none" />
      </fieldset>
      <fieldset>
        <label>Password</label>
        <Field
          name="password"
          type="password"
          component="input"
          autoComplete="none"
        />
      </fieldset>
      <div>{props.errorMessage}</div>
      <button>Sign In</button>
    </form>
  );
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signin" })
)(Signin);
