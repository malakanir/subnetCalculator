# IPv4 Subnet Calculator

Static page written in HTML and TypeScript, with minimal CSS. No runtime dependencies. TypeScript is only needed to compile `src/` into `dist/`.

## Usage

Fill in two fields:

- **IP Address**, for example `192.168.10.37`
- **Subnet Mask or CIDR**, which accepts any of these:
  - a dotted mask: `255.255.255.192`
  - a prefix: `/26` or `26`

A **CIDR prefix** slider (/0 to /32) stays in sync with the mask field. Moving the slider rewrites the mask field, and typing a valid mask moves the slider. Results update as you type or move the slider. An invalid value shows an error in place of the results.

Results include network, broadcast, mask (dotted, prefix, binary), wildcard, first and last usable host, host counts, class, and RFC 1918 status. `/31` and `/32` follow RFC 3021.

## Project layout

```
index.html        page shell (two fields and the CIDR slider)
style.css         minimal styles
src/core/         pure logic, no DOM (ip, subnet, input, format, types)
src/ui/           DOM access only (form, render)
src/main.ts       wires the fields and slider to core and render
dist/             compiled JavaScript, committed so GitHub Pages can serve it
```

`src/core` does not touch the DOM, so it can be reused or tested in Node later.

## Build

```bash
npm install
npm run build
```

Run `npm run build` after every change to `src/` and commit `dist/` with it.

## Run locally

Module scripts do not load from `file://`, so serve the folder:

```bash
npx serve .
```

## Deploy to GitHub Pages

1. Push this folder as its own repository. The repository root is this `subnetCalculator/` folder.
2. In the repository settings, open **Pages**, choose **Deploy from a branch**, select the branch, and choose the root folder (`/`).
3. The site is served at `https://<user>.github.io/<repo>/`. All paths are relative, so it works under the repo subpath.
