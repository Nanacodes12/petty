let currentAudio = null
let currentInterval = null

function cleanup() {
  if (currentInterval) { clearInterval(currentInterval); currentInterval = null }
  if (currentAudio) { currentAudio.pause(); currentAudio = null }
}

export function stopAudio() {
  cleanup()
}

export async function playBase64Audio(base64) {
  cleanup()
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
  const blob = new Blob([bytes], { type: 'audio/mpeg' })
  const url = URL.createObjectURL(blob)
  const audio = new Audio(url)
  currentAudio = audio
  await new Promise(resolve => {
    audio.onended = resolve
    audio.onerror = resolve
    audio.play().catch(resolve)
  })
  URL.revokeObjectURL(url)
  currentAudio = null
}

export async function playWithSubtitles(base64, onProgress) {
  cleanup()
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
  const blob = new Blob([bytes], { type: 'audio/mpeg' })
  const url = URL.createObjectURL(blob)
  const audio = new Audio(url)
  currentAudio = audio

  await new Promise(resolve => {
    audio.addEventListener('canplay', () => {
      audio.play().catch(resolve)

      currentInterval = setInterval(() => {
        if (!audio.duration) return
        const fraction = Math.min(audio.currentTime / audio.duration, 1)
        onProgress(fraction)
        if (fraction >= 1) { clearInterval(currentInterval); currentInterval = null }
      }, 50)
    }, { once: true })

    audio.addEventListener('ended', () => {
      if (currentInterval) { clearInterval(currentInterval); currentInterval = null }
      onProgress(1)
      resolve()
    }, { once: true })

    audio.addEventListener('error', resolve, { once: true })
  })

  URL.revokeObjectURL(url)
  currentAudio = null
}
