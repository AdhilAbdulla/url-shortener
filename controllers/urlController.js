const Url = require("../models/Url");
const { nanoid } = require("nanoid");

const shortenUrl = async (req, res) => {
    const { longUrl } = req.body;

    if (!longUrl) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortUrl = nanoid(7);
    const newUrl = new Url({ longUrl, shortUrl });

    await newUrl.save();
    res.json({ shortUrl: `${process.env.BASE_URL}/${shortUrl}` });
};

const redirectUrl = async (req, res) => {
    const { shortUrl } = req.params;
    const urlEntry = await Url.findOne({ shortUrl });

    if (!urlEntry) {
        return res.status(404).json({ error: "URL not found" });
    }

    res.redirect(urlEntry.longUrl);
};

module.exports = { shortenUrl, redirectUrl };
