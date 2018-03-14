import querySubtitles from '../subtitle-scraper.service';

jest.mock('../request', () => ({
  getHtml: () =>
    `<html>
      <body>
        <div id="buscador_detalle_sub">Name 1</div>
        <div id="buscador_detalle_sub_datos">
          <a href="nope">No</a>
          <a href="oh yes">yes</a>
        </div>
        <div id="buscador_detalle_sub">Name 2</div>
        <div id="buscador_detalle_sub_datos">
          <a href="nope">No</a>
          <a href="nope">No</a>
          <a href="oh yes">yes</a>
        </div>
        </body>
  </html>`,
}));

describe('subtitleScraper', () => {
  it('fetches html', async () => {
    const subtitles = await querySubtitles('Homeland s06e01');

    expect(subtitles).toEqual([
      { name: 'Name 1', url: 'oh yes' },
      { name: 'Name 2', url: 'oh yes' },
    ]);
  });
});
