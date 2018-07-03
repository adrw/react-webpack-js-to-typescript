import * as React from 'react'

const Hello = (props) => (
    <div>
      <h1>It's <strong>HomePage</strong> y'allllllllllllllll</h1>
      <h1>This React site was built by {props.author} at {props.company}</h1>
    </div>
)

export class HelloComponent extends React.Component {
    render() {
        return <Hello {...this.props}/>
    }
}