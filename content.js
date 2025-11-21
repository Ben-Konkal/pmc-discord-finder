(function () {
  const DISCORD_PATTERNS = [
    "discord.gg",
    "discord.com/invite",
    "discord.com/channels",
    "discord.com/users",
    "discordapp.com/invite",
    "discordapp.com/channels",
    "discord.me",
    "dsc.gg",
    "invite.gg",
    "discord.io",
    "discordhub.com",
    "disboard.org",
    "top.gg"
  ];

  const IGNORED_CODES = ["UpyyA2bUVe", "QQSWwyg"];

  function isDiscordLink(href) {
    return DISCORD_PATTERNS.some((p) => href.includes(p));
  }

  function isIgnored(href) {
    return IGNORED_CODES.some((c) => href.includes(c));
  }

  // ---- Gather links on THIS page ----
  const pageLinksSet = new Set();
  document.querySelectorAll("a[href]").forEach((a) => {
    const href = a.href;
    if (!href) return;
    if (!isDiscordLink(href)) return;
    if (isIgnored(href)) return;

    pageLinksSet.add(href);

    // highlight this page's links
    a.style.outline = "2px solid #5865F2";
    a.style.outlineOffset = "2px";
    a.style.backgroundColor = "rgba(88, 101, 242, 0.15)";
  });

  const pageLinks = Array.from(pageLinksSet);

  // ---- Merge into global storage, then build UI ----
  chrome.storage.local.get({ links: [] }, (data) => {
    const combined = new Set(data.links || []);
    pageLinks.forEach((l) => combined.add(l));
    const totalCount = combined.size;

    chrome.storage.local.set({ links: Array.from(combined) }, () => {
      buildUI({ pageLinks, totalCount });
    });
  });

  function buildUI({ pageLinks, totalCount }) {
    // ---- Download button (always present) ----
    if (!document.getElementById("pmc-discord-dl-btn")) {
      const dlBtn = document.createElement("div");
      dlBtn.id = "pmc-discord-dl-btn";
      dlBtn.textContent = "⬇️";
      Object.assign(dlBtn.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "rgba(0,0,0,0.85)",
        color: "white",
        padding: "9px 11px",
        borderRadius: "50%",
        fontSize: "18px",
        cursor: "pointer",
        zIndex: "999999",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.4)",
        userSelect: "none",
        textAlign: "center",
        lineHeight: "18px"
      });

      dlBtn.title = "Download global Discord link log";

      dlBtn.onclick = () => {
        chrome.storage.local.get({ links: [] }, (data) => {
          const links = data.links || [];
          if (links.length === 0) {
            alert("No Discord links saved yet.");
            return;
          }

          const blob = new Blob([links.join("\n")], { type: "text/plain" });
          const url = URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.href = url;
          a.download = "pmc-discord-links.txt";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          URL.revokeObjectURL(url);
        });
      };

      document.body.appendChild(dlBtn);
    }

    // ---- Permanent counter (only if at least 1 link saved) ----
    let counter = document.getElementById("pmc-discord-counter");

    if (totalCount > 0) {
      if (!counter) {
        counter = document.createElement("div");
        counter.id = "pmc-discord-counter";
        Object.assign(counter.style, {
          position: "fixed",
          bottom: "60px",
          right: "20px",
          background: "rgba(0,0,0,0.85)",
          color: "white",
          padding: "6px 10px",
          borderRadius: "999px",
          fontFamily: "system-ui, sans-serif",
          fontSize: "11px",
          zIndex: "999999",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.4)",
          userSelect: "none"
        });
        document.body.appendChild(counter);
      }
      counter.textContent = `Links saved: ${totalCount}`;
    } else if (counter) {
      // no links saved, hide counter if it exists
      counter.remove();
    }

    // ---- If no links on THIS page, don't show popup, just counter + button ----
    if (pageLinks.length === 0) return;

    // ---- Page popup ----
    const existingBox = document.getElementById("pmc-discord-popup");
    if (existingBox) existingBox.remove();

    const box = document.createElement("div");
    box.id = "pmc-discord-popup";
    Object.assign(box.style, {
      position: "fixed",
      bottom: "90px",
      right: "20px",
      backgroundColor: "rgba(0,0,0,0.90)",
      color: "white",
      padding: "12px 15px",
      borderRadius: "10px",
      fontFamily: "system-ui, sans-serif",
      fontSize: "12px",
      zIndex: "999999",
      maxWidth: "320px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.4)"
    });

    const closeBtn = document.createElement("span");
    closeBtn.textContent = "✕";
    Object.assign(closeBtn.style, {
      position: "absolute",
      top: "4px",
      right: "8px",
      cursor: "pointer",
      fontSize: "13px"
    });
    closeBtn.onclick = () => box.remove();

    const title = document.createElement("div");
    title.textContent = "PMC Discord Finder";
    title.style.fontWeight = "600";
    title.style.marginBottom = "4px";

    const summary = document.createElement("div");
    summary.textContent = `Links on this page: ${pageLinks.length}`;
    summary.style.marginBottom = "6px";

    const list = document.createElement("div");
    list.style.maxHeight = "150px";
    list.style.overflowY = "auto";
    list.style.fontSize = "11px";

    pageLinks.forEach((link) => {
      const item = document.createElement("div");
      item.textContent = "• " + link;
      item.style.wordBreak = "break-all";
      item.style.marginBottom = "3px";
      list.appendChild(item);
    });

    box.appendChild(closeBtn);
    box.appendChild(title);
    box.appendChild(summary);
    box.appendChild(list);

    document.body.appendChild(box);
  }
})();
