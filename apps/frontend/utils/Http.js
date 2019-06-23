// @flow

import fetch from '@kiwicom/fetch';

export default async function Http(url: string, config?: { ... }) {
  try {
    const response = await fetch(url, config);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    throw error;
  }
}
