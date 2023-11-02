import { Widget, App } from './js/imports.js';
import Infobar from './js/infobar/Infobar.js';
import { watchAndCompileSass } from './js/utils.js';

watchAndCompileSass();

export default {
    style: App.configDir + '/css/main.css',
    windows: [
        Infobar,
    ],
	cacheNotificationActions: true,
}
