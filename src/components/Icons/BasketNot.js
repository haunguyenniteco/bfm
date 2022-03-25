const BasketNot = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" {...props}>
      <defs>
        <path
          d="M20 18.883L2.437 1.32 1.76.642 1.117 0 0 1.117 3.863 4.98l1.944 4.1-1.188 2.156c-.14.247-.22.537-.22.845 0 .968.792 1.76 1.76 1.76h6.564l1.215 1.214a1.757 1.757 0 0 0 1.02 3.185c.59 0 1.109-.29 1.426-.739L18.883 20 20 18.883zM6.529 12.08a.218.218 0 0 1-.22-.22l.026-.106.792-1.434h2.077l1.76 1.76H6.528zm7.153-1.76c.66 0 1.241-.36 1.54-.906l3.15-5.71a.882.882 0 0 0-.774-1.302H5.755l7.927 7.918zm-7.523 4.4c-.968 0-1.75.792-1.75 1.76 0 .967.782 1.76 1.75 1.76s1.76-.793 1.76-1.76c0-.968-.792-1.76-1.76-1.76z"
          id="basket-not_svg__a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="basket-not_svg__b" fill="#fff">
          <use xlinkHref="#basket-not_svg__a" />
        </mask>
        <use fill="#000" opacity={0.54} xlinkHref="#basket-not_svg__a" />
        <g mask="url(#basket-not_svg__b)" fill="#999">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default BasketNot
