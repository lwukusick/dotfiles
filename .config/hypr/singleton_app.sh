#! /bin/bash

declare numApps=0
numApps=$(hyprctl workspaces -j | jq "map(select(.name == \"$1\"))[].windows")

if [[ $numApps -lt 1 ]]; then
	hyprctl --batch "dispatch workspace name:$1; dispatch exec $1"
else 
	hyprctl "dispatch workspace name:$1"
fi
