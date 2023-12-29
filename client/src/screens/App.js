import { Route, Routes } from "react-router-dom";
import { AllRoutes } from "../routes/AllRoutes";
import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "../routes/PublicRoute";
import PublicLayout from "../components/layout/PublicLayout";
import PrivateLayout from "../components/layout/privateLayout";
import { Provider } from 'react-redux';
import store, { persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          {AllRoutes.map((route) => {
            return (
              <Route
                key={route.name}
                path={route.path}
                element={
                  !route.isPublic ? (
                    <PrivateRoute>
                      <PrivateLayout>{route.component}</PrivateLayout>
                    </PrivateRoute>
                  ) : (
                    <PublicRoute>
                      <PublicLayout>{route.component}</PublicLayout>
                    </PublicRoute>
                  )
                }
              />
            );
          })}
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
