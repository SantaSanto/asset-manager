import Container from 'react-bootstrap/Container'
import IBreadcrumb from '../components/breadcrumb/Breadcrumb'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Container fluid> 
      <title>Asset Manager</title>
      <IBreadcrumb breadcrumb={pageProps.breadcrumb} />
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp
