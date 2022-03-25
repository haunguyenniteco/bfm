const SvgSubstituteNotAllowed = ({ svgRef, ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" ref={svgRef} {...props}>
      <defs>
        <path
          d="M5.785 6.902A5.426 5.426 0 0 0 4.818 10c0 .918.227 1.79.637 2.545l-1.328 1.328A7.21 7.21 0 0 1 3 10c0-1.654.552-3.18 1.481-4.401L0 1.117 1.117 0 20 18.883 18.883 20l-4.21-4.209a7.242 7.242 0 0 1-4.4 1.482V20l-3.637-3.636 3.637-3.637v2.728c1.15 0 2.217-.358 3.098-.967L5.785 6.902zm1.147-3.364c1-.518 2.136-.81 3.34-.81V0l3.637 3.636-3.636 3.637V4.545c-.695 0-1.36.13-1.97.368L6.931 3.538zm9.791 9.825l-1.37-1.375a5.431 5.431 0 0 0-.262-4.533l1.327-1.328a7.244 7.244 0 0 1 .305 7.236z"
          id="substitute-not-allowed_svg__a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="substitute-not-allowed_svg__b" fill="#fff">
          <use xlinkHref="#substitute-not-allowed_svg__a" />
        </mask>
        <use fillOpacity={0.54} fill="#000" xlinkHref="#substitute-not-allowed_svg__a" />
        <g mask="url(#substitute-not-allowed_svg__b)" fill="#999">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default SvgSubstituteNotAllowed
