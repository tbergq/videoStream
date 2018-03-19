import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import idx from 'idx';
import last from 'lodash/last';

import MoviePlayer from '../components/MoviePlayer/MoviePlayer';
import { getMoviePlayer } from '../redux/reducers';
import ChromeCastContainer from '../containers/ChromeCastContainer';

const MoviePlayerContainer = ({ isCasting, moviePath, subtitleUrl }) => (
  <div>
    <h3>{last(decodeURIComponent(moviePath).split('/'))}</h3>
    {!isCasting && (
      <MoviePlayer movieUrl={moviePath} subtitleUrl={subtitleUrl} />
    )}
    <ChromeCastContainer movieUrl={moviePath} subtitleUrl={subtitleUrl} />
  </div>
);

MoviePlayerContainer.propTypes = {
  moviePath: PropTypes.string.isRequired,
  subtitleUrl: PropTypes.string.isRequired,
  isCasting: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  ...getMoviePlayer(state),
  isCasting: idx(state, _ => _.chromeCast.isCasting),
});

export default connect(mapStateToProps)(MoviePlayerContainer);
