(function() {
  window.OptiMonkEmbedded = window.OptiMonkEmbedded || {};
  window.OptiMonk = window.OptiMonk || {};
  if(window.location.host.includes('shopifypreview.com') || !window.location.protocol.startsWith('http')) {
    return;
  }

  if (!window.OptiMonkRegistry) {
    function getStaticUrlFor(filePath) {
      return OptiMonkRegistry.staticUrl + getVersionedFile(filePath);
    }

    function getEsmFile(fileName) {
      return `${OptiMonkRegistry.esmAssetPath}/${OptiMonkRegistry.esmFiles[fileName]}`
    }
    function getVersionedFile(filePath) {
      var pathParts = filePath.split('/')
      var fileName = pathParts[pathParts.length - 1]
      return OptiMonkRegistry.fileVersions[fileName]
        ? filePath.replace(fileName, OptiMonkRegistry.fileVersions[fileName])
        : filePath
    }
    function getAssetUrlFor(filePath) {
      var assetsPath = OptiMonkRegistry.assetsPath
      if (assetsPath[assetsPath.length - 1] === '/') {
        assetsPath = assetsPath.substring(0, assetsPath.length-1);
      }
      return assetsPath + getVersionedFile(filePath)
    }

    function generateUUID() {
      function s4() {return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)};
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    OptiMonkEmbedded.isDebug = function () {
      return window.location.search.toLowerCase().includes('omdebug') || sessionStorage.getItem('omdebug') !== null;
    }

    window.OptiMonkRegistry = {
      account: 234527,
      uuid: generateUUID(),
      baseUrl: 'https://front.optimonk.com',
      beUrl: 'https://backend.optimonk.com',
      embeddedContentUrl: 'https://cdn-embedded-content.optimonk.com/public',
      jfJsScriptUrl: 'https://gs-cdn.optimonk.com/jfclientsdk/latest/jfclientsdk.min.js?ts=16',
      cdnUrl: 'https://cdn-account.optimonk.com',
      aiCdnUrl: 'https://cdn-om-ai.optimonk.com',
      aiPPOCdnUrl: 'https://cdn-ai-ppo-results.optimonk.com',
      aiPPOCdnUrlV2025: 'https://product-sync-service.optimonk.com',
      contentUrl: 'https://cdn-content.optimonk.com',
      assetsPath: 'https://cdn-asset.optimonk.com/',
      esmAssetPath: 'https://cdn-asset.optimonk.com/script.esm',
      cdnRendererUrl: 'https://front.optimonk.com',
      pncJsScriptUrl: '//cdn-pnc.optimonk.com/om-pnc-builds/main.js',
      ssrUrl: 'https://renderer.optimonk.com/ssr',
      staticUrl: '',
      accountDataUrl: 'https://cdn-account.optimonk.com',
      limitUrl: 'https://cdn-limit.optimonk.com/public',
      fileVersions: {"embeddedIntlTelInput.min.js":"embeddedIntlTelInput.min.js?v=5617f1489f","embeddedSwiper.js":"embeddedSwiper.js?v=733bcb56b6","flatpickr.min.css":"flatpickr.min.css?v=999cc26450","intlTelInput.min.js":"intlTelInput.min.js?v=ef7f2965a9","optimonk.min.css":"optimonk.min.css?v=b2efbc5949","flatpickr.min.js":"flatpickr.min.js?v=ceeb92e1d5","embeddedFlatpickr.min.js":"embeddedFlatpickr.min.js?v=084cfa1278","swiper.js":"swiper.1f9cdb4a.js","om.base.css":"om.base.7f84d9812f5980de7507.css"},
      externalValidators: {},
      trackJsApiKey: '',
      getAssetUrlFor,
      getStaticUrlFor,
      JFEvents: [],
      ReportEvents: [],
      analyticsEvents: [],
      isDebug: OptiMonkEmbedded.isDebug(),
      countryHeaderName: 'X-BunnyCDN-CountryCode'.toLowerCase(),
      ipBlockHeaderName: 'X-BunnyCDN-Client-IP'.toLowerCase(),
      activatedCampaigns: {"popup": false, "sidebar": false, "nanobar": false, "embedded": false},
      queuedCampaigns: {"popup": false, "sidebar": false, "nanobar": false, "embedded": false},
      Cookie: {
        ca: {}
      },
      variantsTypeByCampaign: {},
      esmFiles: {
        embedded: "embedded.2085332a.js"
      }
    };
  }

  if (window['OptiMonkPreloadStarted'] || typeof localStorage !== 'object') {
    return;
  }

  window.OptiMonkPreloadStarted = true;

  var script = document.createElement('script')

  const onsiteElementNonce = document.querySelector(
    'script[src*="onsite.optimonk.com"][src*="script.js"]',
  )?.nonce;
  if (onsiteElementNonce) {
    OptiMonkRegistry.nonce = onsiteElementNonce;
    script.setAttribute('nonce', `${OptiMonkRegistry.nonce}`);
  }

  script.type = 'module'
  script.src = getEsmFile('embedded')
  document.querySelector('head').appendChild(script)
}())
