# Sagan Candidate FAQ

The public FAQ page for candidates who apply to Sagan roles. It answers the
questions the automated candidate inbox receives most often, so candidates can
be pointed at one link instead of getting a reply.

**Live:** https://faq.saganrecruitment.com

## What this is

A static page. No build step, no framework, no dependencies. Five files do the
whole job:

| File | Purpose |
| --- | --- |
| `index.html` | The page and all of its content |
| `assets/styles.css` | The Sagan design system, applied |
| `assets/faq.js` | Deep links, expand all, print handling. Optional — the page works without it |
| `candidate-faq.txt` | Plain-text copy, linked from the footer |
| `404.html` | Not-found page, styled to match |

Nothing is loaded from a third party. The font is self-hosted, so the page
makes no external requests and sets no cookies — one less privacy question to
answer about a candidate-facing page.

## Editing the content

Answers live directly in `index.html`, one `<details>` block each:

```html
<details id="a-short-slug">
  <summary><span>The question, as a candidate would ask it</span></summary>
  <div class="answer">
    <p>The answer.</p>
  </div>
</details>
```

Two things to keep in step when you change an answer:

1. Update the same answer in `candidate-faq.txt`.
2. Update the date in the footer of `index.html` and at the top of
   `candidate-faq.txt`.

The `id` on each `<details>` is a permanent link. Support can send a candidate
straight to one answer:

```
https://faq.saganrecruitment.com/#attempts-used
```

Opening a question also updates the address bar, so copying the URL shares
whatever is open. Keep the existing ids stable — links already sent out will
break otherwise.

## The design

Built to the Sagan Passport Brand Guidelines (April 2026).

**Colour.** Every value is a CSS custom property at the top of `styles.css`.
Glacier `#093A3E` and Dark Glacier `#062B2B` carry the type, Space neutrals
carry the surfaces, and Dandelion `#F5B800` is the single expressive accent (the
"Please read first" tag). The page holds roughly the 45% white / 35% neutral /
15% secondary / 5% Glacier ratio the guidelines ask for. No black anywhere.

**Type.** Space Grotesk — the secondary brand face, SIL Open Font Licence — is
self-hosted as a 26 KB variable subset covering Latin and Latin Extended at
weights 300–700. It sets the headings and labels; body copy uses the system
grotesque stack.

PP Mori is the primary brand face, but it needs a paid webfont licence for
public-facing use, so it is deliberately not shipped here. To switch once Sagan
holds that licence:

1. Put `PPMori-Regular.woff2` and `PPMori-SemiBold.woff2` in `assets/fonts/`.
2. Uncomment the PP Mori `@font-face` block in `styles.css`.
3. Add `"PP Mori"` to the front of the `--display` and `--body` stacks.

**Logo.** Drawn as inline SVG rather than loaded as an image, so it stays sharp
at any size and needs no extra request. Its proportions are measured from the
official mark: the blue disc sits at 0.664 of the outer radius, the ring at
0.914 with a 10° gap on each side of the north-west / south-east diagonal. The
ring is Glacier rather than the black of the source PNG, because the brand does
not use black.

**Gradient.** The page base is the guidelines' "Subtle Transition",
`#F5F3F0` to `#FFFFFF`, used as a base only — never on an object.

## Accessibility

- Native `<details>`/`<summary>`, so keyboard and screen-reader behaviour is
  the browser's own rather than something reimplemented.
- Body text is 5.0:1 against white; headings and the notice card are well past
  7:1.
- A skip link, visible focus rings, and a `prefers-reduced-motion` block that
  removes the animations.
- Printing opens every answer, so a printed copy is complete.

## Hosting

GitHub Pages, deployed from `main` at the repository root. `CNAME` holds the
custom domain and `.nojekyll` stops Jekyll from touching the files.

The DNS record the domain needs:

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `faq` | `saganorg.github.io` |

Pushing to `main` publishes. There is nothing to build.

## Local preview

```bash
py -3 -m http.server 5179
```

Then open http://localhost:5179. Opening `index.html` straight off the disk
also works, apart from the font, which needs to be served over HTTP.
