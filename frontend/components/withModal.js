import React from 'react';

export default function withModal(WrappedComponent) {
  return class WithModal extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        showModal: false,
      };

      this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
      this.setState(state => ({
        showModal: !state.showModal,
      }));
    }

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
