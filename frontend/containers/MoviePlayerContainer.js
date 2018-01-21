import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MoviePlayer from '../components/MoviePlayer/MoviePlayer';
import { getMoviePlayer } from '../redux/reducers';
import ChromeCastContainer from '../containers/ChromeCastContainer';


const MoviePlayerContainer = props => (
  <div>
    {/* <MoviePlayer movieUrl={props.moviePath} subtitleUrl={props.subtitleUrl} /> */}
    <ChromeCastContainer movieUrl={props.moviePath} subtitleUrl={props.subtitleUrl} />
  </div>
);

MoviePlayerContainer.propTypes = {
  moviePath: PropTypes.string.isRequired,
  subtitleUrl: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  ...getMoviePlayer(state),
});

export default connect(mapStateToProps)(MoviePlayerContainer);
