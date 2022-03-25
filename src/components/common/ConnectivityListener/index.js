import { Component } from 'react'
import { toast } from 'react-toastify'

class ConnectivityListener extends Component {
  offlineToastId = null

  constructor(props) {
    super(props)
    this.state = { isOnline: window ? window.navigator.onLine : false }
  }

  componentDidMount() {
    window.addEventListener('online', this.onLine, false)
    window.addEventListener('offline', this.offLine, false)
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { isOnline } = this.state

    if (prevState.isOnline !== isOnline) {
      return { isOnline }
    }

    return null
  }

  componentDidUpdate(props, state, snapshot) {
    if (!snapshot) return

    const { isOnline } = snapshot

    // prepare the content
    const content = (
      <div>
        <strong>{isOnline ? 'Online' : 'Offline'}</strong>
        <div>{isOnline ? 'Editing is available again' : 'Changes you make may not be saved'}</div>
      </div>
    )

    // remove the existing offline notification if it exists, otherwise store
    // the added toast id for use later
    const callback = isOnline ? this.onlineCallback : this.offlineCallback

    // add the applicable toast
    toast.info(content, callback)
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.onLine)
    window.removeEventListener('offline', this.offLine)
  }

  onLine = () => {
    this.setState({ isOnline: true })
  }

  offLine = () => {
    this.setState({ isOnline: false })
  }

  onlineCallback = () => {
    if (this.offlineToastId !== null) {
      toast.warn(this.offlineToastId)
      this.offlineToastId = null
    }
  }

  offlineCallback = id => {
    this.offlineToastId = id
  }

  render() {
    return null
  }
}

export default ConnectivityListener
