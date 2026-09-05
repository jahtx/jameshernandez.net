async function copyCode(block: HTMLPreElement, link: HTMLAnchorElement) {
  if (!block || !link) return; // Check if block or link is null or undefined
  const code = block.querySelector('code');
  if (!code) return; // Check if code is null or undefined
  const text = code.innerText;

  await navigator.clipboard.writeText(text);

  // Temporarily replace the link text with 'Copied'
  link.textContent = 'Copied!';
  setTimeout(() => {
    link.textContent = 'Copy Code';
  }, 3000); // Reset link text after 3 seconds
}

export function addCopyCodeFunctionality() {
  const copyButtonLabel = 'Copy Code';
  const blocks = document.querySelectorAll('pre');

  blocks.forEach((block) => {
    // only add link if browser supports Clipboard API
    if (navigator.clipboard) {
      // Create a div to contain the link
      const div = document.createElement('div');
      div.className = 'copyLine d-flex justify-content-end w-100';

      // Create the link
      const link = document.createElement('a');

      // Set the href attribute of the link
      link.href = '#'; // Replace '#' with the appropriate URL if needed

      // Create a text node for the link label
      const textNode = document.createTextNode(copyButtonLabel);

      // Append text node to link
      link.appendChild(textNode);

      // Append link to the div
      div.appendChild(link);

      // Insert the div above <pre>
      if (block.parentNode) {
        block.parentNode.insertBefore(div, block);
      }

      link.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent default link behavior
        await copyCode(block, link); // Pass link as an argument
      });
    }
  });
}
