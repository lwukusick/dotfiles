import { Widget } from '../imports.js';
import GLib from 'gi://GLib';

const clockLabel = ({
    format, 
    interval = 1000,
    ...props
} = {}) => Widget.Label({
    class_name: 'clock-label',
    ...props,
    connections: [[interval, label => 
        label.label = GLib.DateTime.new_now_local().format(format),
    ]],
})

const dateLabel = ({ interval = 1000 } = {}) => Widget.Label({
    class_name: 'date',
    hpack: 'end',
    connections: [[interval, label => {
        const now = GLib.DateTime.new_now_local();
        const day = now.format("\%e").trim();
        label.label = now.format("%A, %B ") + day
    }]],
})

const clock = Widget.Box({
    hpack: 'center',
    class_name: 'clock',
    children: [
        clockLabel({ format: "%H" }),
        Widget.Label({
            class_name: 'clock-colon',
            label: ':',
        }),
        clockLabel({ format: "%M" }),
    ],
});

export default Widget.Box({
    vertical: true,
    class_name: 'datetime',
    children: [
        Widget.Box({ class_name: 'clock-box', children: [clock] }),
        dateLabel({ justification: "right" }),
    ],
});

