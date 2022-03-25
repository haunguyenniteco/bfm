const BasketAdd = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" {...props}>
      <defs>
        <path
          d="M9.81 7.548h1.761V4.905h2.643V3.143h-2.643V.5H9.81v2.643H7.167v1.762H9.81v2.643zm-3.524 7.928a1.76 1.76 0 0 0-1.753 1.762A1.76 1.76 0 0 0 6.286 19c.969 0 1.762-.793 1.762-1.762s-.793-1.762-1.762-1.762zm8.81 0a1.76 1.76 0 0 0-1.754 1.762A1.76 1.76 0 0 0 15.095 19c.97 0 1.762-.793 1.762-1.762s-.793-1.762-1.762-1.762zm-8.66-2.863l.026-.106.793-1.436h6.563c.66 0 1.242-.36 1.542-.907l3.4-6.175-1.533-.846h-.009l-.969 1.762-2.431 4.405H7.634l-.115-.238-1.973-4.167-.837-1.762L3.88 1.38H1v1.762h1.762l3.171 6.686-1.189 2.159c-.14.246-.22.537-.22.845 0 .97.793 1.762 1.762 1.762h10.571v-1.762H6.656a.224.224 0 0 1-.22-.22z"
          id="basket-add_svg__a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="basket-add_svg__b" fill="#fff">
          <use xlinkHref="#basket-add_svg__a" />
        </mask>
        <use fill="#CF9898" xlinkHref="#basket-add_svg__a" />
        <g mask="url(#basket-add_svg__b)" fill="#999">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default BasketAdd
