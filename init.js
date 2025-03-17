export function init(record) {
  const elements = document.querySelectorAll(
    'input[type="text"][data-easter], textarea[data-easter]'
  );

  elements.forEach((el) => {
    el.addEventListener("keyup", record);
  });

  const observeDOM = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (
              (node.tagName === "INPUT" &&
                node.type === "text" &&
                node.getAttribute("data-easter") === "true") ||
              (node.tagName === "TEXTAREA" &&
                node.getAttribute("data-easter") === "true")
            ) {
              node.addEventListener("keyup", record);
            }

            const newElements = node.querySelectorAll(
              'input[type="text"][data-easter="true"], textarea[data-easter="true"]'
            );
            newElements.forEach((el) => {
              el.addEventListener("keyup", record);
            });
          }
        });
      }
    });
  });

  observeDOM.observe(document.body, { childList: true, subtree: true });
}
