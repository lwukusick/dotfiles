import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import GLib from 'gi://GLib';

const clockLabel = ({
    format, 
    interval = 1000,
    ...props
} = {}) => Widget.Label({
    className: 'clock-label',
    ...props,
    connections: [[interval, label => 
        label.label = GLib.DateTime.new_now_local().format(format),
    ]]
})

const dateLabel = ({ interval = 1000 } = {}) => Widget.Label({
    className: 'date-label',
    connections: [[interval, label => {
        const now = GLib.DateTime.new_now_local();
        const day = now.format("\%e").trim();
        label.label = now.format("%A, %B ") + day
    }]]
})

const clock = Widget.Box({
    halign: 'center',
    children: [
        clockLabel({ format: "%H" }),
        Widget.Label({
            className: 'clock-colon',
            label: ':',
        }),
        clockLabel({ format: "%M" }),
    ]    
});

export default Widget.Box({
    vertical: true,
    children: [
        clock,
        dateLabel({ justification: "right" }),
    ]
});

