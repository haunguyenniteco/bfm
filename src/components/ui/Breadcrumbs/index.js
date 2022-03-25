import MaterialBreadcrumbs from '@mui/material/Breadcrumbs'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

const Breadcrumbs = ({ children }) => (
  <MaterialBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
    {children}
  </MaterialBreadcrumbs>
)

export default Breadcrumbs
