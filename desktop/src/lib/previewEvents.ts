import { listen } from '@tauri-apps/api/event'
import { useBrowserPanelStore } from '../stores/browserPanelStore'

export async function subscribePreviewEvents(sessionId: string): Promise<() => void> {
  return listen<string>('preview://event', (e) => {
    let msg: { type?: string; url?: string; title?: string }
    try { msg = JSON.parse(e.payload) } catch { return }
    const store = useBrowserPanelStore.getState()
    if (msg.type === 'navigated' && msg.url) store.setNavigated(sessionId, msg.url, msg.title ?? '')
    else if (msg.type === 'ready') store.setReady(sessionId)
    // selection / screenshot 在 M4/M5 接入
  })
}
