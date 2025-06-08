const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.static('./dist'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));

    res.status(200);
});

app.listen(port, () => console.log(`Server started at port ${PORT}`));
