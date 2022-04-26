import { observer } from "mobx-react-lite"
import React, {useMemo} from "react"
import Showdown from 'showdown'
import { useStore } from "../store/Provider"
const buble = require('buble');

const MarkdownToJSX = ({ md }) => {
    // if (typeof md !== 'string') return null;
    const makeComponent = useMemo(() => {
      const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
      });
      // wrap converted HTML in closures
      //   const html = <>${converter.makeHtml(md)}</>
      const html = converter.makeHtml(md)
      const htmlWrapped = '<>'.concat(html).concat('</>')
      const code = buble.transform(htmlWrapped).code;
      // eslint-disable-next-line
      const makeComponent = Function('React', 'return ' + code)
      console.log(makeComponent)
      return makeComponent;
    }, [md]);
  
    return makeComponent(React);
  };

function Bounties() {
    const store = useStore()

    return (
        store.bounties.map( bounty => (
            <div className="bounties" key={bounty.id}>
                <h2>{bounty.title}</h2> 
                <div >
                    <MarkdownToJSX md={bounty.body}/>
                </div>
            </div>
        ))
    )
}

export default observer(Bounties)