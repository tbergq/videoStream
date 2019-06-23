// @flow

import { JSDOM } from 'jsdom';
import { last } from 'ramda';
import dotenv from 'dotenv';

import { getHtml } from './request';

dotenv.config();

const subTitlePath = process.env.SUBTITLE_PATH ?? '';

export default async function querySubtitles(movieName: string) {
  const santizedMovieName = movieName.split(' ').join('+');
  const html = await getHtml(`${subTitlePath}${santizedMovieName}`);

  const dom = new JSDOM(html);
  const { document } = dom.window;
  const subtitleContainers = [
    ...document.querySelectorAll('#buscador_detalle_sub'),
  ].map(item => item.textContent);
  const urlContainers = [
    ...document.querySelectorAll('#buscador_detalle_sub_datos'),
  ].map(item => last(item.querySelectorAll('a'))?.href);

  const subtitles = subtitleContainers.map((item, index) => ({
    name: item,
    url: urlContainers[index],
  }));

  return subtitles;
}
