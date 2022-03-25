const Vector = ({ svgRef, ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" ref={svgRef} {...props}>
      <defs>
        <path
          d="M0 1l9.443 8.56L20 4.87l-1.227 9.154-14.18 5.771L0 1zm9.092 10.581l-6.69-6.659 3.476 12.562L17.324 13l.876-5.494-9.108 4.075z"
          id="vector_svg__a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="vector_svg__b" fill="#fff">
          <use xlinkHref="#vector_svg__a" />
        </mask>
        <use fill="#D8D8D8" xlinkHref="#vector_svg__a" />
        <g mask="url(#vector_svg__b)" fill="#999">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}
export default Vector
