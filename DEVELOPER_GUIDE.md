# HitPaw AI Tools - Developer Guide

## Core Tech Stack
- **Framework**: Nuxt 3 (SSR enabled)
- **Styling**: Tailwind CSS
- **Runtime**: Node.js
- **State Management**: Pinia
- **Components**: Functional, modular Vue components using Composition API (`<script setup>`).

## Coding Standards
1. **Model Preference**: All complex logic and code generation should be optimized for **OpenAI Codex/GPT-4o** compatibility.
2. **Directory Structure**:
   - `components/nexus/`: All Nexus-related UI components.
   - `composables/`: Logic for context detection and workspace launching.
   - `server/api/nexus/`: Nitro server routes.
3. **Type Safety**: Use TypeScript for all composables and API definitions.
4. **Git Flow**:
   - Always work on feature branches (e.g., `feat/nexus-init`).
   - Atomic commits with clear descriptions.

## Brand Alignment
- Ensure all UI matches the [hitpaw.ai](https://www.hitpaw.ai/) visual identity.
- Use HitPaw brand colors and glassmorphic design elements.
