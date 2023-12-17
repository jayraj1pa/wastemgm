import React, { useState } from 'react'
import NavComponent from '../NavComponent'
import Footer from '../Footy'


function Seg() {
  const [coins, setCoins] = useState(0); // Initialize coins state to 0

  return (
    <div>

<NavComponent/>
<div>
      {/* ... other user info ... */}
      <p>Coins: {coins}</p>
    </div>

<Footer/>




    </div>
  )
}

export default Seg