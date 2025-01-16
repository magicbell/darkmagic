// COPY FROM: https://github.com/lydell/json-stringify-pretty-compact/blob/main/index.js
// copied because of cjs/esm issues with remix.
// we still add json-stringify-pretty-compact as a dependency for credits

// -----

// Note: This regex matches even invalid JSON strings, but since we’re
// working on the output of `JSON.stringify` we know that only valid strings
// are present (unless the user supplied a weird `options.indent` but in
// that case we don’t care since the output would be invalid anyway).
const stringOrChar = /("(?:[^\\"]|\\.)*")|[:,]/g;

export function stringify(
  passedObj: any,
  options: { indent?: number; maxLength?: number; replacer?: (this: any, key: string, value: any) => any },
) {
  const opts = { indent: 2, maxLength: 80, ...options };
  const indent = JSON.stringify([1], undefined, opts.indent).slice(2, -3);
  const maxLength = indent === '' ? Infinity : opts.maxLength;

  return (function _stringify(obj, currentIndent, reserved): string {
    if (obj && typeof obj.toJSON === 'function') {
      obj = obj.toJSON();
    }

    const string = JSON.stringify(obj, opts.replacer);

    if (string === undefined) {
      return string;
    }

    const length = maxLength - currentIndent.length - reserved;

    if (string.length <= length) {
      const prettified = string.replace(stringOrChar, (match, stringLiteral) => {
        return stringLiteral || `${match} `;
      });
      if (prettified.length <= length) {
        return prettified;
      }
    }

    if (opts.replacer != null) {
      obj = JSON.parse(string);
      opts.replacer = undefined;
    }

    if (typeof obj === 'object' && obj !== null) {
      const nextIndent = currentIndent + indent;
      const items = [];
      let index = 0;
      let start;
      let end;

      if (Array.isArray(obj)) {
        start = '[';
        end = ']';
        const { length } = obj;
        for (; index < length; index++) {
          items.push(_stringify(obj[index], nextIndent, index === length - 1 ? 0 : 1) || 'null');
        }
      } else {
        start = '{';
        end = '}';
        const keys = Object.keys(obj);
        const { length } = keys;
        for (; index < length; index++) {
          const key = keys[index];
          const keyPart = `${JSON.stringify(key)}: `;
          if (key == null) continue;
          const value: any = _stringify(obj[key], nextIndent, keyPart.length + (index === length - 1 ? 0 : 1));
          if (value !== undefined) {
            items.push(keyPart + value);
          }
        }
      }

      if (items.length > 0) {
        return [start, indent + items.join(`,\n${nextIndent}`), end].join(`\n${currentIndent}`);
      }
    }

    return string;
  })(passedObj, '', 0);
}
