# nxt-create-page

A CLI tool to quickly create Next.js pages with a standardized structure.

## Installation

You can install this package globally using npm:

```bash
npm install -g nxt-create-page
```

For local installation:
```bash
npm install nxt-create-page
```

## Usage

```bash
nxt create page [options] [component-name]
```
shorthand 

```bash
nxt c p [options] [component-name]
```

# Example 

```bash
nxt create page
```

```bash
nxt c p -y mypage
```


# Features

- Interactively creates Next.js pages
- Supports both JavaScript (.jsx) and TypeScript (.tsx)
- Option to create pages in the src directory or root
- Automatically capitalizes the component name
- Creates a basic component structure

# Options
When you run the command, you'll be prompted to:

1. Specify whether you're using a src folder
2. Choose between JavaScript and TypeScript
3. Enter the name of your new component
