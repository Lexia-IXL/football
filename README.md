# College Football Dynasty — starter foundation

A browser-based 3D college-football dynasty starter. This repository currently includes:
- Three.js 3D practice field and player-follow camera
- Keyboard movement (WASD / arrow keys), sprint and dive controls
- Express web server and health endpoint
- Socket.IO season-code room foundation
- Render deployment blueprint
- Supabase SQL starter schema

This is **Milestone 1**, not the finished football game. Recruiting, real player data, accounts, saved franchises, full rules, AI opponents, passing/catching/tackling, and authoritative multiplayer gameplay are later milestones.

## Run locally
1. Install Node.js 20 or newer.
2. Open this folder in a terminal.
3. Run `npm install`.
4. Run `npm start`.
5. Visit `http://localhost:3000`.

## Publish with GitHub + Render
1. Create a GitHub repository named `college-football-dynasty`.
2. Upload the contents of this folder to the repository root (not the ZIP file).
3. In Render, choose **New + → Web Service** and connect the repository.
4. Render detects `render.yaml`; use `npm install` as the build command and `npm start` as the start command if asked.
5. Deploy. The health endpoint is `/api/health`.

## Supabase (next milestone)
Create a Supabase project, then run `supabase/schema.sql` in its SQL Editor. Do not put a service-role key in browser code or commit secrets to GitHub. Authentication providers need to be enabled in Supabase settings and OAuth redirect URLs configured for the deployed domain.

## Controls
- W / A / S / D or arrow keys: move the controlled practice player
- Shift: sprint
- Space: dive (practice animation)
- Mouse: rotate camera by dragging
- Mouse wheel: zoom

The current field is a movement prototype. It does not yet implement a real snap, ball possession, football rules, or collision-based tackling.
