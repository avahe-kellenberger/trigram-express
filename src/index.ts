import { EndpointListener } from './endpoint'

const endpointListener: EndpointListener = new EndpointListener()
const port: number = process.env.PORT !== undefined ? parseInt(process.env.PORT) : 8000
endpointListener.listen(port)
