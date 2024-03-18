const originalScrollTo = window.scrollTo;

export function mockWindowScrollTo() {
  Object.defineProperty(window, "scrollTo", {
    value: (pageXOffset: number, pageYOffset: number) => {
      window.scrollX = pageXOffset;
      window.scrollY = pageYOffset;
    },
    writable: true,
  });
}

export function restoreWindowScrollTo() {
  Object.defineProperty(window, "scrollTo", {
    value: originalScrollTo,
    writable: true,
  });
}
