# My React UI Components

A modern, customizable React UI components library designed to simplify web development. This library provides a comprehensive set of reusable components with built-in functionality for various input types, containers, and tab navigation.

## Features

- 🎨 Modern and responsive design
- 📱 Multiple input types (Text, Select, Date, Number, Phone, Email)
- 🧩 Customizable components with extensive props
- 🎯 Built with React 18 for optimal performance
- 🔧 Easy to integrate and use
- 📚 Comprehensive documentation
- 🎭 Tab navigation with rich features (labels, titles, descriptions, badges, icons)
- 🛠️ Type-safe components

## Quick Start

```bash
# Install the main package
npm install my-react-ui-components

# Install required peer dependencies
npm install react@^18.3.1 react-dom@^18.3.1 katex@^0.16.21 quill@^2.0.3 quill-image-resize-module-react@^3.0.0 quill-table-ui@^1.0.7 react-confirm-alert@^3.0.6 react-icons@^5.5.0 react-image-crop@^11.0.7 react-loader-spinner@^6.1.6 react-zoom-pan-pinch@^3.7.0
```

## Peer Dependencies

This library requires the following peer dependencies to be installed in your project:

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "katex": "^0.16.21",
  "quill": "^2.0.3",
  "quill-image-resize-module-react": "^3.0.0",
  "quill-table-ui": "^1.0.7",
  "react-confirm-alert": "^3.0.6",
  "react-icons": "^5.5.0",
  "react-image-crop": "^11.0.7",
  "react-loader-spinner": "^6.1.6",
  "react-zoom-pan-pinch": "^3.7.0"
}
```

## Available Components

The library includes the following components:

- `MyAlert` :
- `MyEditor` :
- `MyFileUpload` :
- `MyImageCropper` :
- `MyMaps` :
- `MyMenu` :
- `MyModal` :
- `MyNotFound` :
- `MyScrollableCard` :
- `MyTable` :
- `MyWaiting` :
- `MyZoomImage` :
- `MyInput`: A versatile input component supporting multiple types:
  - TEXT
  - PASSWORD
  - SELECT
  - SELECTFILTER
  - FILE
  - IMAGE
  - TEXTAREA
  - COLOR
  - READONLY
  - DATE
  - DATETIME
  - TIME
  - MONEY
  - NUMBER
  - MAIL
  - PHONE
- `MyContainer`: A flexible container component
- `MyTabs`: Advanced tab navigation with rich features

## Usage

Import components as needed:

```jsx
import { MyInput, MyContainer, MyTabs, MyTabPane, MyInputType } from 'my-react-ui-components';

// Example usage
function App() {
  return (
    <MyContainer>
      <MyInput type={MyInputType.TEXT} value={param} onChange={() => setParam(e.value)} placeholder="Enter text" />
      <MyInput type={MyInputType.SELECT} value={param} onChange={() => setParam(e.value)} placeholder="Enter text" />
      <MyInput type={MyInputType.DATE} value={param} onChange={() => setParam(e.value)} placeholder="Enter text" />
      <MyInput type={MyInputType.NUMBER} value={param} onChange={() => setParam(e.value)} placeholder="Enter text" />
      <MyInput type={MyInputType.PHONE} value={param} onChange={() => setParam(e.value)} placeholder="Enter text" />
      <MyInput type={MyInputType.MAIL} value={param} onChange={() => setParam(e.value)} placeholder="Enter text" />

      <MyTabs>
        <MyTabPane label="Tab 1" title="" description="" badge="" icon="" className="">Content for Tab 1</MyTabPane>
        <MyTabPane label="Tab 2" title="" description="" badge="" icon="" className="">Content for Tab 2</MyTabPane>
      </MyTabs>
    </MyContainer>
  );
}
```

## Development

To build the project:

```bash
npm run build
```

This will compile the source files from `src` to `dist` directory.

## License

MIT © Piri AYKUT

## Author

Piri AYKUT | piriaykut@gmail.com
