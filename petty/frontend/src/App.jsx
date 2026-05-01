import { useState } from 'react'
import LandingPage from './components/LandingPage'
import Courtroom from './components/Courtroom'

export default function App() {
  const [gameState, setGameState] = useState(null)

  if (!gameState) return <LandingPage onStart={setGameState} />
  return <Courtroom {...gameState} onReset={() => setGameState(null)} />
}
