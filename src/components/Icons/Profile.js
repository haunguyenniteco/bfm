const Profile = ({ svgRef, ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" ref={svgRef} {...props}>
      <defs>
        <path
          d="M10 11.429A5.714 5.714 0 1 1 10 0a5.714 5.714 0 0 1 0 11.429zM20 20H0c0-3.945 4.477-7.143 10-7.143S20 16.055 20 20z"
          id="profile_svg__a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="profile_svg__b" fill="#fff">
          <use xlinkHref="#profile_svg__a" />
        </mask>
        <use fill="currentColor" fillRule="nonzero" xlinkHref="#profile_svg__a" />
        <g mask="url(#profile_svg__b)" fill="currentColor">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default Profile
