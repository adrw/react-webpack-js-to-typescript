# 0703-typescript-demo

# Repo Setup
- Initialize package.json `yarn init`
- Install non-TypeScript dependencies `yarn add --save `
- Install non-TypeScript devDependencies `yarn add --dev babel-core babel-loader babel-preset-react html-webpack-plugin react react-dom webpack webpack-cli webpack-dev-server`
- Add start script to package.json
```JSON

"scripts": {
    "start": "webpack-dev-server",
    "build": "webpack"
  },
```

# Basic React Wiring
- Initialize initial directory and copy starter file contents into respective files

```
src/
  index.html
  index.js
  components/
    HomePage.jsx
    AnotherComponent.jsx
webpack.config.js
.gitignore
```

- `.gitignore`
```
node_modules
```

- `src/index.html`
```HTML
<!DOCTYPE html>
<html>
<head>
</head>

<body>
    <div id="root"></div>
</body>

</html>
```

- `src/index.js`
```Javascript
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { HelloComponent } from './components/HelloComponent'

ReactDOM.render(
    <HelloComponent author='Andrew Paradi' company='Square' />,
    document.getElementById("root")
)
```

- `src/components/HelloComponent.jsx`
```Javascript
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
```

- `webpack.config.js`
```Javascript
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    port: '3000',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [HTMLWebpackPluginConfig]
}
```

# Transition Repo to TypeScript

- Install Typescript devDependencies `yarn add --dev @types/react @types/react-dom awesome-typescript-loader prop-types typescript`

- Update the following to `webpack.config.js`
```Javascript
module.exports = {
  ...
  module: {
    ...
    entry: path.join(__dirname, '/src/index.tsx'),
    ...
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        loaders: 'awesome-typescript-loader'
      },
      ...
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },

```

- Add new file `tsconfig.json` which has TypeScript compiler configuration
```JSON
{
  "compilerOptions": {
      "outDir": "./dist/",
      "declaration": true,
      "sourceMap": true,
      "noImplicitAny": true,
      "module": "commonjs",
      "jsx": "react",
      "target": "es5",
      "lib": ["es5", "es6", "dom", "es2017"]
  },
  "include": [
      "./src/**/*"
  ]
}
```

- Rename to TypeScipt extensions
  - `src/index.js` -> `src/index.tsx`
  - `src/components/HelloComponent.jsx` -> `src/components/HelloComponent.tsx`

- Try `yarn start` and you will now have TypeScript Errors! Now, let's fix them!

- Add Interfaces to `src/components/HelloComponent.tsx`
```Javascript
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
```

# Authors
- Andrew Paradi [@adrw](https://github.com/adrw/)