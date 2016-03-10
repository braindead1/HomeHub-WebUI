<?php

// Mit dem folgenden Link kann die Tankstellen ID ermittelt werden. Es müssen LAT, LONG und der eigene APIKEY eingetragen werden
// https://creativecommons.tankerkoenig.de/json/list.php?lat=LAT&lng=LONG&rad=3&type=diesel&apikey=APIKEY&sort=price
// 
// Mit dem folgenden Link werden die Spritpreise abgefragt. Es müssen TANKSTELLEN_ID und APIKEY eingetragen werden
// https://creativecommons.tankerkoenig.de/json/detail.php?id=TANKSTELLEN_ID&apikey=APIKEY

function Tankerkoenig($component) {
    $json = file_get_contents('https://creativecommons.tankerkoenig.de/json/detail.php?id=' . $component['station_id'] . '&apikey=' . $component['api_key']);
    $data = json_decode($json, true);
    
    if(isset($data['status']) && $data['status'] == 'ok') {
        if($data['station']['isOpen'] == '1') {
            return '<div class="hh">'
                . '<div class="pull-left"><img src="../assets/icons/' . $component["icon"] . '" class="icon">' . $component["name"] . '</div>'
                . '<div class="pull-right">'
                    . '<span class="info">E5: ' . $data['station']['e5'] . ' Euro</span>'
                    . '<span class="info">E10: ' . $data['station']['e10'] . ' Euro</span>'
                    . '<span class="info">Diesel: ' . $data['station']['diesel'] . ' Euro</span>'
                . '</div>'
                . '<div class="clearfix"></div>'
            . '</div>';
        } else {
            return '<div class="hh">'
                . '<div class="pull-left"><img src="../assets/icons/' . $component["icon"] . '" class="icon">' . $component["name"] . '</div>'
                . '<div class="pull-right">geschlossen</div>'
                . '<div class="clearfix"></div>'
            . '</div>';
        }
    } else {
        return '<div class="hh">'
                . '<div class="pull-left"><img src="../assets/icons/' . $component["icon"] . '" class="icon">' . $component["name"] . '</div>'
                . '<div class="pull-right">FEHLER</div>'
                . '<div class="clearfix"></div>'
            . '</div>';
    }
}
