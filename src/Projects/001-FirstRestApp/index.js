import express from "express";

const app = express()

const firstHelloGetCallback = (req, res) => {
    console.log("Client connected");

    res.json({"message": `Hello ${req.params.name}`});
}

app.get("/first/hello/:name", (req, res) => firstHelloGetCallback(req, res))
app.listen(50500, () => console.log("Listening on port 50500"));