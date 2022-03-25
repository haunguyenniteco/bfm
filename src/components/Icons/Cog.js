const Cog = ({ ...props }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" focusable="false" {...props}>
      <defs>
        <path
          d="M18.236 11.92c-1.05-1.818-.418-4.147 1.41-5.206L17.68 3.31a3.769 3.769 0 0 1-1.911.518c-2.1 0-3.803-1.714-3.803-3.828H8.035a3.766 3.766 0 0 1-.507 1.919c-1.05 1.818-3.382 2.436-5.212 1.382L.35 6.705a3.764 3.764 0 0 1 1.404 1.396c1.048 1.815.42 4.14-1.4 5.2l1.965 3.404a3.768 3.768 0 0 1 1.903-.513c2.093 0 3.792 1.703 3.802 3.808h3.93c0-.646.162-1.3.508-1.899 1.047-1.815 3.374-2.434 5.203-1.387l1.966-3.404a3.767 3.767 0 0 1-1.395-1.391zm-8.238 2.13a4.05 4.05 0 1 1 0-8.1 4.05 4.05 0 0 1 0 8.1z"
          id="cog_svg__a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="cog_svg__b" fill="#fff">
          <use xlinkHref="#cog_svg__a" />
        </mask>
        <use fill="currentColor" fillRule="nonzero" xlinkHref="#cog_svg__a" />
        <g mask="url(#cog_svg__b)" fill="currentColor">
          <path d="M0 0h20v20H0z" />
        </g>
      </g>
    </svg>
  )
}

export default Cog
