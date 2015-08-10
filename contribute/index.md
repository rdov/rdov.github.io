---
layout: default
title: Advanced contributions
permalink: /contribute/
weight: 1
---

## {{ page.title }}

It's necessary to have a local copy of Deglet in order to check if
changes don't break the existing code. Even if you intend to contribute with
existing translations, it's a good idea to have a local copy because you'll
be able to check how the new text looks like.

To get a local copy running, first run

    git clone git@bitbucket.org:deginner/deglet.git

(TODO: make this a public repository) and follow the instructions present
in the README file. Then edit `app/src/constant/ServerConstants.js` to use
`deglet.xyz` as the hostname for every entry so you don't need to run a server
component yourself.

> Do not change the port numbers in `ServerConstants.js`, and
remember to run ``make`` again after saving the modifications.

If you're doing many modifications, small or not, it's recommended to run
`npm start` as it will watch for modifications and rebuild Deglet as
necessary. When using `npm start` it's necessary to modify
`public/html/index.html` to load `app.js` instead of `app.min.js`
(i.e. `var main = "../js/app.js";`).

Remember to submit your modifications as a pull request at
<https://bitbucket.org/deginner/deglet/pull-requests/>.


### Contributing to

#### New translations

If you're modifying templates to include new text, follow the next guidelines
to get your modifications into Deglet:

1. Use a meaningful key name for your new text, e.g. `"convert.title"` is
   used to describe the title in the Convert page.
2. Don't change existing keys without properly adjusting any templates that
   use it. In general it's recommended to not change existing keys.
3. Make sure all locales contain any new keys created. Not doing this will
   break pages that look up a key but the active locale doesn't contain it.

If you're adding support for a new locale, it's necessary create a new
folder at `app/locale/<langcode>`, copy `app/locale/en/app.json` to it
and then edit `app/locale/messages.js` to:

1. Load the new JSON file.
2. Add a new entry in the `i18n` object (use the existing code as a base
   on how to do that).
3. Update the `order` list to include the new locale.


#### CSS

[Sass](http://sass-lang.com/) is used very lightly to produce the resulting
CSS files. If you're contributing to modifications here, stick to the SCSS
syntax and avoid as much as possible styling directly in the JSX files.

If `npm start` is running you can check your modifications (almost) right
after saving a stylesheet file.

Accepting CSS contributions is a bit more complicated since it's necessary
to check how it renders in various browsers and devices. Basically, if your
change is about reducing existing issues in some browser then it's faster
to accept it. If the change is introducing newer and fancy styling then it
might take longer.


#### Templates

The React components used here have their
[JSX](https://facebook.github.io/react/docs/jsx-in-depth.html)
contents placed in a different file. For instance, the component for
the index page lives at `app/src/component/section/Welcome.react.js` while
the JSX that is rendered lives at `app/templates/section/Welcome.jsx`.
If you're new to JSX, also read the
[JSX Gotchas](https://facebook.github.io/react/docs/jsx-gotchas.html).

Basically the templates are composed by HTML and JS code, so you can
modify the layout entirely without needing to get into the component's
source code or other areas.


#### Components, Actions, Stores

If you want to contribute to other aspects, including behavior of existing
components, actions, or stores, then it might be helpful to check the following
set of diagrams to get a grasp about the relationships present:
<a href="/deglet_react/All.html" target="_blank">/deglect_react/All.html</a>.

If you prefer something very hands-on, check the [tutorial for
creating a brand new page]({{ "/tutorial/newpage.html" | prepend: site.baseurl }}).
