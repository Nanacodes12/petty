import { motion } from 'framer-motion'

const C = { gold: '#C8922A', goldLight: '#E8B84B', panel: '#12121A', border: '#2A2A3A', red: '#C0392B' }

export default function Judge({ isSpeaking }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', userSelect: 'none' }}>
      {/* JUDGE MODE badge */}
      <div style={{
        background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
        color: '#0A0A0F', fontFamily: 'Cinzel, serif', fontWeight: 700,
        fontSize: '0.6rem', letterSpacing: '0.2em', padding: '0.2rem 0.8rem', borderRadius: '20px'
      }}>JUDGE MODE ★ SUPREME</div>

      {/* Portrait */}
      <motion.div
        animate={isSpeaking ? {
          boxShadow: [`0 0 20px ${C.gold}44`, `0 0 60px ${C.gold}99`, `0 0 20px ${C.gold}44`]
        } : { boxShadow: `0 0 15px ${C.gold}22` }}
        transition={{ duration: 1, repeat: isSpeaking ? Infinity : 0 }}
        style={{
          width: '110px', height: '110px', borderRadius: '50%',
          border: `3px solid ${C.gold}`,
          overflow: 'hidden', position: 'relative'
        }}>
        <img
          src="/hm.png"
          alt="Homelander"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
        />
      </motion.div>

      <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: '0.7rem', color: C.goldLight, letterSpacing: '0.2em' }}>
        HOMELANDER
      </div>

      {isSpeaking && (
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity }}
          style={{ color: C.red, fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif' }}>
          ● SPEAKING
        </motion.div>
      )}
    </div>
  )
}
