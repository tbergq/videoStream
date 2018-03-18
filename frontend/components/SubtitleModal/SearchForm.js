import React from 'react';
import PropTypes from 'prop-types';
import last from 'lodash/last';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
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
      query: '',
    };
  }

  componentDidMount() {
    const movieName = last(decodeURIComponent(this.props.moviePath).split('/'));
    this.setState({ query: movieName });
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
          <ControlLabel>Movie name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.query}
            onChange={this.onChange}
          />
          <SubmitContainer>
            <Button type="submit" bsStyle="primary">
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
