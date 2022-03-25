const Basket = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" {...props}>
      <defs>
        <path
          d="M6.28 15.08c-.968 0-1.751.792-1.751 1.76s.783 1.76 1.751 1.76c.968 0 1.76-.792 1.76-1.76s-.792-1.76-1.76-1.76zM1 1v1.76h1.76l3.168 6.68-1.188 2.155c-.14.247-.22.537-.22.845 0 .968.792 1.76 1.76 1.76h10.56v-1.76H6.65a.218.218 0 0 1-.22-.22l.026-.106.792-1.434h6.556c.66 0 1.24-.36 1.54-.906l3.15-5.712a.883.883 0 0 0-.774-1.302H4.705L3.878 1H1zm14.08 14.08c-.968 0-1.751.792-1.751 1.76s.783 1.76 1.751 1.76c.968 0 1.76-.792 1.76-1.76s-.792-1.76-1.76-1.76z"
          id="basket_svg__a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="basket_svg__b" fill="#fff">
          <use xlinkHref="#basket_svg__a" />
        </mask>
        <use fill="currentColor" xlinkHref="#basket_svg__a" />
        <g mask="url(#basket_svg__b)" fill="currentColor">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default Basket
