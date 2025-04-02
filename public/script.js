async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;
    const resultInput = document.getElementById("shortUrl");

    if (!longUrl) {
        alert("Please enter a valid URL.");
        return;
    }

    try {
        const response = await fetch("/api/shorten", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ longUrl }),
        });

        if (!response.ok) throw new Error("Failed to shorten URL");

        const data = await response.json();
        resultInput.value = data.shortUrl;
    } catch (error) {
        alert("Something went wrong. Please try again later.");
    }
}

function copyUrl() {
    const resultInput = document.getElementById("shortUrl");
    resultInput.select();
    document.execCommand("copy");
    alert("Copied!");
}
