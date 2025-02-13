import './App.css'
import { useState } from 'react'
import { Modal } from "./components/Modal";
import { Epg } from "./components/Epg"
import { FullMenu } from "./components/FullMenu";



function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [menuOption, setMenuOption] = useState(null);

    return (
        <div className="container">

            {/* Botón burguer para mostrar menú */}
            <div className="burger rotar-hover" onClick={() => {
                setIsOpenMenu(!isOpenMenu);
                setMenuOption("");
            }}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            {
                isOpenMenu ? <div className="menu-wrapper">
                    <div className="menu-container">
                        <div className="menu-list">
                            <div onClick={() => {
                                setMenuOption(null);
                                window.open("https://github.com/danielnava901/programguide", "_blank")
                            }}>GitHub Repo</div>
                            <div className={`${menuOption === "readme" ? "menu-selected" : ""}`}
                                onClick={() => {setMenuOption("readme")}}>ReadMe</div>
                        </div>
                    </div>
                    {
                        menuOption && <FullMenu option={menuOption}/>
                    }
                </div> : null
            }

            {/*
            Muestra botón que muestra el Modal
            */}
            <button
                className="button"
                onClick={() => {setIsOpen(true)}}>Mostrar EPG</button>


            <Modal
                isOpen={isOpen}
                onClose={() => {setIsOpen(false)}}
            >
                {/*
                Componente principal que muestra la tabla con la programación
                */}
                <Epg />
           </Modal>
        </div>
    )
}

export default App
