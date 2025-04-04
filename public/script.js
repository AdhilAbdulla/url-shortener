const API_URL = "http://localhost:5000/api";

async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;
    if (!longUrl) {
        alert("Please enter a valid URL");
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/shorten`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ longUrl })
        });

        const data = await response.json();
        if (data.shortUrl) {
            document.getElementById("shortUrl").value = data.shortUrl;
        } else {
            alert("Error shortening URL");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function copyUrl() {
    const shortUrl = document.getElementById("shortUrl");
    shortUrl.select();
    document.execCommand("copy");
    alert("Copied to clipboard!");
}
