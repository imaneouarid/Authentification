import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const RBACMiddleware = ({ user, allowedRoles, children }) => {
  if (user && allowedRoles.includes(user.roles)) {
    return <>{children}</>;
  } else {
    // Redirect or render an error message for unauthorized access
    return <Redirect to="/unauthorized" />;
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(RBACMiddleware);
