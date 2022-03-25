const Kebab = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" {...props}>
      <defs>
        <path
          d="M2.5 12.5A2.507 2.507 0 0 1 0 10c0-1.375 1.125-2.5 2.5-2.5S5 8.625 5 10s-1.125 2.5-2.5 2.5zm15 0A2.507 2.507 0 0 1 15 10c0-1.375 1.125-2.5 2.5-2.5S20 8.625 20 10s-1.125 2.5-2.5 2.5zm-7.5 0A2.507 2.507 0 0 1 7.5 10c0-1.375 1.125-2.5 2.5-2.5s2.5 1.125 2.5 2.5-1.125 2.5-2.5 2.5z"
          id="kebab_svg__a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="kebab_svg__b" fill="#fff">
          <use xlinkHref="#kebab_svg__a" />
        </mask>
        <use fill="#000" opacity={0.54} transform="matrix(0 -1 -1 0 20 20)" xlinkHref="#kebab_svg__a" />
        <g mask="url(#kebab_svg__b)" fill="#999">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default Kebab
