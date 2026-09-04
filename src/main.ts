import './styles/tokens.css';
import './styles/base.css';
import './styles/planner.css';
import './styles/runner.css';

import { detectLocale, setLocale } from './i18n';
import { loadLocale, loadState } from './core/storage';
import { createApp } from './ui/app';

const locale = loadLocale(detectLocale());
setLocale(locale);
createApp(loadState()).render();
