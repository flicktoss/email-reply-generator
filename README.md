# 📬 MailGenie – AI-Powered Smart Reply Extension for Gmail

**MailGenie** is a Chrome Extension that integrates directly into Gmail and helps you write professional, friendly, or casual replies using AI. It streamlines your email workflow by generating context-aware responses with a single click.

---

## ✨ Features

- ✅ Seamless integration with Gmail
- ✍️ One-click "AI Reply" button in compose window
- 🧠 Auto-generates replies using content of received emails
- 🎯 Select default tone (Professional, Friendly, Casual)
- 🌗 Elegant and modern dark-themed popup UI
- 🔧 Persistent settings with Chrome Storage API
- 🔌 Backend-connected via HTTP API

---


## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/MailGenie.git
cd MailGenie


### 2. Load the Extension in Chrome

1. Open `chrome://extensions/`
2. Enable **Developer Mode** (top-right)
3. Click **Load unpacked**
4. Select the folder containing `manifest.json`


## 🛠️ Folder Structure

MailGenie/
├── icons/
│   └── image.png
├── scripts/
│   ├── content.js
│   └── popup.js
├── styles/
│   ├── content.css
│   └── popup.css
├── popup.html
├── manifest.json
└── README.md

---

## ⚙️ Configuration

The default tone is stored using Chrome’s storage API. You can change it via the extension popup.

**Available Tones:**

* Professional
* Friendly
* Casual

---

## 🛡️ Permissions

MailGenie uses the following permissions:

* `activeTab` – to access the Gmail tab
* `storage` – to persist user tone preference
* `host_permissions` – for `mail.google.com` and your API endpoint

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Contributing

Pull requests are welcome! If you’d like to suggest features, improvements, or bug fixes, feel free to open an issue.

---

## 💡 Future Enhancements

* ✅ Settings sync across devices
* 🔊 Tone preview examples
* 🌐 Hosted backend with secure API
* 📈 Usage analytics and insights

---

> Built with ❤️ by Naitik:)

