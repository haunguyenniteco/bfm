import Provider from 'src/theming/Provider'

const Wrapper = ({ children }) => (
  <div id="__next">
    <Provider>{children}</Provider>
  </div>
)

export default Wrapper
