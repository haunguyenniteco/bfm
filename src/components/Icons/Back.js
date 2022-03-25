const Back = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" {...props}>
      <defs>
        <path
          d="M4.043 9.018H19.34v2.174H4.253l7.272 7.271L9.988 20 0 10.012.012 10 0 9.988 9.988 0l1.537 1.537-7.482 7.481z"
          id="back_svg__a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="back_svg__b" fill="#fff">
          <use xlinkHref="#back_svg__a" />
        </mask>
        <use fill="#000" xlinkHref="#back_svg__a" />
        <g mask="url(#back_svg__b)" fill="currentColor">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default Back
