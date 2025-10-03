# My React UI Components

A modern, customizable React UI components library designed to simplify web development. This library provides a comprehensive set of reusable components with built-in functionality for various input types, containers, and tab navigation.

## Features

- 🎨 Modern and responsive design
- 📱 Multiple input types (Text, Select, Date, Number, Phone, Email)
- 🧩 Customizable components with extensive props
- 🎯 Built with React 18/19 compatibility for optimal performance
- 🔧 Easy to integrate and use
- 📚 Comprehensive documentation
- 🎭 Tab navigation with rich features (labels, titles, descriptions, badges, icons)
- 🛠️ Type-safe components

## Quick Start

```bash
# Install the main package
npm install px-react-ui-components

# Install required peer dependencies
npm install react@^18.3.1 react-dom@^18.3.1 react-icons@^5.5.0

# Optional dependencies (install only if you need specific components)
# For MyEditor component:
npm install react-quill@^2.0.0 quill@^1.3.7 quill-image-resize-module-react@^3.0.0 quill-table-ui@^1.0.7 katex@^0.16.21

# For MyAlert component:
npm install react-confirm-alert@^3.0.6

# For MyImageCropper component:
npm install react-image-crop@^11.0.7

# For MyWaiting component:
npm install react-loader-spinner@^7.0.3

# For MyFileUpload component:
npm install react-image-file-resizer@^3.0.4 react-html5-camera-photo@^1.5.4

# For MyZoomImage component:
npm install react-zoom-pan-pinch@^3.7.0
```

## Dependencies

### Required Dependencies
These are always required:

```json
{
  "react": "^18.3.1 || ^19.0.0",
  "react-dom": "^18.3.1 || ^19.0.0",
  "react-icons": "^5.5.0"
}
```

### Optional Dependencies
These are only needed if you use specific components:

```json
{
  "katex": "^0.16.21",                              // MyEditor
  "quill": "^1.3.7",                               // MyEditor
  "quill-image-resize-module-react": "^3.0.0",     // MyEditor
  "quill-table-ui": "^1.0.7",                      // MyEditor
  "react-quill": "^2.0.0",                         // MyEditor
  "react-confirm-alert": "^3.0.6",                 // MyAlert
  "react-image-crop": "^11.0.7",                   // MyImageCropper
  "react-loader-spinner": "^7.0.3",                // MyWaiting
  "react-image-file-resizer": "^3.0.4",            // MyFileUpload
  "react-html5-camera-photo": "^1.5.4",            // MyFileUpload
  "react-zoom-pan-pinch": "^3.7.0"                 // MyZoomImage
}
```

**Note:** If you try to use a component without its required dependencies, you'll see a helpful warning message with installation instructions.

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
import { MyInput, MyContainer, MyTabs, MyTabPane, MyInputType } from 'px-react-ui-components';

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
