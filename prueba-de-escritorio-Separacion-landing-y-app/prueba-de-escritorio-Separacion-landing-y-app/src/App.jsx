import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import SearchCombos from '@/pages/SearchCombos';
import OurStory from '@/pages/OurStory';
import Contact from '@/pages/Contact';
import ComboDetail from '@/pages/ComboDetail';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForBusinessPage from '@/pages/ForBusinessPage';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import BusinessDashboard from '@/pages/business/BusinessDashboard';
import CustomerDashboard from '@/pages/customer/CustomerDashboard';
import ShoppingCart from '@/pages/ShoppingCart';

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (role && user.type !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function AppContent() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Helmet>
          <title>KIOSKU BITES - Combos de comida a precio reducido</title>
          <meta name="description" content="Descubre combos de comida deliciosos a precios reducidos y ayuda a reducir el desperdicio alimentario con KIOSKU BITES." />
        </Helmet>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Buscar Combos vuelve a ser público */}
            <Route path="/buscar-combos" element={<SearchCombos />} />
            <Route path="/nuestra-historia" element={<OurStory />} />
            <Route path="/para-empresas" element={<ForBusinessPage />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/combo/:id" element={<ComboDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* carrito sigue protegido */}
            <Route path="/carrito" element={
              <PrivateRoute>
                <ShoppingCart />
              </PrivateRoute>
            } />

            <Route path="/dashboard/cliente/*" element={
              <PrivateRoute role="cliente">
                <CustomerDashboard />
              </PrivateRoute>
            }/>
            <Route path="/dashboard/local/*" element={
              <PrivateRoute role="local">
                <BusinessDashboard />
              </PrivateRoute>
            }/>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;