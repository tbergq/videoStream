import React from 'react';
import PropTypes from 'prop-types';
import idx from 'idx';
import querystring from 'querystring';

import Http from '../utils/Http';
import withContext from './withContext';

const preloadedState = idx(window, _ => _.__PRELOADED_STATE__.moviePlayer); // eslint-disable-line

const defaultState = {
  moviePath: '',
  subtitleUrl: '',
  serverAddress: '',
  movieName: '',
  downloadSubtitle: () => {},
};

const { Provider: ContextProvider, Consumer } = React.createContext(
  defaultState,
);

class Provider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...preloadedState,
      downloadSubtitle: this.downloadSubtitle,
    };
  }

  downloadSubtitle = async (url, moviePath) => {
    const response = await Http(
      `/api/subtitles/download?${querystring.stringify({
        url,
        moviePath,
      })}`,
    );

    this.setState({
      subtitleUrl: response.subtitleUrl,
    });
  };

  render() {
    return (
      <ContextProvider value={this.state}>
        {this.props.children}
      </ContextProvider>
    );
  }
}

export const withMoviePlayerContext = select => withContext(select, Consumer);

export default { Provider, Consumer };
