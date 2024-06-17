import React from "react";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

export const getScreenSizeHook = () => {
  const [windowSize, setWindowSize] = useState({height: window.innerHeight, width: window.innerWidth})

  function setUpdateWindowSize() {
    setWindowSize({height: window.innerHeight, width: window.innerWidth})
  }

  useEffect(() => {
    window.addEventListener('resize', setUpdateWindowSize)

    return () => window.removeEventListener('resize', setUpdateWindowSize)
  }, [])

  return { windowSize }
}

