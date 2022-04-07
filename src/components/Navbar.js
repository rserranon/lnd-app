import { observer } from "mobx-react-lite"
import React from "react"
import { useStore } from "../store/Provider"

function Navbar () {
    const store = useStore()
    
    return(
        <div className="navbar">
            <img src="logo192.png" alt="Logo" />
            <h2 onClick={store.gotoConnect} style={{cursor: "pointer"}}>Connect</h2>
            <h2 onClick={store.createNewBounty} style={{cursor: "pointer"}}>Create Bounty</h2>
        </div>
    )
}
export default observer(Navbar)