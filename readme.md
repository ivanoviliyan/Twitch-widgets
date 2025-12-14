## 🔴 Live Demo

👉 <a href="https://ivanoviliyan.github.io/Twitch-widgets/" target="_blank" rel="noopener noreferrer">
Open Live Demo in new tab
</a>


This page hosts the widget via **GitHub Pages** and can be used as:
- a standalone browser demo
- a StreamElements custom overlay source


# Twitch Widgets — StreamElements Follower Overlay

This repository contains a simple **Twitch overlay widget** that connects to the **StreamElements WebSocket API** and displays the latest follower name in real time using JavaScript.

The widget is built with plain JavaScript, no bundler or framework required.

---

## 🔧 Features

- Connects to the StreamElements **Astro WebSocket Gateway** to receive live events through WebSocket.
- Displays the latest follower’s name with animation.  
- Simple and minimal setup.  
- Works as a custom overlay widget in StreamElements or as a standalone browser page.

---

## 🚀 Demo / How It Works

To use this code:

1. Copy the repository to your local machine.
2. Replace the placeholder tokens (`YOUR_JWT_TOKEN_HERE` and `YOUR_CHANNEL_ID_HERE`) with your actual StreamElements credentials.
3. Open the HTML file in a browser or use it as a StreamElements overlay.

---

## ⚙️ Configuration

Your `main.js` must include your own credentials:

```js
const jwtToken = 'YOUR_JWT_TOKEN_HERE';
const channelId = 'YOUR_CHANNEL_ID_HERE';
