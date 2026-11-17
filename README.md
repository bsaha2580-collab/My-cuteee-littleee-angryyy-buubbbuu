# Operation MANAAO ❤️

A mobile-first, static relationship-courtroom mini-site. It uses plain HTML, CSS and JavaScript; no backend, build step, or installation is required.

## Project structure

```text
operation-manaao/
├── index.html     # Screens, copy, and page structure
├── style.css      # Responsive styling and cartoon animations
├── script.js      # Navigation, slap interaction, selections, local storage
└── README.md      # This guide
```

## Run locally

1. Extract the ZIP.
2. Open `index.html` in a browser.
3. For a local development server (optional), open a terminal in this folder and run:
   - Windows: `py -m http.server 8000`
   - macOS/Linux: `python3 -m http.server 8000`
4. Visit `http://localhost:8000`.

The site is static and works on Android Chrome. It does not need a server once loaded. Google Fonts are optional; the browser will fall back to system fonts if offline.

## Publish online with GitHub Pages

1. Sign in to GitHub and create a new **public** repository named `operation-manaao`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select branch `main`, folder `/ (root)`, then **Save**.
6. Wait for GitHub Pages to publish. The URL will look like `https://YOUR-USERNAME.github.io/operation-manaao/`.
7. Open that URL on an Android phone to test, then share it.

## Personalise before publishing

- In `index.html`, update the date in the apology letter and edit the message so it accurately reflects what happened.
- Change the names in the case card if desired.
- The JavaScript saves only the selected feeling, punishment, and verdict in that browser's local storage. It does not send her choices to you or track her activity.
- The virtual slap is a cartoon animation only. No real sound is played and no actual message is sent.\n- Selecting a final verdict opens a playful 10-kiss request modal; she can tap to count kisses or choose to save them for later.

## Privacy and limitations

- No analytics, trackers, forms, or external APIs are included.
- Her selections stay on her device. If you want to see her verdict, add an explicit share/copy feature later rather than collecting it silently.
- The Google Fonts connection is cosmetic. The page still works if it is unavailable.
