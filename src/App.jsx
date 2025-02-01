import { useState } from 'react'
import { Modal } from "./components/Modal";
import {Epg} from "./components/Epg"
import './App.css'




function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="container">
       <button
           className="button"
           onClick={() => {setIsOpen(true)}}>Abrir PGE</button>
       <Modal
            isOpen={isOpen}
            onClose={() => {setIsOpen(false)}}
       >
          <Epg />
       </Modal>
    </div>
  )
}

export default App
