<?php

// HM-Sec-Key|Haustür-Schloss:0|BidCos-RF||0|VISIBLE=|OPERATE=|UNREACH=19224|STICKY_UNREACH=19220|CONFIG_PENDING=19206|LOWBAT=19214|DUTYCYCLE=19210|RSSI_DEVICE=19218|RSSI_PEER=19219|
// HM-Sec-Key|Haustür-Schloss:1|BidCos-RF||1|VISIBLE=true|OPERATE=true|STATE=19241|OPEN=19239|RELOCK_DELAY=19240|STATE_UNCERTAIN=19242|ERROR=19230|

// Validated by firephaser

function HM_Sec_Key($component) {
    if ($component['parent_device_interface'] == 'BidCos-RF' && $component['visible'] == 'true' && isset($component['STATE'])) {
        $modalId = uniqid();
        
        return '<div class="hh">'
            . '<div data-toggle="collapse" data-target="#' . $modalId . '">'
                .'<div class="pull-left"><img src="../assets/icons/' . $component["icon"] . '" class="icon">' . $component['name'] . '</div>'
                . '<div class="pull-right">'
                    . '<span class="info" id="' . ($component['STATE']-27) . '" data-component="' . $component['component'] . '" data-datapoint="LOWBAT"></span>'
                    . '<span class="info" id="' . $component['STATE_UNCERTAIN'] . '" data-component="' . $component['component'] . '" data-datapoint="STATE_UNCERTAIN"></span>'
                    . '<span class="info set" id="' . $component['STATE'] . '" data-component="' . $component['component'] . '" data-datapoint="STATE" data-set-id="' . $component['STATE'] . '" data-set-value=""></span>'
                    . '<span class="set btn-text" id="' . $component['OPEN'] . '" data-component="' . $component['component'] . '" data-datapoint="OPEN" data-set-id="' . $component['OPEN'] . '" data-set-value="1">&Ouml;ffnen</span>'
                . '</div>'
                . '<div class="clearfix"></div>'
            . '</div>'
        . '</div>';
    }
}
