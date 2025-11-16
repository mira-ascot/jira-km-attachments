const express = require('express');
const { PORT } = require('./config');
const attachRoute = require('./routes/attach');

const app = express();
app.use(express.json());
app.use('/attach', attachRoute);

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
