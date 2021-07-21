#!/bin/sh
xrandr --output HDMI-A-0 --mode 1440x900 --pos 1366x0 --rotate normal --output eDP --mode 1366x768 --pos 0x66 --rotate normal --output DisplayPort-0 --off &
nitrogen --restore &
qtile cmd-obj -o cmd -f restart &
sh ~/.config/polybar/material/launch.sh &
