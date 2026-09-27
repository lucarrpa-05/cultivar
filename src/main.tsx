import { render } from 'preact';
import '@/styles/index.css';
import { App } from '@/ui/App';
import { boot, registerUpdates } from '@/app/wiring';
import { installDebugHook } from '@/app/debug';
import { installKeys } from '@/app/keys';

const root = document.getElementById('app');
if (root) render(<App />, root);

installDebugHook();
installKeys();
void boot();
void registerUpdates();
