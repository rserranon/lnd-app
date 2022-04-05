import { observer } from "mobx-react-lite"
import React from "react"
import { useStore } from "../store/Provider"

function Navbar () {
    const store = useStore()
    
    return(
        <div className="navbar">
            <img src="logo192.png" alt="Logo" />
            <h2 onClick={store.gotoConnect}>Connect</h2>
        </div>
    )
}
export default observer(Navbar)