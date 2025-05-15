document.getElementById('hideAds').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        document.querySelectorAll('shreddit-ad-post').forEach((ad) => {
          if (!ad.dataset.hidden) {
            const adInfoDiv = document.createElement('div');
            adInfoDiv.textContent = 'Ad hidden';
            adInfoDiv.style = 'color: red; font-weight: bold;';
            ad.style.display = 'none';
            ad.appendChild(adInfoDiv);
            ad.dataset.hidden = 'true';
          }
        });
      }
    });
  });
});
