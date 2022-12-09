/**
 * Programmatically update the value of an input AND trigger the onChange event
 */
export function triggerChange(input: HTMLInputElement | null | undefined, value: string) {
  if (!input) return;

  const valueSetter = Object.getOwnPropertyDescriptor(input, 'value')?.set;
  if (!valueSetter) return;

  const prototype = Object.getPrototypeOf(input);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;
  if (!prototypeValueSetter) return;

  const setter = valueSetter !== prototypeValueSetter ? prototypeValueSetter : valueSetter;
  setter.call(input, value);

  input.dispatchEvent(new Event('input', { bubbles: true }));
}

/**
 * Write to clipboard with legacy browser fallback
 */
export async function writeToClipboard(text: string) {
  let textArea;
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    //use document.execCommand('copy') as fallback
    textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
  } finally {
    if (textArea) {
      document.body.removeChild(textArea);
    }
  }
}
