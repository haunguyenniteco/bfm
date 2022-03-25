/**
 * DefaultLayout
 */

import { Header, Footer } from '@components/common'
import Layout from './Layout'

const DefaultLayout = ({ children }) => (
  <Layout header={Header} footer={Footer}>
    {children}
  </Layout>
)

export default DefaultLayout
