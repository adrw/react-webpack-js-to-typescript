import * as React from 'react'

interface HelloProps {
    author: string,
    company: string
}

const Hello = (props: HelloProps) => (
    <div>
      <h1>It's <strong>HomePage</strong> y'allllllllllllllll</h1>
      <h1>This React site was built by {props.author} at {props.company}</h1>
    </div>
)

export class HelloComponent extends React.Component<HelloProps, {}> {
    render() {
        return <Hello {...this.props}/>
    }
}