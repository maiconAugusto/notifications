const express = require("express");

const app = express();

app.listen(3000, () => {
    console.log("application listening.....");
});

export default express;