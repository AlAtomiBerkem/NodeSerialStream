import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useInactivityRedirect } from '../utils/useInactivityRedirect.js'

function AnimatedLayout() {
  const location = useLocation()
  const outlet = useOutlet()
  const navigate = useNavigate()

  const handleTimeout = useCallback(() => navigate('/'), [navigate])
  useInactivityRedirect(handleTimeout)

  const [renderedOutlet, setRenderedOutlet] = useState(outlet)
  const [displayPath, setDisplayPath] = useState(location.pathname)
  const [present, setPresent] = useState(true)

  const [directionSign, setDirectionSign] = useState(location.pathname === '/' ? -1 : 1)

  useEffect(() => {
    if (location.pathname !== displayPath) {
      setDirectionSign(location.pathname === '/' ? -1 : 1)
      setPresent(false)
    }
  }, [location.pathname, displayPath])

  const slideVariants = {
    initial: (sign) => ({
      x: `${100 * sign}%`,
      opacity: 1,
    }),
    animate: {
      x: '0%',
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (sign) => ({
      x: `${-100 * sign}%`,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <div className="relative h-screen w-screen bg-[url(/syspence.png)] bg-center bg-cover overflow-hidden">
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => {
        setRenderedOutlet(outlet)
        setDisplayPath(location.pathname)
        setPresent(true)
      }}>
        {present && (
        <motion.div
          key={displayPath}
          className="absolute inset-0"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={directionSign}
        >
          {renderedOutlet}
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AnimatedLayout

