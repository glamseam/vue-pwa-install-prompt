# vue-pwa-install-prompt

PWA Install Prompt For Vue3. (Not supported Vue2)

# Install

```sh
npm i @d-gs/vue-pwa-install-prompt
```

# Usage

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
  const res = await pwaInstallPrompt.actions.showPrompt()  // res: 'accepted' | 'dismissed' | undefined

  if (res === 'accepted') {
    // Do something
    return
  }

  if (res === 'dismissed') {
    // Do something
    return
  }
}
</script>
```
