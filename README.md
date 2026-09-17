# CodeRoom

CodeRoom is a real-time collaborative coding platform where developers can create coding rooms, write and execute code together, communicate through video and voice, and work with GitHub repositories from a shared workspace.

**Live Application:** [https://code-room-client.vercel.app/](https://code-room-client.vercel.app/)

---

## Features

- Real-time collaborative code editing
- Live cursor sharing and participant activity
- Code execution with custom stdin
- Shared execution output
- Live web preview
- Collaborative notepad
- Video and voice communication
- GitHub authentication and repository integration
- Save and commit code to GitHub
- Isolated coding rooms for multiple users

---

## Tech Stack

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS
- Yjs
- Socket.IO Client

**Backend**
- Node.js
- TypeScript
- Socket.IO
- uWebSockets.js

**Other**
- Judge0 CE for code execution
- GitHub OAuth & REST API
- pnpm monorepo
- Vercel & Render

---

## Architecture

```text
┌──────────────────────┐
│     Next.js Client   │
│  Editor / Workspace  │
└──────────┬───────────┘
           │
      WebSocket / HTTP
           │
           ▼
┌──────────────────────┐
│    Node.js Server    │
│  Socket.IO + uWS     │
└───────┬────────┬─────┘
        │        │
        ▼        ▼
   ┌────────┐ ┌───────────┐
   │ Judge0 │ │  GitHub   │
   │   CE   │ │    API    │
   └────────┘ └───────────┘
```

Yjs handles collaborative document synchronization, while Socket.IO manages real-time communication between connected users.

---

## Code Execution

CodeRoom sends source code, language selection, stdin, and command-line arguments to Judge0 CE and displays the resulting output inside the workspace.

Currently supported:
- Python
- JavaScript
- Java
- C++

---

## GitHub Integration

Users can authenticate with GitHub and work with their repositories directly from CodeRoom.

The integration supports repository access, working with project files, and committing changes back to GitHub.

---

## Project Structure

```text
CodeRoom/
├── apps/
│   ├── client/          # Next.js frontend
│   └── server/          # Socket.IO backend
├── packages/
│   └── types/           # Shared TypeScript types
├── scripts/
├── .github/
├── .husky/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

---

---

---

## Project Highlights

- Real-time multi-user collaboration using Yjs and Socket.IO
- Remote code execution with Judge0 CE
- GitHub OAuth and repository operations
- Production WebSocket deployment with Vercel and Render
- TypeScript-based pnpm monorepo architecture
