module.exports = async (req, res) => {
  try {
    const response = await fetch('https://aquelveranodel92.substack.com/feed');
    const xml = await response.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 's-maxage=300');
    res.status(200).send(xml);
  } catch (e) {
    res.status(500).send('Error');
  }
};
