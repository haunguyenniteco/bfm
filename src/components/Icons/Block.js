const Block = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" {...props}>
      <defs>
        <path
          d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM2 10c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L3.69 14.9A7.902 7.902 0 0 1 2 10zm8 8c-1.85 0-3.55-.63-4.9-1.69L16.31 5.1A7.902 7.902 0 0 1 18 10c0 4.42-3.58 8-8 8z"
          id="block_svg__a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="block_svg__b" fill="#fff">
          <use xlinkHref="#block_svg__a" />
        </mask>
        <use fill="#000" xlinkHref="#block_svg__a" />
        <g mask="url(#block_svg__b)">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default Block
