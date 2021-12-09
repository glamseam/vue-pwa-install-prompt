# vue-pwa-install-prompt

PWA Install Prompt For Vue3. (Not supported Vue2)

# Install

```sh
npm i @d-gs/vue-pwa-install-prompt
```

# Usage

In `index.html`

```html
  <head>
    ...
    <link rel="manifest" href="/manifest.webmanifest" />
  </head>
```

In `app.ts`

```ts
import { pluginPwaInstallPrompt } from '@d-gs/vue-pwa-install-prompt'
app.use(pluginPwaInstallPrompt)
```

In `App.vue`

```vue
<script lang="ts" setup>
import { usePwaInstallPrompt } from '@d-gs/vue-pwa-install-prompt'
import type { BeforeInstallPromptEvent } from '@d-gs/vue-pwa-install-prompt'

const pwaInstallPrompt = usePwaInstallPrompt()

// Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((reg) => {
      reg.onupdatefound = () => {
        reg.update()
      }
    })

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    pwaInstallPrompt.actions.setInstallPromptEvent(event as BeforeInstallPromptEvent)
  })
}
</script>
```

In `Comp.vue`

```vue
<script lang="ts" setup>
import { usePwaInstallPrompt } from '@d-gs/vue-pwa-install-prompt'

const showPrompt = async () => {
  const outcome = await pwaInstallPrompt.actions.showPrompt()
  // outcome: 'accepted' | 'dismissed' | undefined

  if (outcome === 'accepted') {
    // Do something
    return
  }

  if (outcome === 'dismissed') {
    // Do something
    return
  }
}
</script>
```
