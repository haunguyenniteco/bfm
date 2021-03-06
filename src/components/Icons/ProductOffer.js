const ProductOffer = ({ svgRef, ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <path
          d="m14.142 0 2.105 3.753L20 5.858 18.835 10 20 14.142l-3.753 2.105L14.142 20 10 18.835 5.858 20l-2.105-3.753L0 14.142 1.165 10 0 5.858l3.753-2.105L5.858 0 10 1.165 14.142 0zm-1.21 10.494c-.661 0-1.2.19-1.615.571-.37.338-.575.772-.616 1.301l-.007.203v.512c0 .632.205 1.139.616 1.522.41.382.956.574 1.636.574.675 0 1.216-.19 1.622-.57.36-.339.561-.771.601-1.297l.008-.201v-.498c0-.66-.207-1.177-.62-1.553-.413-.376-.955-.564-1.625-.564zm-.482-4.606-5.035 7.87.998.526 5.036-7.87-.999-.526zm.482 5.761c.264 0 .476.085.637.253a.88.88 0 0 1 .234.534l.007.133v.526c0 .622-.288.934-.864.934a.84.84 0 0 1-.638-.27.901.901 0 0 1-.247-.527l-.008-.123v-.519c0-.29.08-.52.241-.688.16-.168.373-.253.638-.253zM7.995 4.823c-.665 0-1.204.193-1.614.578a1.922 1.922 0 0 0-.609 1.302l-.007.202v.491c0 .646.206 1.159.62 1.539.412.38.954.57 1.625.57.665 0 1.204-.189 1.614-.567.365-.336.568-.768.609-1.297l.007-.203V6.94c0-.65-.205-1.166-.616-1.546-.41-.38-.953-.57-1.629-.57zm0 1.155c.274 0 .49.086.645.256.13.142.205.321.227.537l.007.134v.512c0 .286-.078.514-.234.685-.156.17-.366.255-.63.255a.852.852 0 0 1-.641-.252.873.873 0 0 1-.238-.534l-.007-.133v-.505c0-.3.08-.534.241-.702a.831.831 0 0 1 .63-.253z"
          id="a"
        />
      </defs>
      <g transform="translate(2 2)" fill="none" fillRule="evenodd">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <use fill="#CF1B1B" xlinkHref="#a" />
        <g mask="url(#b)" fill="#CF1B1B">
          <path d="M-2-2h24v24H-2z" />
        </g>
      </g>
    </svg>
  )
}

export default ProductOffer
