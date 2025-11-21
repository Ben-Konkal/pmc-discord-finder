// Global sets to store everything found during this session
const allLines = new Set();
const allLinks = new Set();

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "addData") {
    // Add new lines/links from a page into the global sets
    (msg.lines || []).forEach((line) => allLines.add(line));
    (msg.links || []).forEach((link) => allLinks.add(link));
  } else if (msg.type === "downloadLog") {
    // Build log text from everything seen so far
    const data = [];

    allLines.forEach((line) => data.push("LINE: " + line));
    allLinks.forEach((link) => data.push("LINK: " + link));

    if (data.length === 0) {
      console.log("[PMC Discord Finder] No data to download yet.");
      return;
    }

    const blob = new Blob([data.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download({
      url,
      filename: "pmc-discord-log.txt"
    });
  }
});
