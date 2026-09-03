import './styles/tokens.css';
import './styles/base.css';
import './styles/planner.css';
import './styles/runner.css';

import { detectLocale, setLocale } from './i18n';
import { loadState } from './core/storage';
import { createApp } from './ui/app';

const state = loadState(detectLocale());
setLocale(state.config.locale);
createApp(state).render();
