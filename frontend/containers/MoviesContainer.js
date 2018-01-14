import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMovies } from '../redux/reducers';
import { fetchMovies } from '../redux/actions/MoviesActions';

class MoviesContainer extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchMovies());
  }

  render() {
    return (
      <div>
        MoviesContainer: <span>{JSON.stringify(this.props.movies)}</span>
      </div>
    );
  }
}

MoviesContainer.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...getMovies(state),
});

export default connect(mapStateToProps)(MoviesContainer);
