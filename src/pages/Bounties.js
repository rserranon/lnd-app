import { observer } from "mobx-react-lite"
import React from "react"

import { useStore } from "../store/Provider"

function Bounties() {
    const store = useStore()

    return (
        <ul>
        {store.bounties.map( bounty => (<li key={bounty.id}>{bounty.title}</li> ))}
        </ul>
    )
}

export default observer(Bounties)