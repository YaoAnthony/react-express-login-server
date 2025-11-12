import '@ant-design/v5-patch-for-react-19';

// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//env
import { getEnv } from './config/env.ts';

// google login
import { GoogleOAuthProvider } from '@react-oauth/google';

// CSS
import './index.css'
import './style/cursors.css'

// Components
import App from './App.tsx'

// Redux
import { Provider } from 'react-redux'
import { store, persistor } from './Redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react' 

// router
import { BrowserRouter } from 'react-router-dom'

// Context
import { ModalAuthProvider } from './Features/Authentication/component/ModalAuthContext.tsx';

// Loading page
import LoadingPage from './Pages/LoadingPage/index.tsx';


// get env variables
const { googleClientId, } = getEnv();

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={googleClientId}>
      <Provider store={store}>
        {/* 等待 redux-persist rehydrate 完成后再渲染 UI */}
        <PersistGate loading={<LoadingPage />} persistor={persistor}>
          <BrowserRouter>
              <ModalAuthProvider>
                  <App />
              </ModalAuthProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  ,
)

