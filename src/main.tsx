import { render } from 'preact';
import '@/styles/index.css';
import { App } from '@/ui/App';
import { boot, registerUpdates } from '@/app/wiring';
import { installDebugHook } from '@/app/debug';

const root = document.getElementById('app');
if (root) render(<App />, root);

installDebugHook();
void boot();
void registerUpdates();
