import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Productos from './components/Productos'
import Nosotros from './components/Nosotros'
import HeroCommercial from './components/HeroCommercial'
import PQRSForm from './components/PQRSForm'
import AdminDashboard from './components/AdminDashboard'
import Footer from './components/Footer'
import QRFloating from './components/QRFloating'
import { AdminProvider, useAdmin } from './context/AdminContext'

const AppContent = () => {
  const { showDashboard } = useAdmin();

  if (showDashboard) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24"> {/* Add top padding to account for fixed navbar */}
        <section id="hero">
          <Hero />
        </section>
        <section id="productos">
          <Productos />
        </section>
        <section id="nosotros">
          <Nosotros />
        </section>
        <section id="contacto">
          <HeroCommercial />
        </section>
        <PQRSForm />

        <style>
          {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .animate-fadeIn {
            animation: fadeIn 1s ease-in-out;
          }

          .animate-slideUp {
            animation: slideUp 1s ease-in-out;
          }
        `}
        </style>
      </div>
      <Footer />
      <QRFloating />
    </div>
  );
};

function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  )
}

export default App
