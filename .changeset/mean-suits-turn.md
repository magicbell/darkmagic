---
'@darkmagic/react': minor
---

Add native shortcut support to `Button` and `IconButton` components. With this
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
