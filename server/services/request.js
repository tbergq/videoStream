import fetch from 'node-fetch';

export const getHtml = async url => {
  const response = await fetch(url);
  const html = await response.text();
  return html;
};

export const getJson = async url => {
  const response = await fetch(url);
  const html = await response.json();
  return html;
};
