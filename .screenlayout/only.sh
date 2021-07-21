#!/bin/sh
xrandr --output HDMI-A-0 --off --output eDP --mode 1366x768 --pos 0x0 --rotate normal --output DisplayPort-0 --off
qtile cmd-obj -o cmd -f restart &
nitrogen --restore &
sh ~/.config/polybar/material/launch.sh &
