import { Widget, Hyprland, Utils } from '../imports.js';

if (!Hyprland) {
    print("No hyprland reference")
}

function workspaceButton(workspace, defaultChild) {
    return Widget.Button({
        onClicked: () => Utils.execAsync(`hyprctl dispatch workspace ${workspace.name}`).catch(print),
        child: defaultChild(workspace),
        connections: [[Hyprland, btn => {
            const { workspaces, active } = Hyprland;
            btn.toggleClassName('active', active.workspace.id === workspace.id);
        }]],
    })
};

export default ({
    defaultChild = (workspace) => Widget.Label({ label: workspace.name }),
    monitor,
    ...props
}) => Widget.Box({
    ...props,
    className: 'workspaces',
    connections: [[Hyprland, box => {
        let workspaces = Array.from(Hyprland.workspaces.values()).filter(w => {
            if (!monitor) return true;
            return w.monitor === monitor;
        }).sort((a, b) => a.id - b.id);
        box.children.forEach(ch => box.remove(ch));
        workspaces.forEach(w => {
            box.add(workspaceButton(w, defaultChild));
        });
        box.show_all();
    }]],
});
