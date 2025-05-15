function hideAds() {
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

// Reddit will attempt to reinstate any removed ads using v1, but wont do so with v2
// This is a more robust solution that will waste less resources for the user in the long term
function hideAdsV2() {
  document.querySelectorAll('shreddit-ad-post').forEach((ad) => {
    if (!ad.dataset.hidden) {
      ad.querySelectorAll('*').forEach((child) => {
        child.removeAttribute('style');
        child.className = '';
      });

      ad.innerHTML = '';

      const adInfoDiv = document.createElement('div');
      adInfoDiv.textContent = 'Ad removed';
      adInfoDiv.style = 'color: red; font-weight: bold;';
      ad.appendChild(adInfoDiv);

      ad.dataset.hidden = 'true';
      console.log('[Content Script] Promoted ad cleaned up');
    }
  });
}


hideAdsV2();

// This ensures that any new ads added to the page will also be hidden
const observer = new MutationObserver(hideAdsV2);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
