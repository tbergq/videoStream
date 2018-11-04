import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Badge, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';

const SubmitContainer = styled('span')([], {
  display: 'flex',
  justifyContent: 'flex-end',
  button: {
    marginTop: '5px',
  },
});

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: props.moviePath,
    };
  }

  onChange = e => {
    this.setState({ query: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup>
          <Badge>Movie name</Badge>
          <FormControl
            type="text"
            value={this.state.query}
            onChange={this.onChange}
          />
          <SubmitContainer>
            <Button type="submit" variant="primary">
              Search
            </Button>
          </SubmitContainer>
        </FormGroup>
      </form>
    );
  }
}

SearchForm.propTypes = {
  moviePath: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
