import { makeAutoObservable } from "mobx"
import { v4 as uuidv4 } from 'uuid';

import * as api from '../services/api'

export class Store {
    constructor() {
        makeAutoObservable(this)
    }

    // observable state attributes
    currentPage = ''
    error = ''
    connected = false

    bounties = []
    currentBounty = 0

    // Bounty actions
    createNewBounty = () => {
        const newBounty = {
            id: uuidv4(),
            title: "Type your title here...",
            body: "# Type your markdown bounty  here..."
        }
        this.bounties.push(newBounty)
        this.currentBounty = this.bounties.length - 1
        this.currentPage = "bounty"
    }

    // Actions
    gotoHome = () => (this.currentPage = '')
    gotoConnect = () => (this.currentPage = 'connect')

    clearError = () => (this.error = '')

    connectToLnd = async (host, cert, macaroon) => {
        this.clearError()
        try {
            await api.connect ( host, cert, macaroon)
            this.connected = true
        }
        catch (err) {
            this.error = err.message
        }
    }

}