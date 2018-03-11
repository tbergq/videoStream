import getHtml from '../utils/get-html';

export default function movieListController(req, res) {
  const html = getHtml(
    '<script src="movies.bundle.js"></script>',
    'Movie List',
  );
  res.send(html);
}
