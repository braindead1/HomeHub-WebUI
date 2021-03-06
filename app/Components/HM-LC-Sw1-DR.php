<?php

// HM-LC-Sw1-DR|Licht Wintergarten EG:0||VISIBLE=|OPERATE=|UNREACH=21369|STICKY_UNREACH=21365|CONFIG_PENDING=21347|LOWBAT=21359|DUTYCYCLE=21355|RSSI_DEVICE=21363|RSSI_PEER=21364|
// HM-LC-Sw1-DR|Licht Wintergarten EG:1||VISIBLE=true|OPERATE=true|STATE=21381|

function HM_LC_Sw1_DR($component) {
    if ($component['parent_device_interface'] == 'BidCos-RF' && $component['visible'] == 'true' && isset($component['STATE'])) {
        return '<div class="hh">'
            . '<div class="pull-left"><img src="../assets/icons/' . $component["icon"] . '" class="icon">' . $component['name'] . '</div>'
            . '<div class="pull-right">'
                . '<span class="info" data-id="' . ($component['STATE']-22) . '" data-component="' . $component['component'] . '" data-datapoint="LOWBAT"></span>'
                . '<span class="info set" data-id="' . $component['STATE'] . '" data-component="' . $component['component'] . '" data-datapoint="STATE" data-set-id="' . $component['STATE'] . '" data-set-value=""></span>'
            . '</div>'
            . '<div class="clearfix"></div>'
        . '</div>';
    }
}
