# react-webpack-js-to-typescript

The purpose of this demo was to showcase the process of moving a basic React project using standard JavaScript ES6+ and Webpack 4 to use TypeScript.

The instructions below allow you to try for yourself setting up a npm repo from scratch, build an initial React + JavaScript application, and then move that implementation to TypeScript.

# Repo Setup
- Initialize package.json `yarn init`
- Install non-TypeScript devDependencies `yarn add --dev babel-core babel-loader babel-preset-react html-webpack-plugin react react-dom webpack webpack-cli webpack-dev-server`
- Add start script to package.json

  ```js
  {
    "name": "react-webpack-js-to-typescript",
    ...
    "scripts": {
      "start": "webpack-dev-server",
      "build": "webpack"
    },
    ...
  }
  ```

# React + JavaScript Setup
- Initialize initial directory and copy starter file contents into respective files

  ```js
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

  ```js
  import * as React from 'react'
  import * as ReactDOM from 'react-dom'

  import { HelloComponent } from './components/HelloComponent'

  ReactDOM.render(
      <HelloComponent author='Andrew Paradi' company='Square' />,
      document.getElementById("root")
  )
  ```

- `src/components/HelloComponent.jsx`

  ```js
  import * as React from 'react'

  const Hello = (props) => (
      <div>
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

  ```js
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

# JavaScript -> TypeScript

- Install TypeScript devDependencies `yarn add --dev @types/react @types/react-dom awesome-typescript-loader prop-types typescript`

- Update the following to `webpack.config.js`

  ```js
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

- This error requires adding an Interface for props to `src/components/HelloComponent.tsx`
  ```js
  ERROR in [at-loader] ./src/components/HelloComponent.tsx:8:16
      TS7006: Parameter 'props' implicitly has an 'any' type.
  ```

  ```tsx

  import * as React from 'react'

  interface HelloProps {
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
  ```

# Branches
- `1-clean-repo`: Provides an empty repo to start the tutorial at *Repo Setup*
- `2-react-javascript-setup`: Completes the first step of *React + JavaScript Setup* with initial Webpack + React + JavaScript compiling
- `master`: finished move of repo from JavaScript -> TypeScript

# Contributing
PRs are welcome for bug fixes or dependency bumps since active development on this repo will not continue past Jul 3, 2018

# Authors
Andrew Paradi [@adrw](https://github.com/adrw/)