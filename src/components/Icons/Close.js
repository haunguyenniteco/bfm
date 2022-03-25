const Cross = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 32 32" focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M17.4 16L28 5.4c.4-.4.4-1 0-1.4s-1-.4-1.4 0L16 14.6 5.4 4c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L14.6 16 4 26.6c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3L16 17.4 26.6 28c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L17.4 16z"
      />
    </svg>
  )
}

export default Cross
