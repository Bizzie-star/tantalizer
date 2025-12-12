import React from 'react'
import Header from './statics/Header'

import Footer from './statics/Footer'
import Homescreen from './statics/Homescreen'


function App() {
  return ( 
    
     <>
  <Header />
  <main className="min-h-screen w-full ">
    <Homescreen />
  </main>
  <Footer />
</>
  )
 

}


export default App
