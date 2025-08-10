# Admin Terminal

A modern admin terminal for real-time order management and operational control.  
Built with React, Redux Toolkit, Vite, Ant Design, and WebSocket integration for responsive, high-performance administration.

## Features

- Real-time order monitoring and management
- User and system operations dashboard
- WebSocket-based event handling
- Secure login/logout and session management
- Intuitive, modern UI for administrators
- Internationalization (i18n) support
- Persistent and saga-based state management

## Tech Stack

- **Vite** – Lightning fast build tool and dev server
- **React** – Modern UI library
- **Redux Toolkit** – Simplified, powerful state management
- **Redux Saga & Redux Persist** – Advanced side-effects and persistent state
- **React Router DOM** – Routing and navigation
- **WebSocket** – Real-time communication
- **TypeScript** – Type safety
- **Ant Design** – Enterprise-class UI components and theming
- **Tailwind CSS** – Utility-first CSS framework for rapid UI development
- **Sass** – Powerful CSS preprocessor
- **i18next & react-i18next** – Internationalization
- **ESLint & Prettier** – Code quality and formatting
- **Husky & lint-staged** – Git hooks and pre-commit checks

## Getting Started

### Prerequisites

- Node.js (>= 16)
- npm or yarn

### Installation

```bash
git clone https://github.com/chathurawakwella/admin-terminal
cd admin-terminal
npm install
# or
yarn install
```

### Running the App (Development)

```bash
npm run dev
# or
yarn dev
```

By default, the application will start at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
# or
yarn build
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

### Preview Production Build

```bash
npm run preview
```

### Prepare Git Hooks

```bash
npm run prepare
```

## Styling

This project uses both **Ant Design** and **Tailwind CSS** for UI and theming:

- **Ant Design** is used for enterprise-grade React components and runtime theming.
- **Tailwind CSS** provides utility-first classes for rapid custom styling and layout.
- Both systems are integrated for a seamless developer experience. You can use Tailwind classes alongside AntD components.

### Tailwind CSS

Tailwind config is located at `tailwind.config.js`.  
You can customize your color palette and other design tokens there.  
For more information, see [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation).

### Ant Design

Ant Design theming is managed via `ConfigProvider` and supports runtime theme switching.  
See [Ant Design Documentation](https://ant.design/docs/react/introduce) for usage and customization.

> This modular structure helps maintain a scalable and well-organized codebase, separating features, state management, components, and utilities for efficient development.

## Usage

1. Log in with your admin credentials.
2. Monitor real-time order activity and manage users and sessions.
3. Access advanced admin tools from the dashboard.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
