import { Widget, Hyprland, Utils } from '../imports.js';

if (!Hyprland) {
    print("No hyprland reference")
}

function workspaceButton(workspace, defaultChild) {
    return Widget.Button({
        onClicked: () => Utils.execAsync(`hyprctl dispatch workspace ${workspace.name}`).catch(print),
        child: defaultChild(workspace),
        connections: [
        [Hyprland.active.workspace, btn => {
            const { active } = Hyprland;
            btn.toggleClassName('active', active.workspace.id === workspace.id);
        }],
        [Hyprland, btn => {
            const { monitors } = Hyprland;
            const isActive = (monitor) => monitor.activeWorkspace.id === workspace.id;
            btn.toggleClassName('monitor-active', monitors.some(isActive));
        }]],
    })
};

let workspaceButtons = [];

export default ({
    defaultChild = (workspace) => Widget.Label({ label: workspace.name }),
    monitor,
    ...props
}) => Widget.Box({
    ...props,
    class_name: 'workspaces',
    connections: [
        [Hyprland, box => {
            let newWorkspaces = Array.from(Hyprland.workspaces.values()).filter( w => {
                if (monitor && w.monitor !== monitor) return false;
                return !workspaceButtons.find(button => button.name === w.name);
            });
            newWorkspaces.forEach((w) => {
                workspaceButtons.push({ name: w.name, button: workspaceButton(w, defaultChild) });
            });
            workspaceButtons.sort((a, b) => a.name - b.name);
            // TODO: Figure out warning about adding button to box it already belongs to
            box.children = workspaceButtons.map((w) => w.button);
            box.show_all();
        }, "workspace-added"],
        [Hyprland, (box, workspaceName) => {
            workspaceButtons = workspaceButtons.filter((w) => w.name != workspaceName);
            box.children = workspaceButtons.map((w) => w.button);
        }, "workspace-removed"]
    ],
});
