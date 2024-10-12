import { Provider } from "react-redux"
import { store } from './store'

function ProvidersRedux({children}:any) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default ProvidersRedux