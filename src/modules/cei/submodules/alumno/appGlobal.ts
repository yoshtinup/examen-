declare global {
  var SHOWINTERFACE: {
    showButtons: boolean;
    showSuggestions: boolean;
    showAppeal: boolean;
    showRealStatus: boolean;
  };
}

globalThis.SHOWINTERFACE = {
  showButtons: true,
  showSuggestions: false,
  showAppeal: false,
  showRealStatus: false,
};

Object.freeze(globalThis.SHOWINTERFACE);

export {};
