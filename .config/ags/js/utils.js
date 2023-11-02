import { App, Utils } from "./imports.js";

export const watchAndCompileSass = () => {
    const scss = App.configDir + '/scss/main.scss';
    const css = App.configDir + '/css/main.css';
    
    Utils.subprocess([
        'inotifywait',
        '--recursive',
        '--event', 'create,modify',
        '-m', App.configDir + '/scss',
    ], () => {
        Utils.exec(`sass ${scss} ${css}`);
        App.resetCss();
        App.applyCss(css);
    });
};
