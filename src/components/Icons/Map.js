const Map = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" {...props}>
      <defs>
        <path
          d="M19.444 0l-.177.033-5.934 2.3L6.667 0 .4 2.111a.56.56 0 0 0-.4.533v16.8A.55.55 0 0 0 .556 20l.177-.033 5.934-2.3L13.333 20l6.267-2.111a.56.56 0 0 0 .4-.533V.556A.55.55 0 0 0 19.444 0zm-6.11 17.778l-6.667-2.345V2.223l6.666 2.344v13.21z"
          id="map_svg__a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="map_svg__b" fill="#fff">
          <use xlinkHref="#map_svg__a" />
        </mask>
        <use fill="#000" xlinkHref="#map_svg__a" />
        <g mask="url(#map_svg__b)" fill="#999">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default Map
