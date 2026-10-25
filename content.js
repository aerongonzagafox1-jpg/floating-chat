(function () {
  // Prevent duplicate injection
  if (document.getElementById("fc-floating-btn")) return;

  /* =====================================================
     PREVIEW STYLES + DARK MODE TOGGLE STYLES
     ===================================================== */
  const previewStyles = document.createElement("style");
  previewStyles.id = "fc-link-preview-styles";
  previewStyles.textContent = `
    /* ===============================
       LINK PREVIEW
       =============================== */
    .fc-link-preview {
      margin-top: 10px;
      width: 100%;
      max-width: 300px;
      overflow: hidden;
      border-radius: 10px;
      background: #111;
      border: 1px solid #555;
    }
    .fc-link-preview a {
      display: block;
      position: relative;
      text-decoration: none;
    }
    .fc-youtube-thumbnail {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
    }
    .fc-youtube-play {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: rgba(180, 0, 0, 0.95);
      color: white;
      font-size: 22px;
      padding-left: 3px;
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.5);
      transition: transform 0.15s ease;
    }
    .fc-link-preview:hover .fc-youtube-play {
      transform: translate(-50%, -50%) scale(1.08);
    }
    .fc-link-preview:hover .fc-youtube-thumbnail {
      filter: brightness(0.75);
    }
    .fc-youtube-label {
      padding: 7px 10px;
      color: #ddd;
      font-size: 12px;
      background: #181818;
    }
    /* ===============================
       IMAGE LINK PREVIEW
       =============================== */
    .fc-image-preview {
      display: block;
      width: 100%;
      max-width: 300px;
      max-height: 300px;
      object-fit: contain;
      border-radius: 10px;
      background: #111;
      cursor: pointer;
      border: 1px solid #555;
      transition: opacity 0.15s ease, transform 0.15s ease;
    }
    .fc-image-preview:hover {
      opacity: 0.9;
      transform: scale(1.01);
    }
    /* ===============================
       DARK MODE TOGGLE STYLES
       =============================== */
    .fc-darkmode-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .fc-darkmode-toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      background: #222;
      border-radius: 8px;
      border: 1px solid #444;
    }
    .fc-darkmode-label-text {
      font-size: 14px;
      font-weight: 500;
    }
    .fc-darkmode-desc {
      font-size: 11px;
      color: #999;
      margin-top: 4px;
    }
    .fc-toggle-switch {
      position: relative;
      width: 52px;
      height: 28px;
    }
    .fc-toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .fc-toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #444;
      border-radius: 28px;
      transition: 0.3s;
    }
    .fc-toggle-slider:before {
      position: absolute;
      content: "";
      height: 22px;
      width: 22px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      border-radius: 50%;
      transition: 0.3s;
    }
    .fc-toggle-switch input:checked + .fc-toggle-slider {
      background-color: #b40000;
    }
    .fc-toggle-switch input:checked + .fc-toggle-slider:before {
      transform: translateX(24px);
    }
    .fc-darkmode-status {
      font-size: 13px;
      color: #999;
      padding: 0 5px;
    }
    /* Dark Mode Core Styles — Applied when active */
    .fc-dark-mode-active,
    .fc-dark-mode-active body,
    .fc-dark-mode-active html {
      background-color: #0d0d0d !important;
      color: #e0e0e0 !important;
      filter: none !important;
    }
    /* Exclude chat UI from dark mode inversion */
    .fc-dark-mode-active #fc-floating-btn,
    .fc-dark-mode-active #fc-chatbox,
    .fc-dark-mode-active .fc-link-preview,
    .fc-dark-mode-active .fc-image-preview {
      filter: none !important;
      background: inherit !important;
      color: inherit !important;
    }
    /* Safe inversion for most page elements */
    .fc-dark-mode-active :not(
      #fc-floating-btn, #fc-chatbox, #fc-chatbox *,
      img, video, canvas, svg, iframe,
      .fc-no-dark, .fc-no-dark *
    ) {
      background-color: #121212 !important;
      border-color: #333 !important;
    }
    .fc-dark-mode-active a {
      color: #6ea8fe !important;
    }
    .fc-dark-mode-active button,
    .fc-dark-mode-active input,
    .fc-dark-mode-active textarea,
    .fc-dark-mode-active select {
      background-color: #1e1e1e !important;
      color: #e0e0e0 !important;
      border-color: #444 !important;
    }
    /* ===============================
       BASE CHATBOX STYLES
       =============================== */
    #fc-floating-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      background: #b40000;
      color: white;
      font-size: 24px;
      cursor: pointer;
      z-index: 99999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    }
    #fc-chatbox {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 380px;
      height: 600px;
      background: #111;
      border: 1px solid #444;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      z-index: 99998;
      box-shadow: 0 5px 20px rgba(0,0,0,0.5);
      color: #eee;
      font-family: system-ui, sans-serif;
    }
    #fc-chatbox-header {
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #333;
    }
    #fc-chatbox-close {
      background: transparent;
      border: none;
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }
    #fc-chatbox-tabs {
      display: flex;
      border-bottom: 1px solid #333;
      flex-wrap: wrap;
    }
    .fc-tab {
      flex: 1;
      padding: 8px 4px;
      background: transparent;
      border: none;
      color: #aaa;
      cursor: pointer;
      font-size: 11px;
    }
    .fc-tab.active {
      color: #fff;
      border-bottom: 2px solid #b40000;
    }
    #fc-chatbox-content {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
    }
    .fc-panel {
      display: none;
    }
    .fc-panel.active {
      display: block;
    }
    .fc-section-title {
      font-weight: bold;
      margin: 8px 0 12px;
    }
    .fc-gold-button {
      background: #b48800;
      border: none;
      border-radius: 6px;
      padding: 8px 12px;
      color: white;
      cursor: pointer;
      margin-bottom: 15px;
    }
    .fc-tool-button {
      display: flex;
      gap: 10px;
      width: 100%;
      background: #222;
      border: 1px solid #444;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 10px;
      color: white;
      cursor: pointer;
      text-align: left;
    }
    .fc-tool-button:hover {
      background: #2a2a2a;
    }
    #fc-chatbox-input-row {
      display: flex;
      gap: 8px;
      padding: 10px;
      border-top: 1px solid #333;
    }
    #fc-chatbox-input {
      flex: 1;
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px solid #444;
      background: #222;
      color: white;
    }
    #fc-chatbox-send {
      padding: 8px 16px;
      background: #b40000;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    .fc-message {
      margin-bottom: 14px;
      padding: 10px 12px;
      border-radius: 8px;
      max-width: 90%;
    }
    .fc-message.user {
      background: #2b4a70;
      margin-left: auto;
    }
    .fc-message.bot {
      background: #333;
      margin-right: auto;
    }
    .fc-message-text {
      word-break: break-word;
    }
  `;
  document.head.appendChild(previewStyles);

  /* =====================================================
     FLOATING BUTTON
     ===================================================== */
  const btn = document.createElement("button");
  btn.id = "fc-floating-btn";
  btn.type = "button";
  btn.setAttribute("aria-label", "Open chat");
  btn.innerHTML = "💬";
  document.body.appendChild(btn);

  /* =====================================================
     CHATBOX — TOOLS TAB = DARK MODE TOGGLE
     ===================================================== */
  const chatbox = document.createElement("div");
  chatbox.id = "fc-chatbox";
  chatbox.style.display = "none";
  chatbox.innerHTML = `
    <!-- HEADER -->
    <div id="fc-chatbox-header">
      <div class="fc-title">🎬 Chat Everywhere</div>
      <button id="fc-chatbox-close" type="button" aria-label="Close chat">×</button>
    </div>
    <!-- TABS -->
    <div id="fc-chatbox-tabs">
      <button class="fc-tab active" data-tab="chats" type="button">💬 Chats</button>
      <button class="fc-tab" data-tab="media" type="button">🎞️ Media</button>
      <button class="fc-tab" data-tab="groups" type="button">👥 Groups</button>
      <button class="fc-tab" data-tab="shares" type="button">🔗 Shares</button>
      <button class="fc-tab" data-tab="tools" type="button">🌙 Dark Mode</button>
    </div>
    <!-- CONTENT -->
    <div id="fc-chatbox-content">
      <!-- CHAT -->
      <section id="fc-tab-chats" class="fc-panel active">
        <div id="fc-chatbox-messages"></div>
      </section>
      <!-- MEDIA -->
      <section id="fc-tab-media" class="fc-panel">
        <div class="fc-section-title">🎞️ Media Gallery</div>
        <button id="fc-add-media" class="fc-gold-button" type="button">+ Add Media</button>
        <input id="fc-media-input" type="file" accept="image/*,video/*,audio/*" multiple hidden>
        <div id="fc-media-gallery"></div>
      </section>
      <!-- GROUPS -->
      <section id="fc-tab-groups" class="fc-panel">
        <div class="fc-section-title">👥 Groups</div>
        <button id="fc-create-group" class="fc-gold-button" type="button">+ Create Group</button>
        <div id="fc-groups-list"></div>
      </section>
      <!-- SHARES -->
      <section id="fc-tab-shares" class="fc-panel">
        <div class="fc-section-title">🔗 Shared Content</div>
        <div class="fc-share-form">
          <input id="fc-share-input" type="text" placeholder="Paste a link...">
          <button id="fc-share-button" class="fc-gold-button" type="button">Share</button>
        </div>
        <div id="fc-shares-list"></div>
      </section>
      <!-- DARK MODE TOGGLE -->
      <section id="fc-tab-tools" class="fc-panel">
        <div class="fc-section-title">🌙 Per-Site Dark Mode</div>
        <div class="fc-darkmode-container">
          <div class="fc-darkmode-toggle-row">
            <div>
              <div class="fc-darkmode-label-text">Enable Dark Mode</div>
              <div class="fc-darkmode-desc">Applies to this website only. Saves automatically.</div>
            </div>
            <label class="fc-toggle-switch">
              <input type="checkbox" id="fc-darkmode-toggle">
              <span class="fc-toggle-slider"></span>
            </label>
          </div>
          <div class="fc-darkmode-status" id="fc-darkmode-status">—</div>
        </div>
      </section>
    </div>
    <!-- INPUT -->
    <div id="fc-chatbox-input-row">
      <input id="fc-chatbox-input" type="text" placeholder="Type a message..." autocomplete="off">
      <button id="fc-chatbox-send" type="button">Send</button>
    </div>
  `;
  document.body.appendChild(chatbox);

  /* =====================================================
     ELEMENTS
     ===================================================== */
  const messages = chatbox.querySelector("#fc-chatbox-messages");
  const input = chatbox.querySelector("#fc-chatbox-input");
  const sendBtn = chatbox.querySelector("#fc-chatbox-send");
  const closeBtn = chatbox.querySelector("#fc-chatbox-close");
  const tabs = chatbox.querySelectorAll(".fc-tab");
  const inputRow = chatbox.querySelector("#fc-chatbox-input-row");
  const darkModeToggle = chatbox.querySelector("#fc-darkmode-toggle");
  const darkModeStatus = chatbox.querySelector("#fc-darkmode-status");

  /* =====================================================
     DARK MODE LOGIC — PER SITE
     ===================================================== */
  const currentSite = window.location.hostname;

  function getSiteSettings() {
    const all = JSON.parse(localStorage.getItem("fc-darkmode-sites") || "{}");
    return all[currentSite] || { enabled: false };
  }

  function saveSiteSettings(settings) {
    const all = JSON.parse(localStorage.getItem("fc-darkmode-sites") || "{}");
    all[currentSite] = settings;
    localStorage.setItem("fc-darkmode-sites", JSON.stringify(all));
  }

  function applyDarkMode(enable) {
    if (enable) {
      document.documentElement.classList.add("fc-dark-mode-active");
      darkModeStatus.textContent = `✅ Dark Mode ON for ${currentSite}`;
      darkModeStatus.style.color = "#4ade80";
    } else {
      document.documentElement.classList.remove("fc-dark-mode-active");
      darkModeStatus.textContent = `○ Dark Mode OFF for ${currentSite}`;
      darkModeStatus.style.color = "#999";
    }
  }

  // Load saved state on init
  const siteSettings = getSiteSettings();
  darkModeToggle.checked = siteSettings.enabled;
  applyDarkMode(siteSettings.enabled);

  // Toggle handler
  darkModeToggle.addEventListener("change", () => {
    const enabled = darkModeToggle.checked;
    applyDarkMode(enabled);
    saveSiteSettings({ enabled });
  });

  /* =====================================================
     CHAT STATE
     ===================================================== */
  let isOpen = false;

  /* =====================================================
     OPEN / CLOSE
     ===================================================== */
  function toggleChat() {
    isOpen = !isOpen;
    chatbox.style.display = isOpen ? "flex" : "none";
    if (isOpen) input.focus();
  }
  function closeChat() {
    isOpen = false;
    chatbox.style.display = "none";
  }
  btn.addEventListener("click", toggleChat);
  closeBtn.addEventListener("click", closeChat);

  /* =====================================================
     LINK DETECTION
     ===================================================== */
  function getYouTubeVideoId(text) {
    try {
      const url = new URL(text.trim());
      if ((url.hostname === "www.youtube.com" || url.hostname === "youtube.com") && url.pathname === "/watch")
        return url.searchParams.get("v");
      if (url.hostname === "youtu.be")
        return url.pathname.substring(1).split("?")[0];
      if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
        const parts = url.pathname.split("/");
        if (parts[1] === "shorts" && parts[2]) return parts[2];
        if (parts[1] === "embed" && parts[2]) return parts[2];
      }
    } catch { return null; }
    return null;
  }
  function isImageURL(text) {
    try {
      const url = new URL(text.trim());
      return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(url.pathname);
    } catch { return false; }
  }

  /* =====================================================
     CREATE LINK PREVIEW
     ===================================================== */
  function createLinkPreview(text) {
    const cleanText = text.trim();
    const videoId = getYouTubeVideoId(cleanText);
    if (videoId) {
      const preview = document.createElement("div");
      preview.className = "fc-link-preview";
      const link = document.createElement("a");
      link.href = cleanText;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      const thumbnail = document.createElement("img");
      thumbnail.src = "https://img.youtube.com/vi/" + encodeURIComponent(videoId) + "/hqdefault.jpg";
      thumbnail.alt = "YouTube video preview";
      thumbnail.className = "fc-youtube-thumbnail";
      const play = document.createElement("div");
      play.className = "fc-youtube-play";
      play.textContent = "▶";
      link.appendChild(thumbnail);
      link.appendChild(play);
      preview.appendChild(link);
      const label = document.createElement("div");
      label.className = "fc-youtube-label";
      label.textContent = "YouTube video";
      preview.appendChild(label);
      return preview;
    }
    if (isImageURL(cleanText)) {
      const link = document.createElement("a");
      link.href = cleanText;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      const image = document.createElement("img");
      image.src = cleanText;
      image.alt = "Shared image";
      image.className = "fc-image-preview";
      image.onerror = () => link.remove();
      link.appendChild(image);
      return link;
    }
    return null;
  }

  /* =====================================================
     MESSAGE SYSTEM
     ===================================================== */
  function addMessage(text, sender, save = true) {
    const msg = document.createElement("div");
    msg.className = `fc-message ${sender}`;
    const textElement = document.createElement("div");
    textElement.className a= "fc-message-text";
    textElement.textContent = text;
    msg.appendChild(textElement);
    const preview = createLinkPreview(text);
    if (preview) msg.appendChild(preview);
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
    if (save) {
      const saved = JSON.parse(localStorage.getItem("fc-chat-messages") || "[]");
      saved.push({ text, sender, time: new Date().toISOString() });
      localStorage.setItem("fc-chat-messages", JSON.stringify(saved));
    }
  }

  /* =====================================================
     LOAD SAVED CHAT
     ===================================================== */
  function loadMessages() {
    const saved = JSON.parse(localStorage.getItem("fc-chat-messages") || "[]");
    if (saved.length === 0) {
      addMessage("🎬 Welcome to Chat Everywhere! Try the Dark Mode toggle in the Tools tab!", "bot", false);
      return;
    }
    saved.forEach((m) => addMessage(m.text, m.sender, false));
  }
  loadMessages();

  /* =====================================================
     SEND MESSAGE
     ===================================================== */
  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, "user");
    input.value = "";
    setTimeout(() => {
      addMessage("🎬 Message received! Your chat is working!", "bot");
    }, 500);
  }
  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  /* =====================================================
     TAB SYSTEM
     ===================================================== */
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => t.classList.remove("active"));
      chatbox.querySelectorAll(".fc-panel").forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      const panel = chatbox.querySelector("#fc-tab-" + target);
      if (panel) panel.classList.add("active");
      inputRow.style.display = target === "chats" ? "flex" : "none";
    });
  });

  /* =====================================================
     MEDIA
     ===================================================== */
  const mediaInput = chatbox.querySelector("#fc-media-input");
  const addMedia = chatbox.querySelector("#fc-add-media");
  const mediaGallery = chatbox.querySelector("#fc-media-gallery");
  addMedia.addEventListener("click", () => mediaInput.click());
  mediaInput.addEventListener("change", () => {
    Array.from(mediaInput.files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const item = document.createElement("div");
      item.className = "fc-media-item";
      if (file.type.startsWith("image/")) {
        item.innerHTML = `<img src="${url}" alt="${escapeHTML(file.name)}"><span>${escapeHTML(file.name)}</span>`;
      } else if (file.type.startsWith("video/")) {
        item.innerHTML = `<video src="${url}" controls></video><span>${escapeHTML(file.name)}</span>`;
      } else if (file.type.startsWith("audio/")) {
        item.innerHTML = `<div class="fc-audio-icon">🎵</div><audio src="${url}" controls><span>${escapeHTML(file.name)}</span>`;
      }
      mediaGallery.appendChild(item);
    });
    mediaInput.value = "";
  });

  /* =====================================================
     GROUPS
     ===================================================== */
  const createGroup = chatbox.querySelector("#fc-create-group");
  const groupsList = chatbox.querySelector("#fc-groups-list");
  createGroup.addEventListener("click", () => {
    const name = prompt("Enter the group name:");
    if (!name || !name.trim()) return;
    const group = document.createElement("div");
    group.className = "fc-group-card";
    group.innerHTML = `
      <div class="fc-group-icon">👥</div>
      <div class="fc-group-info">
        <strong>${escapeHTML(name)}</strong>
        <small>1 member</small>
      </div>
      <button class="fc-delete-group" type="button">×</button>
    `;
    groupsList.appendChild(group);
    group.querySelector(".fc-delete-group").addEventListener("click", () => group.remove());
  });

  /* =====================================================
     SHARES
     ===================================================== */
  const shareInput = chatbox.querySelector("#fc-share-input");
  const shareButton = chatbox.querySelector("#fc-share-button");
  const sharesList = chatbox.querySelector("#fc-shares-list");
  shareButton.addEventListener("click", addShare);
  shareInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addShare();
    }
  });
  function addShare() {
    const link = shareInput.value.trim();
    if (!link) return;
    const card = document.createElement("div");
    card.className = "fc-share-card";
    card.innerHTML = `
      <div class="fc-share-icon">🔗</div>
      <div class="fc-share-info">
        <strong>Shared Link</strong>
        <small>${escapeHTML(link)}</small>
      </div>
      <button class="fc-copy-share" type="button">Copy</button>
    `;
    sharesList.appendChild(card);
    card.querySelector(".fc-copy-share").addEventListener("click", function () {
      navigator.clipboard.writeText(link).then(() => {
        this.textContent = "Copied!";
        setTimeout(() => { this.textContent = "Copy"; }, 1500);
      });
    });
    shareInput.value = "";
  }

  /* =====================================================
     ESCAPE HTML
     ===================================================== */
  function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
})();