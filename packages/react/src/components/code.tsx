import { ChevronDownIcon } from '@radix-ui/react-icons';
import { HighlightResult } from 'highlight.js';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import clojure from 'highlight.js/lib/languages/clojure';
import go from 'highlight.js/lib/languages/go';
import graphql from 'highlight.js/lib/languages/graphql';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import shell from 'highlight.js/lib/languages/shell';
import swift from 'highlight.js/lib/languages/swift';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import parserHtml from 'prettier/parser-html';
import parserTypescript from 'prettier/parser-typescript';
import prettier from 'prettier/standalone';
import { useMemo, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

import { stringify as parserJson } from '../lib/json-stringify';
import { ComponentProps, styled } from '../lib/stitches';
import { Box } from './box';
import { Button } from './button';
import { CopyButton } from './copy-button';
import { Flex } from './flex';
import { ScrollArea } from './scroll-area';

hljs.registerLanguage('json', json);
// xml is required for jsx in javascript/typescript files
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('clojure', clojure);
hljs.registerLanguage('curl', shell);
hljs.registerLanguage('go', go);
hljs.registerLanguage('graphql', graphql);
hljs.registerLanguage('java', java);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('node', javascript);
hljs.registerLanguage('php', php);
hljs.registerLanguage('python', python);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('swift', swift);
hljs.registerLanguage('typescript', typescript);

const StyledExpandIcon = styled('span', {
  display: 'inline',
  flex: 'none',
  transition: 'transform 0.2s ease',

  variants: {
    direction: {
      up: { transform: 'scaleY(-1)' },
      down: {},
    },
  },
});

const StyledCopyButton = styled('div', {
  position: 'absolute',
  top: 0,
  right: 0,
  opacity: 0,
  transition: 'all .14s ease-out',
  zIndex: 1,
});

const StyledTitle = styled('div', {
  font: '$body-small-bold',
  color: '$text-muted',
});

const StyledPre = styled('pre', {
  padding: 0,
  outline: 'none',
  fontSize: 13,
  lineHeight: '140%',
  font: '$mono',

  '& code': {
    all: 'unset',
    font: '$mono',
  },

  '& code.hljs': {
    display: 'block',
    padding: 0,
  },

  '& .hljs': {
    color: '$text-default',
    background: '$bg-app',
  },

  '& .hljs ::selection, & .hljs::selection': {
    backgroundColor: '$border-muted',
    color: '$text-default',
  },

  '& .hljs-comment': {
    color: '$text-muted',
  },

  '& .hljs-tag': {
    color: '$text-muted',
  },

  '& .hljs-operator, & .hljs-punctuation, & .hljs-subst': {
    color: '$text-muted',
  },

  '& .hljs-operator': {
    opacity: '0.7',
  },

  '& .hljs-bullet, & .hljs-deletion, & .hljs-name, & .hljs-selector-tag, & .hljs-template-variable, & .hljs-variable': {
    color: '$text-error',
  },

  '& .hljs-attr, & .hljs-link, & .hljs-literal,& .hljs-number,& .hljs-symbol,& .hljs-variable.constant_': {
    color: '$text-highlight',
  },

  '& .hljs-class .hljs-title, & .hljs-title, & .hljs-title.class_': {
    color: '$text-warning',
  },

  '& .hljs-strong': {
    fontWeight: '700',
    color: '$text-warning',
  },

  '& .hljs-addition,  & .hljs-code,  & .hljs-string, & .hljs-title.class_.inherited__': {
    color: '$text-default',
  },
  '& .hljs-built_in, & .hljs-doctag, & .hljs-keyword.hljs-atrule, & .hljs-quote, & .hljs-regexp': {
    color: '$text-link',
  },

  '& .hljs-attribute, & .hljs-function .hljs-title, & .hljs-section, & .hljs-title.function_, & .ruby .hljs-property': {
    color: '$text-link',
  },

  '& .diff .hljs-meta, & .hljs-keyword, & .hljs-template-tag, & .hljs-type': {
    color: '$text-info',
  },
  '& .hljs-emphasis': {
    color: '$text-info',
    fontStyle: 'italic',
  },
  '& .hljs-meta, & .hljs-meta .hljs-keyword, & .hljs-meta .hljs-string': {
    color: '$text-error',
  },
  '& .hljs-meta .hljs-keyword, & .hljs-meta-keyword': {
    fontWeight: 700,
  },

  // line numbers
  '& .hljs-ln': {
    borderCollapse: 'collapse',
    borderSpacing: 0,
    cellPadding: 0,
  },

  '& .hljs-ln td': {
    padding: 0,
  },

  '& .hljs-ln td.hljs-ln-numbers': {
    userSelect: 'none',
    textAlign: 'right',
    verticalAlign: 'top',
    padding: '0 $2',
    color: '$text-muted',

    position: 'sticky',
    left: 0,
    backgroundColor: '$bg-app',
  },

  '& .hljs-ln td.hljs-ln-code': {},

  '& .hljs .hljs-ln-n:before': {
    content: 'attr(data-line-number)',
  },

  variants: {
    bg: {
      1: {
        '& code.hljs, & .hljs-ln td.hljs-ln-numbers': {
          backgroundColor: '$bg-app',
        },
      },
      2: {
        '& code.hljs, & .hljs-ln td.hljs-ln-numbers': {
          backgroundColor: '$bg-app-2',
        },
      },
      3: {
        '& code.hljs, & .hljs-ln td.hljs-ln-numbers': {
          backgroundColor: '$bg-default',
        },
      },
    },
  },
});

// based on the https://github.com/wcoder/highlightjs-line-numbers.js by @wcoder
function addLineNumbers(source: HighlightResult) {
  const lines = source.value.split(/\r\n|\r|\n/g);

  let html = '';

  let inBlockComment = false;
  for (let i = 0; i < lines.length; i++) {
    const num = `<div class="hljs-ln-line hljs-ln-n" data-line-number="${i + 1}"></div>`;
    let line = lines[i];

    // block comments were rendered in a single span, and now divided.
    if (!inBlockComment && line.trim().startsWith('<span class="hljs-comment">/**')) {
      inBlockComment = true;
      line = `${line}</span>`;
    } else if (inBlockComment && line.trim().endsWith('*/</span>')) {
      inBlockComment = false;
      line = `<span class="hljs-comment">${line}`;
    } else if (inBlockComment) {
      line = `<span class="hljs-comment">${line}</span>`;
    }

    const code = `<div class="hljs-ln-line">${line}</div>`;
    html += `<tr><td class="hljs-ln-numbers">${num}</td><td class="hljs-ln-code">${code}</td></tr>`;
  }

  return {
    ...source,
    value: `<table class="hljs-ln">${html}</table>`,
    lineCount: lines.length,
  };
}

const tsLanguages = new Set(['js', 'ts', 'node', 'tsx', 'javascript', 'typescript']);
const xmlLanguages = new Set(['xml', 'html', 'xhtml', 'svg']);

type CodeProps = {
  /**
   * The code to be rendered.
   */
  children: string | Record<string, unknown>;
  /**
   * An optional caption to render above the code block.
   */
  caption?: string;
  /**
   * What language to use for syntax highlighting
   */
  lang:
    | 'bash'
    | 'clojure'
    | 'curl'
    | 'go'
    | 'graphql'
    | 'java'
    | 'javascript'
    | 'json'
    | 'node'
    | 'php'
    | 'python'
    | 'ruby'
    | 'shell'
    | 'swift'
    | 'tsx'
    | 'typescript'
    | 'xml';
  /**
   * Only show the first `n` lines of code, and render a button to "show more".
   * Set to 0 to show all.
   */
  lineClamp?: number;
  /**
   * Hide or show the copy button. Defaults to `true`.
   */
  showCopyButton?: boolean;
  /**
   * Use to disable scrollbars and hand over scrolling to the parent.
   */
  scroll?: ComponentProps<typeof ScrollArea>['direction'];

  /**
   * Preferred max width of lines in the code block.
   */
  printWidth?: number;

  /**
   * Show line numbers, defaults to true
   */
  lineNumbers?: boolean;

  /**
   * Padding around the code block. Defaults to `sm`.
   */
  padding?: 'none' | 'sm' | 'md';

  /**
   * Use a different background color to match background with raised elements. For example `bg={2}` when rendering
   * a Code component in a Drawer.
   */
  bg?: 1 | 2 | 3;
};

const Wrapper = styled('div', {
  borderRadius: '$lg',
  position: 'relative',

  [`&:hover ${StyledCopyButton}`]: {
    opacity: 1,
  },

  variants: {
    bg: {
      1: {
        backgroundColor: '$bg-app',
      },
      2: {
        backgroundColor: '$bg-app-2',
      },
      3: {
        backgroundColor: '$bg-default',
      },
    },

    padding: {
      none: {
        padding: 0,
      },
      sm: {
        padding: '$2',
      },
      md: {
        padding: '$2 $4',
      },
    },
  },
});

export function Code({
  children,
  lang,
  caption,
  lineClamp = 17,
  showCopyButton = true,
  lineNumbers = true,
  scroll,
  printWidth = 72,
  bg = 1,
  padding = 'sm',
}: CodeProps) {
  const highlighted = useMemo(() => {
    const isTypescript = tsLanguages.has(lang);
    const isXml = xmlLanguages.has(lang);

    const formatted =
      lang === 'json'
        ? parserJson(typeof children === 'string' ? JSON.parse(children) : children, { maxLength: printWidth })
            .replace(/{"/g, '{ "')
            .replace(/(["\]])}/g, '$1 }')
        : isTypescript || isXml
        ? prettier.format(String(children), {
            parser: isTypescript ? 'typescript' : 'html',
            plugins: isTypescript ? [parserTypescript] : [parserHtml],
            printWidth,
            singleQuote: false,
          })
        : String(children);

    const highlighted = hljs.highlight(formatted.trim(), { language: lang });
    return addLineNumbers(highlighted);
  }, [children, lang, printWidth]);

  const buttonArea = 3;
  const truncate = lineClamp > 0 && highlighted.lineCount > lineClamp + buttonArea;
  const [isCollapsed, setIsCollapsed] = useState(truncate);

  const css = {
    [`& tr:nth-child(n+${lineClamp + 1})`]: truncate && isCollapsed ? { display: 'none' } : {},
    '& .hljs-ln-numbers': lineNumbers ? {} : { display: 'none' },
  };

  return (
    <Box>
      {caption ? (
        <Flex justify="between">
          <StyledTitle>{caption}</StyledTitle>
        </Flex>
      ) : null}

      {/* We set the code snippets width, to prevent it from aut-growing of (flex) parents */}
      <AutoSizer disableHeight>
        {({ width }: { width: number }) => (
          <Wrapper data-width={width} padding={padding} bg={bg} css={{ width }}>
            {showCopyButton && (
              <StyledCopyButton>
                <CopyButton value={String(highlighted.code)} />
              </StyledCopyButton>
            )}
            <ScrollArea direction={scroll}>
              <StyledPre tabIndex={0} css={css} bg={bg}>
                <code className="hljs" dangerouslySetInnerHTML={{ __html: highlighted.value }} />
              </StyledPre>
            </ScrollArea>
          </Wrapper>
        )}
      </AutoSizer>

      {truncate ? (
        <Box pt={4}>
          <Button
            variant="secondary"
            size="sm"
            leadingIcon={
              <StyledExpandIcon direction={isCollapsed ? 'down' : 'up'}>
                <ChevronDownIcon />
              </StyledExpandIcon>
            }
            onClick={() => setIsCollapsed((c) => !c)}
          >
            {isCollapsed ? `Show all ${highlighted.lineCount} lines` : 'Show less'}
          </Button>
        </Box>
      ) : null}
    </Box>
  );
}
