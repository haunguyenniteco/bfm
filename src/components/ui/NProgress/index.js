import Router from 'next/router'
import nprogress from 'nprogress'
import { useRef, useEffect } from 'react'

// Don't show progress for fast transitions.
const startDelay = 1000
nprogress.configure({ showSpinner: false })

const NProgress = () => {
  const timeoutRef = useRef(null)

  const show = () => {
    // Some weird VSCode bug. Enforce browser setTimeout via window.
    // https://github.com/Microsoft/TypeScript/issues/842#issuecomment-339860768
    timeoutRef.current = window.setTimeout(() => nprogress.start(), startDelay)
  }

  const hide = () => {
    if (timeoutRef.current != null) window.clearTimeout(timeoutRef.current)
    nprogress.done()
  }

  useEffect(() => {
    Router.events.on('routeChangeStart', show)
    Router.events.on('routeChangeComplete', hide)
    Router.events.on('routeChangeError', hide)

    return () => {
      Router.events.off('routeChangeStart', show)
      Router.events.off('routeChangeComplete', hide)
      Router.events.off('routeChangeError', hide)
      hide()
    }
  })

  return null
}

export default NProgress
