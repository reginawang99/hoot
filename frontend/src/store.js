import rootReducer from './reducers'
import { createStore } from 'redux'

export default function configureStore(preloadedState) {
  const store = createStore(
  	rootReducer,
  	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  return store
}