import { motion, useScroll, useSpring } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import ScrollStory from './sections/ScrollStory'
import AISection from './sections/AISection'
import LiveDashboard from './sections/LiveDashboard'
import ProductScenes from './sections/ProductScenes'
import Timeline from './sections/Timeline'
import WhyMesh from './sections/WhyMesh'
import Trust from './sections/Trust'
import FinalCTA from './sections/FinalCTA'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <>
      <a
        href="#story"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-cyan focus:px-4 focus:py-2 focus:text-[#04262e]"
      >
        Skip to content
      </a>
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-electric to-cyan"
        style={{ scaleX }}
        aria-hidden="true"
      />
      <Nav />
      <main>
        <Hero />
        <ScrollStory />
        <AISection />
        <LiveDashboard />
        <ProductScenes />
        <Timeline />
        <WhyMesh />
        <Trust />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
