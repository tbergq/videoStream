import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import idx from 'idx';
import last from 'lodash/last';

import MoviePlayer from '../components/MoviePlayer/MoviePlayer';
import { getMoviePlayer } from '../redux/reducers';
import ChromeCastContainer from '../containers/ChromeCastContainer';
import SubtitleContainer from '../containers/SubtitleContainer';

class MoviePlayerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  toggleIsModalOpen = () => {
    this.setState(state => ({ isModalOpen: !state.isModalOpen }));
    console.log('movie player toggle');
  };

  render = () => {
    const { isCasting, moviePath, subtitleUrl } = this.props;
    return (
      <div>
        <h3>{last(decodeURIComponent(moviePath).split('/'))}</h3>
        {!isCasting && (
          <MoviePlayer
            movieUrl={moviePath}
            subtitleUrl={subtitleUrl}
            deactivateSpaceListener={this.state.isModalOpen}
          />
        )}
        <ChromeCastContainer movieUrl={moviePath} subtitleUrl={subtitleUrl} />
        <SubtitleContainer onModalToggle={this.toggleIsModalOpen} />
      </div>
    );
  };
}

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
