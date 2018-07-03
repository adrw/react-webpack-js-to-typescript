import * as React from 'react'

export interface HelloProps {
    author: string,
    company: string
}

const Hello = (props: HelloProps) => (
    <div>
      <h1>This React site was built by {props.author} at {props.company}</h1>
    </div>
)

export class HelloComponent extends React.Component<HelloProps, {}> {
    render() {
        return <Hello {...this.props}/>
    }
}