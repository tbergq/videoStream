// @flow

/* eslint-disable react/no-multi-comp */

import * as React from 'react';
import isEqual from 'react-fast-compare';

const withContext = (select: Function, Consumer: any) => (Component: any) => {
  class WithShouldComponentUpdate extends React.Component<any, any> {
    shouldComponentUpdate(nextProps: any) {
      return !isEqual(nextProps, this.props);
    }

    render() {
      const children = React.cloneElement(this.props.children, this.props);
      return children;
    }
  }
  class WithContext extends React.Component<any, any> {
    renderInner = (state: any) => {
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

export default withContext;
