import { children, createEffect } from 'solid-js';

export default function TextScamble(props) {
  const c = children(() => props.children);
  createEffect(() => c().)
  return <>{c()}</>;
}
