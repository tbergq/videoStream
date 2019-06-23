// @flow

import * as React from 'react';
import querystring from 'querystring';

import Http from '../utils/Http';
import withContext from './withContext';

const preloadedState = window.__PRELOADED_STATE__?.moviePlayer ?? {};

const defaultState = {
  moviePath: '',
  subtitleUrl: '',
  serverAddress: '',
  movieName: '',
  downloadSubtitle: () => Promise.resolve(),
};

const { Provider: ContextProvider, Consumer } = React.createContext<State>(
  defaultState,
);

type Props = {|
  +children: React.Node,
|};

type State = {|
  +moviePath: string,
  +subtitleUrl: string,
  +serverAddress: string,
  +movieName: string,
  downloadSubtitle: (string, string) => Promise<void>,
|};

class Provider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      ...preloadedState,
      downloadSubtitle: this.downloadSubtitle,
    };
  }

  downloadSubtitle = async (url: string, moviePath: string) => {
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

export const withMoviePlayerContext = (select: Function) =>
  withContext(select, Consumer);

export default { Provider, Consumer };
