async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;
    if (!longUrl) {
        alert("Please enter a URL");
        return;
    }

    try {
        const response = await fetch("/api/shorten", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ longUrl }),
        });

        const data = await response.json();
        if (data.shortUrl) {
            document.getElementById("shortUrl").value = data.shortUrl;
        } else {
            alert("Error shortening URL");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
    }
}


function copyUrl() {
    const resultInput = document.getElementById("shortUrl");
    resultInput.select();
    document.execCommand("copy");
    alert("Copied!");
}
