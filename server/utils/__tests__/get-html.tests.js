import getHtml from '../get-html';

const html = [
  '<html>',
  '<title>test | %title% </title>',
  '<body>',
  '%script%',
  '</body>',
  '</html>',
];
jest.mock('fs', () => ({
  readFileSync: () => [
    '<html>',
    '<title>test | %title% </title>',
    '<body>',
    '%script%',
    '</body>',
    '</html>',
  ].join(''),
}));

describe('getHtml', () => {
  it('should return html, and replace %script% and %title%', () => {
    expect(getHtml('lol', 'titleLol')).toEqual(html.join('').replace('%title%', 'titleLol').replace('%script%', 'lol'));
  });
});
