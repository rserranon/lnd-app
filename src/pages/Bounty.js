import { observer } from "mobx-react-lite"
import React, { useState, useCallback } from "react"
import ReactMde from "react-mde"
import Showdown from 'showdown'
import "react-mde/lib/styles/css/react-mde-all.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import {useStore} from './../store/Provider'

function Bounty () {
    const [selectedTab, setSelectedTab] = useState("write")
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("# Type your markdown bounty  here...")
    const store = useStore()

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    }) 

    const handleSubmit = useCallback(
        async (event) => {
          event.preventDefault()
          store.createNewBounty()
          store.bounties[store.currentBounty].title = title
          store.bounties[store.currentBounty].body = body

         console.log(title)
         console.log(body)
         console.log(store.bounties)
         store.gotoHome()
        },
        [title, body, store],
      );

      const onCancel = (event) => {
        event.preventDefault()
        alert("Do you really want to cancel an go to Home?")
        store.gotoHome()
      }

return (
    <section className="pane editor">
        <form onSubmit={handleSubmit}>
            <span className="p-float-label">
              <InputText 
                id="title" 
                size="80"
                required
                value={title} 
                onChange={e => setTitle(e.target.value)} />
              <label htmlFor="title">Bounty Title</label>
            </span>
            <br />
            <ReactMde
                value={body}
                onChange={setBody}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={50}
                heightUnits="vh"
            />
            <br />
            <div className="buttons">
              <Button 
                  label="Cancel" 
                  className="p-button-danger" 
                  onClick={event => onCancel(event)}
              />
              <Button 
                  label="Save"
                  type="submit" 
                  className="p-button-success" 
              />
            </div>
        </form>
    </section>
)

}

export default  observer(Bounty)