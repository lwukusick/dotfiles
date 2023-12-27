import { Widget, Utils } from '../imports.js';

export let ShutdownButton = (...props) => Widget.Button({
    ...props,
    class_name: 'shutdown',
    onClicked: () => Utils.execAsync('systemctl poweroff'),
    child: Widget.Icon({ icon: 'system-shutdown-symbolic'}) 
});

export let RestartButton = (...props) => Widget.Button({
    ...props,
    class_name: 'restart',
    onClicked: () => Utils.execAsync('systemctl reboot'),
    child: Widget.Icon({ icon: 'system-reboot-symbolic'}) 
});

export let SuspendButton = (...props) => Widget.Button({
    ...props,
    class_name: 'suspend',
    onClicked: () => Utils.execAsync('systemctl suspend'),
    child: Widget.Icon({ icon: 'weather-clear-night-symbolic'}) 
});
