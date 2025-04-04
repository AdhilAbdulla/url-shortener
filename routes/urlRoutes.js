const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

const generateShortUrl = () => Math.random().toString(36).substring(2, 8);

router.post("/shorten", async (req, res) => {
    try {
        const { longUrl } = req.body;
        if (!longUrl) return res.status(400).json({ error: "URL required" });

        let url = await Url.findOne({ longUrl });
        if (!url) {
            const shortUrl = generateShortUrl();
            url = new Url({ longUrl, shortUrl });
            await url.save();
        }
        res.json({ shortUrl: `${process.env.BASE_URL}/api/${url.shortUrl}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.get("/:shortUrl", async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortUrl });
        if (url) {
            res.redirect(url.longUrl);
        } else {
            res.status(404).json({ error: "URL not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
