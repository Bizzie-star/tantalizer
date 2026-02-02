import React, { useEffect } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { MenuProvider } from './contexts/MenuContext'
import { OrderProvider } from './contexts/OrderContext'
import { ReviewProvider } from './contexts/ReviewContext'
import AppRouter from './router/AppRouter'

const App = () => {

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      if (e.key === 'F12') {
        e.preventDefault();
      }
      
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault();
      }
      
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
        e.preventDefault();
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <MenuProvider>
          <OrderProvider>
            <ReviewProvider>
              <AppRouter />
            </ReviewProvider>
          </OrderProvider>
        </MenuProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App