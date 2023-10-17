import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import DesktopClock from './DesktopClock.js';
import SystemTemps from './SystemTemps.js';

export default Widget.Window({
    name: 'infobar',
    anchor: ["bottom", "left", "right"],
    exclusive: true,
    layer: "bottom",
    monitor: 1,
    child: Widget.Box({
        children: [
            Widget.Box({ 
                hexpand: true,
                children: [SystemTemps],
            }),
            DesktopClock,
        ] 
    })
})