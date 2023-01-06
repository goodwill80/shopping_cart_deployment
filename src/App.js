import {
  Navigate,
  HashRouter as Router,
  // BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { useGlobalProductContext } from './Store/ProductStore/Product.context.jsx';
import { useGlobalUtility } from './Store/Utility/Utility.context.jsx';

import LayoutComponent from './Layouts/Layout';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage.jsx';
import AdminPage from './Pages/AdminPage';
import ViewList from './Components/Admin.components/ViewList.jsx';
import ProductForm from './Components/Admin.components/ProductForm.jsx';
import ProductCard from './Components/Admin.components/ProductCard.jsx';
import ErrorPage from './ErrorPage.jsx';
import SignInPage from './Pages/SignInPage.jsx';
import RegisterForm from './Pages/RegisterForm.jsx';

function App() {
  const { products, deleteAll, selectDelete } = useGlobalProductContext();
  const { isLoggedIn } = useGlobalUtility();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route index element={<HomePage products={products} />} />
          <Route
            path="/signin"
            element={isLoggedIn ? <Navigate to="/admin" /> : <SignInPage />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/admin" /> : <RegisterForm />}
          />
          <Route
            path="product/:id"
            element={<ProductPage products={products} />}
          />
          <Route
            path="admin"
            element={!isLoggedIn ? <Navigate to="/signin" /> : <AdminPage />}
          >
            <Route
              path="view"
              element={
                <ViewList
                  products={products}
                  deleteAll={deleteAll}
                  selectDelete={selectDelete}
                />
              }
            >
              <Route path="add" element={<ProductForm products={products} />} />
              <Route path=":id" element={<ProductCard products={products} />} />
              <Route
                path="edit/:id"
                element={<ProductForm products={products} />}
              />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
