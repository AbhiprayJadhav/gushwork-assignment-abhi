# Gushwork Assignment

Small static front-end assignment built with plain HTML, CSS, and JavaScript.

## What is implemented

- Sticky header that appears after the first fold
- Primary nav that shifts down when sticky header is visible
- Image gallery with:
  - Previous / next controls
  - Thumbnail navigation
  - Hover lens + zoom preview panel (desktop)
- Responsive layout with simple breakpoints
- Contact section with clickable email link (`mailto:`)

## Project structure

- `index.html` - page structure and content
- `styles.css` - layout, typography, and component styles
- `script.js` - sticky-header and gallery interactions
- `assets/images/` - logo + gallery images

## Run locally

No build step is needed.

1. Open `index.html` directly in a browser, or
2. Run with any simple static server (recommended).

Example (VS Code Live Server):
- Right click `index.html` -> **Open with Live Server**

## Behavior notes

### Sticky header
- Hidden on initial load
- Becomes visible when scrolling beyond ~85% of viewport height
- Hides again when scrolling back up

### Gallery zoom
- Zoom preview is enabled only on devices that support hover + fine pointer
- On touch/smaller layouts, preview panel is hidden and gallery still works

## Customization

- Change gallery images in `script.js` (`imgs` array)
- Update contact details in `index.html` (`#contact` section)
- Adjust spacing and colors in `styles.css` root variables

## Known placeholders

- Phone number in contact section is placeholder text
- Replace with real business contact details before final submission