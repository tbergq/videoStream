// @flow

import * as React from 'react';

type State = {|
  showModal: boolean,
|};
export default function withModal<Config: { ... }>(
  WrappedComponent: React.AbstractComponent<Config>,
) {
  return class WithModal extends React.Component<Config, State> {
    constructor(props: Config) {
      super(props);

      this.state = {
        showModal: false,
      };
    }

    toggleModal = () => {
      this.setState(state => ({
        showModal: !state.showModal,
      }));
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          showModal={this.state.showModal}
          toggleModal={this.toggleModal}
        />
      );
    }
  };
}
