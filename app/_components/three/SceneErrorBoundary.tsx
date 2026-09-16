"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { failed: boolean };

/**
 * A model that fails to load must not take the page down with it. Suspense covers the
 * wait; this covers a 404, a corrupt .glb or a WebGL context that never comes back.
 * The section then renders as plain copy, which is the whole point of keeping the 3D
 * layer decorative.
 */
export class SceneErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("3D scene failed, section renders without it:", error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
