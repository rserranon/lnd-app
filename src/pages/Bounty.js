import { observer } from "mobx-react-lite"
import React, {useState, useCallback} from "react"
import ReactMde from "react-mde"
import Showdown from 'showdown'
import "react-mde/lib/styles/css/react-mde-all.css";

import {useStore} from './../store/Provider'

function Bounty () {
    const [selectedTab, setSelectedTab] = useState("write")
    const [title, setTitle] = useState("Type your title here...")
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
            <input
             className='input-pane-editor'
             type="text"
             required
             value={title}
             onChange={e => setTitle(e.target.value)}
            />
            <ReactMde
                value={body}
                onChange={setBody}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            />
            <div className='buttons'>
              <button className="button-cancel" onClick={event => onCancel(event)}>
                Cancel
              </button>
              <button className="button-submit" type="submit">
                Submit
              </button>
            </div>
        </form>
    </section>
)

}

export default  observer(Bounty)