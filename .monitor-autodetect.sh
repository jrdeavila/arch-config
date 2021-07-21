#!/bin/sh

hdmi=`xrandr | grep 'HDMI' | awk '{print $1}'`
laptop=`xrandr | grep 'eDP' | awk '{print $1}'`

screen=$hdmi

function ActiveHDMI {
    sh $HOME/.screenlayout/dual.sh & 
    screen=$hdmi
}

function DeactiveHDMI {
    sh $HOME/.screenlayout/only.sh & 
    screen=$laptop
} 

function HDMIActive {
    [ $screen = $hdmi ]
}

function HDMIConnected {
   ! xrandr | grep 'HDMI' | grep disconnected  
}

while [ true ]
do

    if HDMIActive && ! HDMIConnected
    then
        DeactiveHDMI
    fi
    if ! HDMIActive && HDMIConnected
    then    
        ActiveHDMI
    fi
    sleep 1s
done;
