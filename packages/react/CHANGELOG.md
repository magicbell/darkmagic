# @darkmagic/react

## 0.9.0

### Minor Changes

- [#7](https://github.com/magicbell-io/darkmagic/pull/7) [`6d1edd6`](https://github.com/magicbell-io/darkmagic/commit/6d1edd6d9c304b77d013049a90c8e704312823ba) Thanks [@kgray-MB](https://github.com/kgray-MB)!

  - Set cursor style to 'pointer' for button, iconButton, select, and tabs
  - Added 'padding' prop to popover (default: 'md')
  - Set padding between pane title and tabs to '$6' (was '$2')
  - Added options '2' and '3' to 'bg' prop for code component
  - Set copyButton in code component to 'position: absolute' in top right corder of code 'pre'
  - Set copyButton in code component to show on hover
  - Set copyButton variant="icon" to size="md"

- [#9](https://github.com/magicbell-io/darkmagic/pull/9) [`a3c621b`](https://github.com/magicbell-io/darkmagic/commit/a3c621b2100484178e5a8f26c33e7835b0be92b6) Thanks [@kgray-MB](https://github.com/kgray-MB)! - Update style preview drawers from being scrollable
  Change default drawer background color to 'bg-app'

## 0.8.1

### Patch Changes

- [`0c9d11e`](https://github.com/magicbell-io/darkmagic/commit/0c9d11e4aec4af52b4356b32c04b63bac40e9e36) Thanks [@smeijer](https://github.com/smeijer)! - fix: accept nodes as value for description list items

## 0.8.0

### Minor Changes

- [#4](https://github.com/magicbell-io/darkmagic/pull/4) [`45ca254`](https://github.com/magicbell-io/darkmagic/commit/45ca25449e7bedde1d7178a5f2de59fce1d98584) Thanks [@hoprr](https://github.com/hoprr)! - feat: add code highlight support for bash, clojure, curl, go, graphql, node, php and swift

### Patch Changes

- [`6591f6a`](https://github.com/magicbell-io/darkmagic/commit/6591f6a6c4fb42c79c2d41d4da783a376f79967f) Thanks [@smeijer](https://github.com/smeijer)! - feat: disable autocomplete for lastpass and dashlane

## 0.7.1

### Patch Changes

- [`6f4ea64`](https://github.com/magicbell-io/darkmagic/commit/6f4ea64cb6cf810ebb6974a2bb15fd108935a013) Thanks [@smeijer](https://github.com/smeijer)! - remove height from table cell

## 0.7.0

### Minor Changes

- [`a371672`](https://github.com/magicbell-io/darkmagic/commit/a371672c19dadf4d290633734490e13f47864a75) Thanks [@smeijer](https://github.com/smeijer)! - Various small fixes:

  fix: correct color token
  feat: add flex gap 10
  feat: add asChild to TextArea for use with content-editables
  feat: add onValueChange to input

## 0.6.0

### Minor Changes

- [`58c0e48`](https://github.com/magicbell-io/darkmagic/commit/58c0e48bb376718275de85ec4502b4c5dfc992f6) Thanks [@smeijer](https://github.com/smeijer)! - fix: correct icon color on Avatar variant fill
  feat: replace outline with border, background and rounded variants
  feat: allow overriding css on Card
  feat: allow overriding className on Input
  feat: add noSelect variant to typography
