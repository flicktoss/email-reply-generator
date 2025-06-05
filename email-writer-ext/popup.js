document.addEventListener('DOMContentLoaded', () => {
  const toneSelect = document.getElementById('tone');
  const messageDiv = document.getElementById('message');

  chrome.storage.sync.get('defaultTone', (data) => {
    if (data.defaultTone) {
      toneSelect.value = data.defaultTone;
    }
  });

  document.getElementById('save').addEventListener('click', () => {
    const tone = toneSelect.value;
    chrome.storage.sync.set({ defaultTone: tone }, () => {
      messageDiv.textContent = "✅ Settings saved!";
      setTimeout(() => messageDiv.textContent = "", 2000);
    });
  });
});
