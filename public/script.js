function shortenUrl() {
    let longUrl = document.getElementById("longUrl").value;
    if (!longUrl) {
        alert("Please enter a valid URL");
        return;
    }
    fetch("/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.shortUrl) {
            document.getElementById("shortUrl").value = data.shortUrl;
        } else {
            alert("Error shortening URL");
        }
    })
    .catch(error => console.error("Error:", error));
}

function copyUrl() {
    let shortUrl = document.getElementById("shortUrl");
    shortUrl.select();
    document.execCommand("copy");
    alert("Copied to clipboard!");
}
