const styles = {
  svg: {
    enableBackground: 'new 0 0 512 512',
    fill: '#999999',
    cursor: 'pointer',
  },
}

const Caret = ({ ...props }) => {
  return (
    <svg width="12px" height="12px" style={styles.svg} viewBox="0 0 512 512" {...props}>
      <polygon
        style={styles.polygon}
        points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256"
      />
    </svg>
  )
}

export default Caret
