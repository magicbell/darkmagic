---
'@darkmagic/react': minor
---

Add support for non modal drawers. When providing `modal={fals}` to a drawer,
it will not render an overlay, interaction with the page below is still possible,
and interaction with the page below will not result in closing the drawer.
