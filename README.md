<img src="https://jordyarntz.com/cdn/kyubio.png" alt="logo" width="120" />

# Kyubio PWA
PWA for the Kyubio Smart fidget toy.

## Getting started
1. `git clone https://github.com/Kyubio/app.git`
2. Installeer de [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) extension voor Visual Studio Code.
3. Klik op "Watch Sass"
4. Open `index.html` in de browser

<hr />

# Folder structuur
## assets
De `assets` map bevat het manifest inclusief alle iconen en fonts van de app.

## css
In deze map staan alle stylesheets. De Scss files worden automatisch omgezet naar normale CSS en geplaatst in de `compiled` map. Alleen deze map wordt deployed omdat browsers geen Scss kunnen lezen. `style.scss` bevat alle styling die door elke view gebruikt kan worden.

## img
Hierin staan alle afbeeldingen die in de app gebruikt worden.

## js
In de `js` map staan alle JavaScript files die de website nodig heeft.

<hr />

# Deployment
Wanneer een Pull request naar de `dev` branch gemerged wordt zal de PWA automatisch deployed worden en te bekijken zijn via <br />
https://kyubio.i441891.hera.fhict.nl
