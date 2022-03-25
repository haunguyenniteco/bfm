import HiddenMaterial from '@mui/material/Hidden'

const Hide = ({ children, ...props }) => {
  return <HiddenMaterial smDown>{children}</HiddenMaterial>
}

export default Hide
