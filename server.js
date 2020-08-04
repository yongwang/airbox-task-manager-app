const express = require('express');
const path = require('path');
const app = express();

const PORT = 8000;

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
