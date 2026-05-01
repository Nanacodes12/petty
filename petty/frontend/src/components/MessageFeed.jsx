import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const C = {
  redDark: '#8B1A1A', red: '#C0392B',
  blueDark: '#1A2A4A', blue: '#2980B9',
  gold: '#C8922A', goldLight: '#E8B84B',
  panel: '#12121A', text: '#F0E6D3', muted: '#7A6F5E', border: '#2A2A3A'
}

function timestamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function MessageFeed({ messages, personA, personB, side }) {
  const bottomRef = useRef(null)
  const isA = side === 'a'
  const accentColor = isA ? C.red : C.blue
  const bgColor = isA ? C.redDark : C.blueDark
  const avatar = isA ? '🔨' : '🛡'
  const label = isA ? personA : personB
  const judgeLabel = 'HOMELANDER'

  const filtered = messages.filter(m => m.role === side)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div style={{
      flex: 1, overflowY: 'auto', padding: '0.75rem',
      display: 'flex', flexDirection: 'column', gap: '0.6rem'
    }}>
      <AnimatePresence>
        {filtered.map((msg, i) => {
          const isJudge = msg.role === 'judge'
          return (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>

              {/* Sender label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', paddingLeft: '0.2rem' }}>
                <span style={{ fontSize: '0.75rem' }}>{isJudge ? '⚖' : avatar}</span>
                <span style={{
                  fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.15em',
                  color: isJudge ? C.goldLight : accentColor, fontWeight: 700
                }}>{isJudge ? judgeLabel : label.toUpperCase()}</span>
                <span style={{ color: C.muted, fontSize: '0.55rem', marginLeft: 'auto' }}>{timestamp()}</span>
              </div>

              {/* Message bubble */}
              <div style={{
                background: isJudge
                  ? `linear-gradient(135deg, #1A140A, #12100A)`
                  : `${bgColor}88`,
                border: `1px solid ${isJudge ? C.gold + '44' : accentColor + '44'}`,
                borderLeft: `3px solid ${isJudge ? C.gold : accentColor}`,
                borderRadius: '0 6px 6px 6px',
                padding: '0.65rem 0.85rem',
              }}>
                <p style={{
                  fontFamily: 'Crimson Pro, Georgia, serif',
                  fontSize: '0.9rem', lineHeight: 1.65,
                  color: isJudge ? C.goldLight : C.text
                }}>
                  {msg.content}
                  {msg.live && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      style={{ color: C.gold, marginLeft: '2px' }}>|</motion.span>
                  )}
                </p>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>
  )
}
