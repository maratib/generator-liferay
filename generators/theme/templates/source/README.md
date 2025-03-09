# Liferay theme
## <%= name %>

## Initial setup
```bash
npm install
npm run deploy
# copy build/template to src/template
npm run watch
# start developing your theme
```

## Liferay theme configuration
liferay-theme.json
```json
{
  "LiferayTheme": {
    "appServerPath": "/app/server/path",
    "deployPath": "/app/server/deploy",
    "deploymentStrategy": "LocalAppServer",
    "url": "http://localhost:8080"
  }
}
```


