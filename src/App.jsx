import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { MenuProvider } from './contexts/MenuContext'
import { OrderProvider } from './contexts/OrderContext'
import { ReviewProvider } from './contexts/ReviewContext'
import AppRouter from './router/AppRouter'

const App = () => {
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