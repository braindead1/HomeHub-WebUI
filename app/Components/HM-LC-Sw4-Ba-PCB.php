<?php

// HM-LC-Sw4-Ba-PCB|Lautsprecher:0||VISIBLE=|OPERATE=|UNREACH=22362|STICKY_UNREACH=22358|CONFIG_PENDING=22340|LOWBAT=22352|DUTYCYCLE=22348|RSSI_DEVICE=22356|RSSI_PEER=22357|DEVICE_IN_BOOTLOADER=22344|UPDATE_PENDING=22366|
// HM-LC-Sw4-Ba-PCB|Lautsprecher Wohnbereich|1|VISIBLE=true|OPERATE=true|STATE=22374|
// HM-LC-Sw4-Ba-PCB|Lautsprecher Terrasse|2|VISIBLE=true|OPERATE=true|STATE=22380|
// HM-LC-Sw4-Ba-PCB|Lautsprecher 3|3|VISIBLE=true|OPERATE=true|STATE=22386|
// HM-LC-Sw4-Ba-PCB|Lautsprecher 4|4|VISIBLE=true|OPERATE=true|STATE=22392|

// Validated by Manu

function HM_LC_Sw4_Ba_PCB($component) {
    if ($component['parent_device_interface'] == 'BidCos-RF' && $component['visible'] == 'true' && isset($component['STATE'])) {
        return '<div class="hh">'
            . '<div class="pull-left"><img src="../assets/icons/' . $component["icon"] . '" class="icon">' . $component['name'] . '</div>'
            . '<div class="pull-right">'
                . '<span class="info" id="' . ($component['STATE']-22) . '" data-component="' . $component['component'] . '" data-datapoint="LOWBAT"></span>'
                . '<span class="info set" id="' . $component['STATE'] . '" data-component="' . $component['component'] . '" data-datapoint="STATE" data-set-id="' . $component['STATE'] . '" data-set-value=""></span>'
            . '</div>'
            . '<div class="clearfix"></div>'
        . '</div>';
    }
}
