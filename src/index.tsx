import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { HelloComponent } from './components/HelloComponent'

ReactDOM.render(
    <HelloComponent author='Andrew Paradi' company='Square' />,
    document.getElementById("root")
)