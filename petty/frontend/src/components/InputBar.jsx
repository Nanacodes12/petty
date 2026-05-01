import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const C = {
  panel: '#12121A', border: '#2A2A3A', gold: '#C8922A', goldLight: '#E8B84B',
  red: '#C0392B', blue: '#2980B9', text: '#F0E6D3', muted: '#7A6F5E'
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

export default function InputBar({ onSubmit, currentSpeaker, personA, personB, disabled }) {
  const [text, setText] = useState('')
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)

  const speakerName = currentSpeaker === 'a' ? personA : personB
  const speakerColor = currentSpeaker === 'a' ? C.red : C.blue
  const canSubmit = !disabled && text.trim()

  useEffect(() => () => recognitionRef.current?.stop(), [])
  useEffect(() => { if (disabled && listening) stopListening() }, [disabled])

  const startListening = () => {
    if (!SpeechRecognition || disabled) return
    const rec = new SpeechRecognition()
    rec.continuous = false
    rec.interimResults = true
    rec.lang = 'en-US'
    recognitionRef.current = rec
    rec.onstart = () => setListening(true)
    rec.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('')
      setText(transcript)
      if (e.results[e.results.length - 1].isFinal) {
        rec.stop()
        if (transcript.trim()) { onSubmit(transcript.trim()); setText('') }
      }
    }
    rec.onerror = () => setListening(false)
    rec.onend = () => setListening(false)
    rec.start()
  }

  const stopListening = () => { recognitionRef.current?.stop(); setListening(false) }

  const handleSubmit = () => {
    if (!canSubmit) return
    onSubmit(text.trim())
    setText('')
  }

  return (
    <div style={{ padding: '0.75rem 1rem', borderTop: `1px solid ${C.border}`, background: '#0A0A0F' }}>
      <div style={{ color: disabled ? C.muted : speakerColor, fontSize: '0.65rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.2em', marginBottom: '0.4rem' }}>
        {disabled ? '⚖ AWAITING VERDICT' : `${speakerName.toUpperCase()} — PRESENT YOUR CASE`}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {SpeechRecognition && (
          <motion.button
            animate={listening ? { boxShadow: [`0 0 6px ${C.red}66`, `0 0 18px ${C.red}`, `0 0 6px ${C.red}66`] } : {}}
            transition={{ duration: 0.8, repeat: listening ? Infinity : 0 }}
            whileHover={!disabled ? { scale: 1.08 } : {}}
            onClick={listening ? stopListening : startListening}
            disabled={disabled}
            style={{
              background: listening ? C.red : C.panel,
              border: `1px solid ${listening ? C.red : C.border}`,
              color: listening ? '#fff' : C.muted,
              width: '40px', height: '40px', borderRadius: '50%', fontSize: '1rem',
              cursor: disabled ? 'not-allowed' : 'pointer',
              flexShrink: 0, opacity: disabled ? 0.3 : 1
            }}>
            {listening ? '⏹' : '🎤'}
          </motion.button>
        )}

        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder={listening ? 'Listening...' : disabled ? '' : 'Describe your case...'}
          disabled={disabled}
          style={{
            flex: 1, background: C.panel,
            border: `1px solid ${listening ? C.red + '88' : disabled ? C.border : speakerColor + '55'}`,
            color: C.text, padding: '0.65rem 1rem', borderRadius: '4px', outline: 'none',
            fontSize: '0.95rem', fontFamily: 'Crimson Pro, Georgia, serif',
            opacity: disabled ? 0.4 : 1, transition: 'border-color 0.2s'
          }} />

        <motion.button
          whileHover={canSubmit ? { scale: 1.05, boxShadow: `0 0 16px ${C.red}88` } : {}}
          whileTap={canSubmit ? { scale: 0.96 } : {}}
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            background: canSubmit ? `linear-gradient(135deg, ${C.gold}, ${C.goldLight})` : C.panel,
            color: canSubmit ? '#0A0A0F' : C.muted,
            border: `1px solid ${canSubmit ? C.goldLight : C.border}`,
            padding: '0.65rem 1.2rem', fontFamily: 'Cinzel, serif',
            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em',
            borderRadius: '4px', cursor: canSubmit ? 'pointer' : 'not-allowed',
            transition: 'all 0.15s', whiteSpace: 'nowrap'
          }}>
          SUBMIT →
        </motion.button>
      </div>

      <AnimatePresence>
        {listening && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ color: C.red, fontSize: '0.65rem', marginTop: '0.3rem', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>
            ● Recording — stops when you pause speaking
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
