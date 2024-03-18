/* Credit to tkrotoff for these mocks per https://gist.github.com/tkrotoff/52f4a29e919445d6e97f9a9e44ada449 */

class WindowLocationMock implements Location {
  private url: URL;

  internalSetURLFromHistory(newURL: string | URL) {
    this.url = new URL(newURL, this.url);
  }

  constructor(url: string) {
    this.url = new URL(url);
  }

  toString() {
    return this.url.toString();
  }

  readonly ancestorOrigins = [] as unknown as DOMStringList;

  get href() {
    return this.url.toString();
  }
  set href(newUrl) {
    this.assign(newUrl);
  }

  get origin() {
    return this.url.origin;
  }

  get protocol() {
    return this.url.protocol;
  }
  set protocol(v) {
    const newUrl = new URL(this.url);
    newUrl.protocol = v;
    this.assign(newUrl);
  }

  get host() {
    return this.url.host;
  }
  set host(v) {
    const newUrl = new URL(this.url);
    newUrl.host = v;
    this.assign(newUrl);
  }

  get hostname() {
    return this.url.hostname;
  }
  set hostname(v) {
    const newUrl = new URL(this.url);
    newUrl.hostname = v;
    this.assign(newUrl);
  }

  get port() {
    return this.url.port;
  }
  set port(v) {
    const newUrl = new URL(this.url);
    newUrl.port = v;
    this.assign(newUrl);
  }

  get pathname() {
    return this.url.pathname;
  }
  set pathname(v) {
    const newUrl = new URL(this.url);
    newUrl.pathname = v;
    this.assign(newUrl);
  }

  get search() {
    return this.url.search;
  }
  set search(v) {
    const newUrl = new URL(this.url);
    newUrl.search = v;
    this.assign(newUrl);
  }

  get hash() {
    return this.url.hash;
  }
  set hash(v) {
    const newUrl = new URL(this.url);
    newUrl.hash = v;
    this.assign(newUrl);
  }

  assign(newUrl: string | URL) {
    window.history.pushState(null, "origin:location", newUrl);
    this.reload();
  }

  replace(newUrl: string | URL) {
    window.history.replaceState(null, "origin:location", newUrl);
    this.reload();
  }

  reload() {
    // Do nothing
  }
}

const originalLocation = window.location;

export function mockWindowLocation(url: string) {
  Object.defineProperty(window, "location", {
    value: new WindowLocationMock(url),
    writable: true,
  });
}

export function restoreWindowLocation(nullify = false) {
  if (nullify) {
    Object.defineProperty(window, "location", {
      value: null,
      writable: true,
    });
  } else {
    Object.defineProperty(window, "location", {
      value: originalLocation,
      writable: true,
    });
  }
}

function verifyOrigin(
  newURL: string | URL,
  method: "pushState" | "replaceState"
) {
  const currentOrigin = new URL(window.location.href).origin;
  if (new URL(newURL, currentOrigin).origin !== currentOrigin) {
    // Same error message as Chrome 118
    throw new DOMException(
      `Failed to execute '${method}' on 'History': A history state object with URL '${newURL.toString()}' cannot be created in a document with origin '${currentOrigin}' and URL '${
        window.location.href
      }'.`
    );
  }
}

export class WindowHistoryMock implements History {
  private index = 0;
  // Should be private but making it public makes it really easy to verify everything is OK in some tests
  public sessionHistory: [{ state: unknown; url: string }] = [
    { state: null, url: window.location.href },
  ];

  get length() {
    return this.sessionHistory.length;
  }

  scrollRestoration = "auto" as const;

  get state() {
    return this.sessionHistory[this.index]?.state;
  }

  back() {
    this.go(-1);
  }

  forward() {
    this.go(+1);
  }

  go(delta = 0) {
    if (delta === 0) {
      window.location.reload();
    }
    const newIndex = this.index + delta;
    if (newIndex < 0 || newIndex >= this.length) {
      // Do nothing
    } else if (newIndex === this.index) {
      // Do nothing
    } else {
      this.index = newIndex;

      const historyItem = this.sessionHistory[this.index];
      if (historyItem) {
        (window.location as WindowLocationMock).internalSetURLFromHistory(
          historyItem.url
        );
        dispatchEvent(new PopStateEvent("popstate", { state: this.state }));
      }
    }
  }

  pushState(data: unknown, unused: string, url?: string | URL | null) {
    if (url) {
      if (unused !== "origin:location") {
        verifyOrigin(url, "pushState");
      }
      (window.location as WindowLocationMock).internalSetURLFromHistory(url);
    }
    this.sessionHistory.push({
      state: structuredClone(data),
      url: window.location.href,
    });
    this.index++;
    dispatchEvent(new PopStateEvent("popstate", { state: this.state }));
  }

  replaceState(data: unknown, unused: string, url?: string | URL | null) {
    if (url) {
      if (unused !== "origin:location") {
        verifyOrigin(url, "replaceState");
      }
      (window.location as WindowLocationMock).internalSetURLFromHistory(url);
    }
    this.sessionHistory[this.index] = {
      state: structuredClone(data),
      url: window.location.href,
    };
  }
}

const originalHistory = window.history;

export function mockWindowHistory() {
  Object.defineProperty(window, "history", {
    value: new WindowHistoryMock(),
    writable: true,
  });
}

export function restoreWindowHistory() {
  Object.defineProperty(window, "history", {
    value: originalHistory,
    writable: true,
  });
}
