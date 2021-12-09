import { inject, ref } from 'vue'
import type { InjectionKey, Plugin } from 'vue'

export interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed'
        platform: string
    }>
    prompt(): Promise<void>
}

export type PwaInstallPrompt = ReturnType<typeof pwaInstallPrompt>

export const pwaInstallPrompt = () => {
    const installPromptEventRef = ref<BeforeInstallPromptEvent>()

    const actions = {
        showPrompt: () => {
            if (installPromptEventRef.value) {
                installPromptEventRef.value.prompt()

                return installPromptEventRef.value.userChoice
                    .then((choice) => {
                        return Promise.resolve(choice.outcome)
                    })
                    .finally(() => {
                        installPromptEventRef.value = undefined
                    })
            }

            return Promise.resolve(undefined)
        },
        setInstallPromptEvent: (event: BeforeInstallPromptEvent) => {
            installPromptEventRef.value = event
        }
    } as const

    return {
        get installPromptEvent(): Readonly<typeof installPromptEventRef.value> {
            return installPromptEventRef.value
        },
        actions
    }
}

const PwaInstallPromptKey: InjectionKey<PwaInstallPrompt> = Symbol('PwaInstallPrompt')

export const usePwaInstallPrompt = () => {
    const injected = inject(PwaInstallPromptKey)

    if (!injected) {
        throw new Error(`${PwaInstallPromptKey} is not provided`)
    }

    return injected
}

export const pluginPwaInstallPrompt: Plugin = {
    install: (app) => {
        app.provide(PwaInstallPromptKey, pwaInstallPrompt())
    }
}
