import { useState } from 'react'
import { motion } from 'framer-motion'

const C = {
  bg: '#0A0A0F',
  panel: '#12121A',
  border: '#2A2A3A',
  gold: '#C8922A',
  goldLight: '#E8B84B',
  red: '#C0392B',
  redDark: '#8B1A1A',
  blue: '#2980B9',
  blueDark: '#1A2A4A',
  text: '#F0E6D3',
  muted: '#7A6F5E',
}

export default function LandingPage({ onStart }) {
  const [personA, setPersonA] = useState('')
  const [personB, setPersonB] = useState('')
  const [rounds, setRounds] = useState(2)
  const canStart = personA.trim() && personB.trim()

  return (
    <div style={{
      minHeight: '100vh', background: C.bg,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', position: 'relative', overflow: 'hidden'
    }}>
      {/* Background watermark */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', opacity: 0.03, fontSize: '40vw', fontFamily: 'Cinzel, serif', fontWeight: 900,
        color: C.gold, userSelect: 'none', lineHeight: 1
      }}>⚖</div>

      {/* Top badge */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ height: '1px', width: '60px', background: `linear-gradient(to right, transparent, ${C.gold})` }} />
        <span style={{ color: C.gold, fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.3em' }}>EST. VOUGHT INTERNATIONAL</span>
        <div style={{ height: '1px', width: '60px', background: `linear-gradient(to left, transparent, ${C.gold})` }} />
      </motion.div>

      {/* Main title */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.7 }}
        style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
        <h1 style={{
          fontFamily: 'Cinzel, serif', fontWeight: 900,
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          color: C.goldLight,
          textShadow: `0 0 40px ${C.gold}88, 0 0 80px ${C.gold}33`,
          letterSpacing: '0.15em', lineHeight: 1.1
        }}>HOMELANDER<br />COURT</h1>
        <p style={{ color: C.muted, fontFamily: 'Crimson Pro, Georgia, serif', fontSize: '1rem', marginTop: '0.6rem', fontStyle: 'italic', letterSpacing: '0.05em' }}>
          "I can do whatever the f*ck I want."
        </p>
      </motion.div>

      {/* Divider */}
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
        style={{ width: '400px', maxWidth: '90vw', height: '1px', background: `linear-gradient(to right, transparent, ${C.gold}, transparent)`, margin: '1.5rem 0' }} />

      {/* Case entry */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        style={{ display: 'flex', gap: '1.5rem', alignItems: 'stretch', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.5rem' }}>

        {/* Prosecution */}
        <div style={{ background: C.panel, border: `1px solid ${C.redDark}`, borderTop: `3px solid ${C.red}`, borderRadius: '6px', padding: '1.2rem 1.5rem', width: '200px' }}>
          <div style={{ color: C.red, fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.25em', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            🔨 PROSECUTION
          </div>
          <input value={personA} onChange={e => setPersonA(e.target.value)} onKeyDown={e => e.key === 'Enter' && canStart && onStart({ personA: personA.trim(), personB: personB.trim(), rounds })}
            placeholder="Plaintiff name"
            style={{ width: '100%', background: '#1A0A0A', border: `1px solid ${C.redDark}`, color: C.text, padding: '0.6rem 0.8rem', borderRadius: '4px', outline: 'none', fontSize: '0.95rem' }} />
        </div>

        {/* VS */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
          <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ fontFamily: 'Cinzel, serif', fontWeight: 900, fontSize: '1.8rem', color: C.goldLight, textShadow: `0 0 20px ${C.gold}` }}>VS</motion.div>
          <div style={{ color: C.muted, fontSize: '0.65rem', letterSpacing: '0.2em' }}>ROUNDS</div>
          <select value={rounds} onChange={e => setRounds(Number(e.target.value))}
            style={{ background: C.panel, border: `1px solid ${C.border}`, color: C.goldLight, padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem', textAlign: 'center' }}>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>

        {/* Defense */}
        <div style={{ background: C.panel, border: `1px solid ${C.blueDark}`, borderTop: `3px solid ${C.blue}`, borderRadius: '6px', padding: '1.2rem 1.5rem', width: '200px' }}>
          <div style={{ color: C.blue, fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.25em', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            🛡 DEFENSE
          </div>
          <input value={personB} onChange={e => setPersonB(e.target.value)} onKeyDown={e => e.key === 'Enter' && canStart && onStart({ personA: personA.trim(), personB: personB.trim(), rounds })}
            placeholder="Defendant name"
            style={{ width: '100%', background: '#0A0A1A', border: `1px solid ${C.blueDark}`, color: C.text, padding: '0.6rem 0.8rem', borderRadius: '4px', outline: 'none', fontSize: '0.95rem' }} />
        </div>
      </motion.div>

      {/* Judge badge */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '0.8rem 2rem', marginBottom: '1.8rem', textAlign: 'center' }}>
        <div style={{ color: C.gold, fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.3em', marginBottom: '0.3rem' }}>PRESIDING JUDGE</div>
        <div style={{ color: C.goldLight, fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.1em' }}>HOMELANDER</div>
        <div style={{ color: C.muted, fontSize: '0.75rem', marginTop: '0.2rem', fontFamily: 'Crimson Pro, serif', fontStyle: 'italic' }}>Supreme Court of Vought International</div>
      </motion.div>

      {/* Start button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        whileHover={canStart ? { scale: 1.04, boxShadow: `0 0 30px ${C.gold}66` } : {}}
        whileTap={canStart ? { scale: 0.97 } : {}}
        onClick={() => canStart && onStart({ personA: personA.trim(), personB: personB.trim(), rounds })}
        style={{
          background: canStart ? `linear-gradient(135deg, ${C.gold}, ${C.goldLight})` : C.panel,
          color: canStart ? '#0A0A0F' : C.muted,
          border: `1px solid ${canStart ? C.goldLight : C.border}`,
          padding: '0.9rem 3rem', fontSize: '1rem', fontWeight: 700,
          fontFamily: 'Cinzel, serif', letterSpacing: '0.15em',
          borderRadius: '4px', cursor: canStart ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s'
        }}>
        COMMENCE TRIAL
      </motion.button>
    </div>
  )
}
