import { makeAutoObservable } from "mobx"
import * as api from '../services/api'

export class Store {
    constructor() {
        makeAutoObservable(this)
    }

    // observable state attributes

    currentPage = 'nada'
    error = ''
    connected = false

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