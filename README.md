📘 PlanetMinecraft Discord Link Finder (Chrome Extension)

A lightweight Chrome extension built with Manifest V3 that automatically detects, highlights, and organizes Discord invite links while browsing PlanetMinecraft.com.

The extension enhances community discovery by surfacing relevant server links, maintaining a persistent global list, and enabling one-click export — all fully local and privacy-friendly.

✨ Features
🔍 Discord Link Detection

Automatically identifies Discord invite links across all major platforms, including:

discord.gg/...

discord.com/invite/...

discord.me/...

dsc.gg/...

invite.gg/...

discord.io/...

disboard.org/...

top.gg/...
…and more.

PlanetMinecraft’s official Discord links are intelligently excluded to avoid noise.

🎨 Visual Inline Highlighting

Detected links are dynamically highlighted on the page for quick identification.

📌 Page-Level Popup

When Discord links are found, a clean floating popup displays:

Number of links found on the current page

A formatted list of all detected URLs

Click-to-close functionality

📂 Persistent Global Collection

All detected links across all pages are stored locally using chrome.storage.local, with:

Automatic deduplication

Storage that persists as you browse

Zero external data usage

No analytics, tracking, or network requests

📊 Real-Time Global Counter

A compact status bubble in the bottom-right corner shows how many total links you've collected across your session.
It appears automatically once the first link is discovered.

⬇️ One-Click Export

A dedicated floating download button allows you to instantly export all saved links into a clean .txt file.

Useful for moderation, community curation, server discovery, workflow organization, or personal archiving.

🛠️ Built With

JavaScript (ES6)

Chrome Extensions API – Manifest V3

Content Scripts

Chrome Storage API (storage.local)

DOM Traversal & Mutation

Blob API (client-side file generation)

CSS-in-JS UI rendering

📦 Installation

Download this repository as a ZIP or clone it.

Go to chrome://extensions in your browser.

Enable Developer mode (top-right).

Click Load unpacked.

Select the project folder containing manifest.json.

The extension will now run automatically whenever you browse PlanetMinecraft.com.

🧩 Architecture Overview

manifest.json
Defines extension metadata, permissions, content script injection rules, and MV3 configuration.

content.js
Runs on every PlanetMinecraft page:

Scans the DOM for Discord links

Highlights matched elements

Updates global storage

Renders floating UI widgets

Manages popup visibility and state tracking

Chrome storage.local
Persistent, deduplicated storage for all collected links.

🎯 Purpose & Motivation

This project was built to strengthen practical experience with browser extensions, DOM parsing, and Chrome MV3 APIs, while creating a tool to streamline community exploration on PlanetMinecraft.

It improved understanding of:

Real-world browser security models

Cross-page state synchronization

UI injection and dynamic rendering

Efficient link detection and pattern matching

📄 License

MIT License — free for personal or open-source use.
