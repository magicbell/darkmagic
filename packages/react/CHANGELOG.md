# @darkmagic/react

## 0.20.0

### Minor Changes

- [#84](https://github.com/magicbell-io/darkmagic/pull/84) [`71b69e8`](https://github.com/magicbell-io/darkmagic/commit/71b69e8f0c1bd3a051eaecf795b07210f5c2de22) Thanks [@smeijer](https://github.com/smeijer)! - use rollup 'preserve modules' to prevent bundling the dist files and improve tree shaking

## 0.19.0

### Minor Changes

- [`e0f14ed`](https://github.com/magicbell-io/darkmagic/commit/e0f14eda1edb5aab0f5e5e692ea6ff6e99a00db9) Thanks [@smeijer](https://github.com/smeijer)! - remove prettier formatting from code component

## 0.18.0

### Minor Changes

- [`7b4acf8`](https://github.com/magicbell-io/darkmagic/commit/7b4acf811f5db458fadecfde9048acfb5e32c676) Thanks [@smeijer](https://github.com/smeijer)! - change Code default lineclamp to 0

## 0.17.1

### Patch Changes

- [`422b3ac`](https://github.com/magicbell-io/darkmagic/commit/422b3ac365f107ee45f4160db1375e65daf69a4c) Thanks [@smeijer](https://github.com/smeijer)! - remove border from badge dot variant

## 0.17.0

### Minor Changes

- [`ab22716`](https://github.com/magicbell-io/darkmagic/commit/ab2271674462b9f3eda396f5ddbdc8d842c137b8) Thanks [@smeijer](https://github.com/smeijer)! - add badge variants (outline, filled, dot)

## 0.16.0

### Minor Changes

- [`64e2ece`](https://github.com/magicbell-io/darkmagic/commit/64e2ece16c9e1beb5dcad844b7e8fe40e205cead) Thanks [@smeijer](https://github.com/smeijer)! - Add native shortcut support to `Button` and `IconButton` components. With this
  change we no longer need to use `mousetrap` to bind shortcuts to buttons. Instead,
  we can just add a prop to the button and it will handle the rest. The shortcut
  is shown in a tooltip when hovering over the button.

  Using button:

  ```tsx
  <Button tooltip="save" shortcut="mod+s">
    Save
  </Button>
  ```

  Using icon button:

  ```tsx
  <IconButton tooltip="save" shortcut="mod+s" icon={SaveIcon} />
  ```

### Patch Changes

- [#51](https://github.com/magicbell-io/darkmagic/pull/51) [`5967a0f`](https://github.com/magicbell-io/darkmagic/commit/5967a0f43796d9f3b0a1265a1ddddcfcadafda52) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `react` to `>= 18.2.0`.

- [#54](https://github.com/magicbell-io/darkmagic/pull/54) [`730a7a2`](https://github.com/magicbell-io/darkmagic/commit/730a7a2f51cddcf55d4315e239b79906062b6187) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@radix-ui/colors` to `^0.1.9`.
  - updated `@radix-ui/react-accessible-icon` to `^1.0.3`.
  - updated `@radix-ui/react-accordion` to `^1.1.2`.
  - updated `@radix-ui/react-alert-dialog` to `^1.0.4`.
  - updated `@radix-ui/react-aspect-ratio` to `^1.0.3`.
  - updated `@radix-ui/react-avatar` to `^1.0.3`.
  - updated `@radix-ui/react-checkbox` to `^1.0.4`.
  - updated `@radix-ui/react-collapsible` to `^1.0.3`.
  - updated `@radix-ui/react-dialog` to `^1.0.4`.
  - updated `@radix-ui/react-hover-card` to `^1.0.6`.
  - updated `@radix-ui/react-navigation-menu` to `^1.1.3`.
  - updated `@radix-ui/react-popover` to `^1.0.6`.
  - updated `@radix-ui/react-radio-group` to `^1.1.3`.
  - updated `@radix-ui/react-scroll-area` to `^1.0.4`.
  - updated `@radix-ui/react-select` to `^1.2.2`.
  - updated `@radix-ui/react-separator` to `^1.0.3`.
  - updated `@radix-ui/react-slider` to `^1.1.2`.
  - updated `@radix-ui/react-slot` to `^1.0.2`.
  - updated `@radix-ui/react-switch` to `^1.0.3`.
  - updated `@radix-ui/react-tabs` to `^1.0.4`.
  - updated `@radix-ui/react-toast` to `^1.1.4`.
  - updated `@radix-ui/react-toggle` to `^1.0.3`.
  - updated `@radix-ui/react-toggle-group` to `^1.0.4`.
  - updated `@radix-ui/react-toolbar` to `^1.0.4`.
  - updated `@radix-ui/react-tooltip` to `^1.0.6`.
  - updated `@radix-ui/react-visually-hidden` to `^1.0.3`.

## 0.15.0

### Minor Changes

- [`32526cc`](https://github.com/magicbell-io/darkmagic/commit/32526ccf74e823425f1c7765fd1f99988cc5fed8) Thanks [@smeijer](https://github.com/smeijer)! - - add `kbd` component to show shortcuts
  - export `writeToClipboard` function
  - add support for `shortcut` to tooltip
  - add support for `tooltip` to `IconButton`
  - add tooltip to `Drawer` close button
  - add `4xs` cell width for icon columns
  - don't bind mousetrap when no key is provided

## 0.14.0

### Minor Changes

- [`baa24a8`](https://github.com/magicbell-io/darkmagic/commit/baa24a828c1334d052f62b3451b727a4c8681318) Thanks [@smeijer](https://github.com/smeijer)! - Add support for non modal drawers. When providing `modal={fals}` to a drawer,
  it will not render an overlay, interaction with the page below is still possible,
  and interaction with the page below will not result in closing the drawer.

### Patch Changes

- [`c60c9b8`](https://github.com/magicbell-io/darkmagic/commit/c60c9b820c41ed6849aae1b315611da5289b500a) Thanks [@smeijer](https://github.com/smeijer)! - fix pane title truncation

## 0.13.0

### Minor Changes

- [`46a184d`](https://github.com/magicbell-io/darkmagic/commit/46a184daac05e0c54182c98aeede24d5a989393c) Thanks [@smeijer](https://github.com/smeijer)! - chore: remove relative position from table cells

## 0.12.1

### Patch Changes

- [#61](https://github.com/magicbell-io/darkmagic/pull/61) [`edfe623`](https://github.com/magicbell-io/darkmagic/commit/edfe62304992eb1ec98ea2d8b66ff0ff92a5dd1e) Thanks [@smeijer](https://github.com/smeijer)! - fix: default to button idle state

## 0.12.0

### Minor Changes

- [#59](https://github.com/magicbell-io/darkmagic/pull/59) [`128e51b`](https://github.com/magicbell-io/darkmagic/commit/128e51be64d7abadc54b0a18a81324b6ed9ba13f) Thanks [@smeijer](https://github.com/smeijer)! - add loading, error, and success state to button component

## 0.11.0

### Minor Changes

- [`f15c53f`](https://github.com/magicbell-io/darkmagic/commit/f15c53f1e180eca730728975c286f38461415c4f) Thanks [@smeijer](https://github.com/smeijer)! - The button component now supports a fixed width via the `width` prop.

- [`231f97d`](https://github.com/magicbell-io/darkmagic/commit/231f97dbb140e8f7c8faa8fb0812f25c44e9ff67) Thanks [@smeijer](https://github.com/smeijer)! - Card component now supports a `gap` property to control spacing between card title/description and body.

### Patch Changes

- [#46](https://github.com/magicbell-io/darkmagic/pull/46) [`2bc9226`](https://github.com/magicbell-io/darkmagic/commit/2bc9226459ad89866a61d1e30c04aed94e8bfa4a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `tiny-invariant` to `^1.3.1`.

## 0.10.0

### Minor Changes

- [#42](https://github.com/magicbell-io/darkmagic/pull/42) [`266a102`](https://github.com/magicbell-io/darkmagic/commit/266a102aa0bebc2803ffd8141e6e017239c23e9b) Thanks [@smeijer](https://github.com/smeijer)! - add padding and border radius to Code

### Patch Changes

- [#45](https://github.com/magicbell-io/darkmagic/pull/45) [`3f1e1f9`](https://github.com/magicbell-io/darkmagic/commit/3f1e1f91bb6fe15a30f15709baa5c56ec84e2df2) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `is-what` to `^4.1.15`.

- [#40](https://github.com/magicbell-io/darkmagic/pull/40) [`8d5b990`](https://github.com/magicbell-io/darkmagic/commit/8d5b9909c3637dca2640695fdd18d86fa5a5c2c6) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `is-what` to `^4.1.10`.

- [#36](https://github.com/magicbell-io/darkmagic/pull/36) [`7e40dc0`](https://github.com/magicbell-io/darkmagic/commit/7e40dc0c2ea5c3624c9c357f90c3abd43498cbd5) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `is-what` to `^4.1.9`.

## 0.9.1

### Patch Changes

- [#29](https://github.com/magicbell-io/darkmagic/pull/29) [`3a52f91`](https://github.com/magicbell-io/darkmagic/commit/3a52f913722eb46d14d8f54720a9f223e7825b78) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `prettier` to `^2.8.8`.
  - updated `@types/prettier` to `^2.7.2`.

- [#17](https://github.com/magicbell-io/darkmagic/pull/17) [`6318426`](https://github.com/magicbell-io/darkmagic/commit/6318426586d15ed7faff9a96ac9a7d200890d578) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@radix-ui/react-accessible-icon` to `^1.0.2`.
  - updated `@radix-ui/react-accordion` to `^1.1.1`.
  - updated `@radix-ui/react-alert-dialog` to `^1.0.3`.
  - updated `@radix-ui/react-aspect-ratio` to `^1.0.2`.
  - updated `@radix-ui/react-avatar` to `^1.0.2`.
  - updated `@radix-ui/react-checkbox` to `^1.0.3`.
  - updated `@radix-ui/react-collapsible` to `^1.0.2`.
  - updated `@radix-ui/react-dialog` to `^1.0.3`.
  - updated `@radix-ui/react-hover-card` to `^1.0.5`.
  - updated `@radix-ui/react-icons` to `^1.3.0`.
  - updated `@radix-ui/react-navigation-menu` to `^1.1.2`.
  - updated `@radix-ui/react-popover` to `^1.0.5`.
  - updated `@radix-ui/react-radio-group` to `^1.1.2`.
  - updated `@radix-ui/react-scroll-area` to `^1.0.3`.
  - updated `@radix-ui/react-select` to `^1.2.1`.
  - updated `@radix-ui/react-separator` to `^1.0.2`.
  - updated `@radix-ui/react-slider` to `^1.1.1`.
  - updated `@radix-ui/react-slot` to `^1.0.1`.
  - updated `@radix-ui/react-switch` to `^1.0.2`.
  - updated `@radix-ui/react-tabs` to `^1.0.3`.
  - updated `@radix-ui/react-toast` to `^1.1.3`.
  - updated `@radix-ui/react-toggle` to `^1.0.2`.
  - updated `@radix-ui/react-toggle-group` to `^1.0.3`.
  - updated `@radix-ui/react-toolbar` to `^1.0.3`.
  - updated `@radix-ui/react-tooltip` to `^1.0.5`.
  - updated `@radix-ui/react-visually-hidden` to `^1.0.2`.

- [#30](https://github.com/magicbell-io/darkmagic/pull/30) [`8903bc6`](https://github.com/magicbell-io/darkmagic/commit/8903bc6d40feb61f22703f1d98e2525dc4b5147d) Thanks [@smeijer](https://github.com/smeijer)! - fix: ensure that fonts are properly imported

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

- [#9](https://github.com/magicbell-io/darkmagic/pull/9) [`a3c621b`](https://github.com/magicbell-io/darkmagic/commit/a3c621b2100484178e5a8f26c33e7835b0be92b6) Thanks [@kgray-MB](https://github.com/kgray-MB)!

  - Update style preview drawers from being scrollable
  - Change default drawer background color to 'bg-app'

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
