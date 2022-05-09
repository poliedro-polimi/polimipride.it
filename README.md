# PoliMi Pride

Website for [PoliMi Pride](https://polimipride.it) (development phase).

## Structure

### Page structure

Every page has a top navigation bar and a bottom bar with credits and contacts, which have to be inserted in each new page manually (they can be copied from the `/index.html` file).

The content for each page is to be put inside the `#content-container` `<div>`

### File structure

All pages share a stylesheet and a script file (`/styles/common.js` and `/scripts/common.js` respectively) which are needed to style the common parts and make the navigation work.

Every page (except for the main page `/index.html`) is put as an `index.html` file in an empty folder, and may have one stylesheet and one script file linked, which has the same name as the folder and is put in the correct folder (e.g. the `/storia/` URL points to `/storia/index.html` and can use `/styles/storia.css` and `/scripts/storia.js`)

## Mobile friendliness

These are the media query configurations that must be implemented by every page:

#### X-Small screens (< 480px)

Small phones

`@media screen and (max-width: 480px) { [...] }`

#### Small screens (480px ~ 720px)

Portrait tablets, large phones

`@media screen and (max-width: 720px) { [...] }`

#### Medium screens (720px ~ 1000px)

Landscape tablets and landscape big phones

`@media screen and (max-width: 1000px) { [...] }`


#### Large screens (1000px ~ 1200px)

Large tablets, laptops and desktops 

This range doesn't have a media query, the default css is built at this size

#### X-Large screens (> 1200px)

Large laptops and desktops

`@media screen and (min-width: 1200px) { [...] }`

### Optional configurations

The following configurations are not required but useful in many occasions:

#### Wide screens (more horizontally squished than 4/3 landscape)

`@media screen and (min-aspect-ratio: 4/3) { [...] }`

#### Square-ish screen (between 4/3 landscape and square portrait)

This range doesn't have a media query, the default css is built at this aspect ratio

#### Tall screens (all portrait screens)

`@media screen and (max-aspect-ratio: 1) { [...] }`