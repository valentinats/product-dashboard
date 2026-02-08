import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { NotificationProvider } from "@/features/notifications/context/NotificationContext";
import { LoginPage } from "@/pages/auth/LoginPage";
import { ProductsPage } from "@/pages/products/ProductsPage";
import { ProtectedRoute } from "@/shared/components/ProtectedRoute";

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <BrowserRouter basename="/product-dashboard">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
