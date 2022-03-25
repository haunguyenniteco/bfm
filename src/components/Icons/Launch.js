const Launch = ({ ...props }) => {
  return (
    <svg width="1.7em" height="1.7em" viewBox="0 0 20 20" focusable="false" {...props}>
      <defs>
        <path
          id="launch_svg__a"
          d="m17 17h-14v-14h7v-2h-7c-1.11 0-2 0.9-2 2v14c0 1.1 0.89 2 2 2h14c1.1 0 2-0.9 2-2v-7h-2v7zm-5-16v2h3.59l-9.83 9.83 1.41 1.41 9.83-9.83v3.59h2v-7h-7z"
        />
      </defs>
      <g fillRule="evenodd">
        <mask id="launch_svg__b" fill="#fff">
          <use xlinkHref="#launch_svg__a" />
        </mask>
        <use fill="#000000" xlinkHref="#launch_svg__a" />
        <g fill="#999" mask="url(#launch_svg__b)">
          <rect width="20" height="20" />
        </g>
      </g>
    </svg>
  )
}

export default Launch
