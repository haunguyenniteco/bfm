const BackArrow = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 32 32" focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M1 17c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4L13.7 1.7c.4-.4 1-.4 1.4 0s.4 1 0 1.4L1.7 16.7c-.2.2-.4.3-.7.3z"
      />
      <path
        fill="currentColor"
        d="M14.6 30.6c-.3 0-.5-.1-.7-.3L.3 16.7c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l13.6 13.6c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3z"
      />
      <path fill="currentColor" d="M31 17H1.7c-.5 0-1-.4-1-1s.4-1 1-1H31c.5 0 1 .4 1 1s-.4 1-1 1z" />
    </svg>
  )
}

export default BackArrow
