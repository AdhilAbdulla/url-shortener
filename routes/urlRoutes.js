const express = require("express");
const shortid = require("shortid");
const Url = require("../models/Url");

const router = express.Router();

// Shorten URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    const shortUrl = shortid.generate();
    const newUrl = new Url({ longUrl, shortUrl });
    await newUrl.save();

    res.json({ shortUrl: `${process.env.BASE_URL}/${shortUrl}` });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Redirect Short URL
router.get("/:shortUrl", async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
