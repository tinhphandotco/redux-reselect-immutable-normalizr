import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class AuthRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAllowEnter: false,
      urlRedirect: null,
    };
  }

  componentDidMount() {
    Promise.all(this.props.middlewares.map(md => md(this.props.store)))
      .then(() => {
        this.setState({
          isAllowEnter: true
        });
      })
      .catch(urlRedirect => {
        this.setState({
          urlRedirect,
        });
      });
  }

  render() {
    // extract props and state
    const { path, component: Component } = this.props;
    const { urlRedirect, isAllowEnter } = this.state;

    return (
      <Route
        path={path}
        render={(routeProps) => {
          if (isAllowEnter) {
            return <Component {...routeProps} />;
          }
          if (urlRedirect === null) return null;
          return <Redirect to={urlRedirect} />;
        }}
      />
    );
  }
}

AuthRoute.propTypes = {
  middlewares: PropTypes.array,
  store: PropTypes.object,
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType,
};

AuthRoute.defaultProps = {
  middlewares: [],
  store: {},
  component: <div />
};

const mapStateToProps = state => ({
  store: state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);