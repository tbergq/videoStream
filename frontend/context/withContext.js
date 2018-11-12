import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';

export default (select, Consumer) => Component => {
  class WithShouldComponentUpdate extends React.Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
    };

    shouldComponentUpdate(nextProps) {
      return !isEqual(nextProps, this.props);
    }

    render() {
      const children = React.cloneElement(this.props.children, this.props);
      return children;
    }
  }
  class WithContext extends React.Component {
    renderInner = state => {
      const stateProps = select(state);
      return (
        <WithShouldComponentUpdate {...this.props} {...stateProps}>
          <Component />
        </WithShouldComponentUpdate>
      );
    };

    render() {
      return <Consumer>{this.renderInner}</Consumer>;
    }
  }

  return WithContext;
};
