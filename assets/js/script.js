$(document).ready(function () {
    updateDatapoints();

    $('.set').click(function () {
        var id = $(this).attr('data-set-id');
        var value = $(this).attr('data-set-value');
        var datapoint = $(this).attr('data-datapoint');

        if (datapoint == '4' || datapoint == '20') {
            value = $('[name="' + id + '"]').val();
        }

        setDatapoint(id, value);
    });

    $('.run').click(function () {
        var id = $(this).attr('data-run-id');

        runProgram(id);
    });
});

var updateDatapoints = function () {
    //192.168.2.6/config/xmlapi/state.cgi?datapoint_id=

    var id = '';

    $('.info').each(function () {
        if (id === '') {
            id = $(this).attr('id');
        } else {
            id = id + ',' + $(this).attr('id');
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://' + homematicIp + '/config/xmlapi/state.cgi?datapoint_id=' + id,
        dataType: 'xml',
        success: function (xml) {
            $('#flash-error').hide();

            $(xml).find('datapoint').each(function (index) {
                var ise_id = $(this).attr('ise_id');
                var value = $(this).attr('value');

                var component = $('#' + ise_id).attr('data-component');
                var datapoint = $('#' + ise_id).attr('data-datapoint');
                var unit = $('#' + ise_id).attr('data-unit');
                var valueList = $('#' + ise_id).attr('data-valuelist');

                if (!unit) {
                    unit = '';
                }
                if (!valueList) {
                    valueList = '';
                }

                switch (component) {
                    case 'CUX2801':
                        switch (datapoint) {
                            case 'BLIND_LEVEL':
                                value = (Math.round(value * 1000) / 10);

                                if (value === 100) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_window_2w.png" />');
                                } else if (value >= 90) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_10.png" />');
                                } else if (value >= 80) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_20.png" />');
                                } else if (value >= 70) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_30.png" />');
                                } else if (value >= 60) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_40.png" />');
                                } else if (value >= 50) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_50.png" />');
                                } else if (value >= 40) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_60.png" />');
                                } else if (value >= 30) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_70.png" />');
                                } else if (value >= 20) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_80.png" />');
                                } else if (value > 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_90.png" />');
                                } else if (value === 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_100.png" />');
                                }
                                break;
                            case 'DIMMER_LEVEL':
                                value = (Math.round(value * 1000) / 10);

                                if (value === 100) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_100.png" />');
                                } else if (value >= 90) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_90.png" />');
                                } else if (value >= 80) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_80.png" />');
                                } else if (value >= 70) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_70.png" />');
                                } else if (value >= 60) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_60.png" />');
                                } else if (value >= 50) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_50.png" />');
                                } else if (value >= 40) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_40.png" />');
                                } else if (value >= 30) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_30.png" />');
                                } else if (value >= 20) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_20.png" />');
                                } else if (value > 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_10.png" />');
                                } else if (value === 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_00.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'CUX2803':
                        switch (datapoint) {
                            case 'INFO':
                                $('#' + ise_id).html(value);
                                break;
                            case 'IP':
                                $('#' + ise_id).html(value);
                                break;
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('online');
                                } else {
                                    $('#' + ise_id).html('offline');
                                }
                                break;
                            case 'UNREACH_CTR':
                                $('#' + ise_id).html(value);
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'CUX4000':
                        switch (datapoint) {
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'CUX9002':
                        switch (datapoint) {
                            case 'ABS_HUMIDITY':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '%');
                                break;
                            case 'DEW_POINT':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            case 'HUM_MAX_24H':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '%');
                                break;
                            case 'HUM_MIN_24H':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '%');
                                break;
                            case 'HUMIDITY':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '%');
                                break;
                            case 'TEMP_MAX_24H':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            case 'TEMP_MIN_24H':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            case 'TEMPERATURE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-CC-RT-DN':
                        switch (datapoint) {
                            case 'ACTUAL_TEMPERATURE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            case 'BATTERY_STATE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + 'V');
                                break;
                            case 'CONTROL_MODE':
                                switch (value) {
                                    case '0':
                                        // AUTO_MODE
                                        $('#' + ise_id).html('<img src="../assets/icons/time_automatic.png" />');
                                        break;
                                    case '1':
                                        // MANU_MODE
                                        $('#' + ise_id).html('<img src="../assets/icons/time_manual_mode.png" />');
                                        break;
                                    case '2':
                                        // PARTY_MODE
                                        $('#' + ise_id).html('<img src="../assets/icons/scene_party.png" />');
                                        break;
                                    default:
                                        // BOOST_MODE
                                        $('#' + ise_id).html('<img src="../assets/icons/text_max.png" />');
                                }
                                break;
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'SET_TEMPERATURE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            case 'VALVE_STATE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '%');
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-CC-SCD':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                switch (value) {
                                    case '0':
                                        $('#' + ise_id).html('Normal');
                                        break;
                                    case '1':
                                        $('#' + ise_id).html('Leicht erh&ouml;ht');
                                        break;
                                    case '2':
                                        $('#' + ise_id).html('Stark erh&ouml;ht');
                                        break;
                                    default:
                                        $('#' + ise_id).html(value);
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-CC-TC':
                        switch (datapoint) {
                            case 'HUMIDITY':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '%');
                                break;
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'SETPOINT':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            case 'TEMPERATURE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-CC-VD':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'VALVE_STATE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '%');
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Dis-TD-T':
                        switch (datapoint) {
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Dis-WM55':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-ES-PMSw1-Pl':
                        switch (datapoint) {
                            case 'CONTROL_MODE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            case 'CURRENT':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + 'mA');
                                break;
                            case 'ENERGY_COUNTER':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + 'Wh');
                                break;
                            case 'FREQUENCY':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + 'Hz');
                                break;
                            case 'STATE':
                                $('#' + ise_id).html(value);
                                break;
                            case 'POWER':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + 'W');
                                break;
                            case 'VOLTAGE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + 'V');
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-ES-TX-WM':
                        switch (datapoint) {
                            case 'ENERGY_COUNTER':
                                value = Math.round(value * 10) / 10;

                                if (value > 0) {
                                    $('#' + ise_id).html(value + 'Wh');
                                }
                                break;
                            case 'GAS_ENERGY_COUNTER':
                                value = Math.round(value * 10) / 10;

                                if (value > 0) {
                                    $('#' + ise_id).html((Math.round(value * 10) / 10) + 'm³');
                                }
                                break;
                            case 'GAS_POWER':
                                value = Math.round(value * 10) / 10;

                                if (value > 0) {
                                    $('#' + ise_id).html((Math.round(value * 10) / 10) + 'm³');
                                }
                                break;
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'POWER':
                                value = Math.round(value * 10) / 10;

                                if (value > 0) {
                                    $('#' + ise_id).html((Math.round(value * 10) / 10) + 'W');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Bl1-FM':
                        switch (datapoint) {
                            case 'LEVEL':
                                value = (Math.round(value * 1000) / 10);

                                if (value === 100) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_window_2w.png" />');
                                } else if (value >= 90) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_10.png" />');
                                } else if (value >= 80) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_20.png" />');
                                } else if (value >= 70) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_30.png" />');
                                } else if (value >= 60) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_40.png" />');
                                } else if (value >= 50) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_50.png" />');
                                } else if (value >= 40) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_60.png" />');
                                } else if (value >= 30) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_70.png" />');
                                } else if (value >= 20) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_80.png" />');
                                } else if (value > 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_90.png" />');
                                } else if (value === 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_100.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value + '%');
                        }
                        break;
                    case 'HM-LC-Bl1-SM':
                        switch (datapoint) {
                            case 'LEVEL':
                                value = (Math.round(value * 1000) / 10);

                                if (value === 100) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_window_2w.png" />');
                                } else if (value >= 90) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_10.png" />');
                                } else if (value >= 80) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_20.png" />');
                                } else if (value >= 70) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_30.png" />');
                                } else if (value >= 60) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_40.png" />');
                                } else if (value >= 50) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_50.png" />');
                                } else if (value >= 40) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_60.png" />');
                                } else if (value >= 30) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_70.png" />');
                                } else if (value >= 20) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_80.png" />');
                                } else if (value > 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_90.png" />');
                                } else if (value === 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_100.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value + '%');
                        }
                        break;
                    case 'HM-LC-Bl1PBU-FM':
                        switch (datapoint) {
                            case 'LEVEL':
                                value = (Math.round(value * 1000) / 10);

                                if (value === 100) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_window_2w.png" />');
                                } else if (value >= 90) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_10.png" />');
                                } else if (value >= 80) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_20.png" />');
                                } else if (value >= 70) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_30.png" />');
                                } else if (value >= 60) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_40.png" />');
                                } else if (value >= 50) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_50.png" />');
                                } else if (value >= 40) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_60.png" />');
                                } else if (value >= 30) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_70.png" />');
                                } else if (value >= 20) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_80.png" />');
                                } else if (value > 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_90.png" />');
                                } else if (value === 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_100.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Dim1PWM-CV':
                        switch (datapoint) {
                            case 'LEVEL':
                                value = (Math.round(value * 1000) / 10);

                                if (value === 100) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_100.png" />');
                                } else if (value >= 90) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_90.png" />');
                                } else if (value >= 80) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_80.png" />');
                                } else if (value >= 70) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_70.png" />');
                                } else if (value >= 60) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_60.png" />');
                                } else if (value >= 50) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_50.png" />');
                                } else if (value >= 40) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_40.png" />');
                                } else if (value >= 30) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_30.png" />');
                                } else if (value >= 20) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_20.png" />');
                                } else if (value > 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_10.png" />');
                                } else if (value === 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_00.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Dim1T-CV':
                        switch (datapoint) {
                            case 'LEVEL':
                                value = (Math.round(value * 1000) / 10);

                                if (value === 100) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_100.png" />');
                                } else if (value >= 90) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_90.png" />');
                                } else if (value >= 80) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_80.png" />');
                                } else if (value >= 70) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_70.png" />');
                                } else if (value >= 60) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_60.png" />');
                                } else if (value >= 50) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_50.png" />');
                                } else if (value >= 40) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_40.png" />');
                                } else if (value >= 30) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_30.png" />');
                                } else if (value >= 20) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_20.png" />');
                                } else if (value > 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_10.png" />');
                                } else if (value === 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_00.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Dim1T-FM':
                        switch (datapoint) {
                            case 'LEVEL':
                                value = (Math.round(value * 1000) / 10);

                                if (value === 100) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_100.png" />');
                                } else if (value >= 90) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_90.png" />');
                                } else if (value >= 80) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_80.png" />');
                                } else if (value >= 70) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_70.png" />');
                                } else if (value >= 60) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_60.png" />');
                                } else if (value >= 50) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_50.png" />');
                                } else if (value >= 40) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_40.png" />');
                                } else if (value >= 30) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_30.png" />');
                                } else if (value >= 20) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_20.png" />');
                                } else if (value > 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_10.png" />');
                                } else if (value === 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_00.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Dim1T-Pl':
                        switch (datapoint) {
                            case 'LEVEL':
                                value = (Math.round(value * 1000) / 10);

                                if (value === 100) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_100.png" />');
                                } else if (value >= 90) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_90.png" />');
                                } else if (value >= 80) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_80.png" />');
                                } else if (value >= 70) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_70.png" />');
                                } else if (value >= 60) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_60.png" />');
                                } else if (value >= 50) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_50.png" />');
                                } else if (value >= 40) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_40.png" />');
                                } else if (value >= 30) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_30.png" />');
                                } else if (value >= 20) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_20.png" />');
                                } else if (value > 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_10.png" />');
                                } else if (value === 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_00.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Dim1TPBU-FM':
                        switch (datapoint) {
                            case 'LEVEL':
                                value = (Math.round(value * 1000) / 10);

                                if (value === 100) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_100.png" />');
                                } else if (value >= 90) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_90.png" />');
                                } else if (value >= 80) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_80.png" />');
                                } else if (value >= 70) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_70.png" />');
                                } else if (value >= 60) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_60.png" />');
                                } else if (value >= 50) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_50.png" />');
                                } else if (value >= 40) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_40.png" />');
                                } else if (value >= 30) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_30.png" />');
                                } else if (value >= 20) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_20.png" />');
                                } else if (value > 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_10.png" />');
                                } else if (value === 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_00.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-RGBW-WM':
                        switch (datapoint) {
                            case 'COLOR':
                                $('#' + ise_id).html(value);
                                break;
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'LEVEL':
                                value = (Math.round(value * 1000) / 10);

                                if (value === 100) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_100.png" />');
                                } else if (value >= 90) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_90.png" />');
                                } else if (value >= 80) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_80.png" />');
                                } else if (value >= 70) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_70.png" />');
                                } else if (value >= 60) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_60.png" />');
                                } else if (value >= 50) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_50.png" />');
                                } else if (value >= 40) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_40.png" />');
                                } else if (value >= 30) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_30.png" />');
                                } else if (value >= 20) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_20.png" />');
                                } else if (value > 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_10.png" />');
                                } else if (value === 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/light_light_dim_00.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Sw1-Ba-PCB':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Sw1-FM':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Sw1-PB-FM':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Sw1-Pl-2':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Sw1-Pl-CT-R1':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Sw1-Pl-DN-R1':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Sw1-Pl':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Sw1-SM':
                        switch (datapoint) {
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Sw1PBU-FM':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Sw2-FM':
                        switch (datapoint) {
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Sw4-Ba-PCB':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Sw4-DR':
                        switch (datapoint) {
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Sw4-PCB':
                        switch (datapoint) {
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Sw4-SM':
                        switch (datapoint) {
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-LC-Sw4-WM':
                        switch (datapoint) {
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-MOD-EM-8':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-MOD-Re-8':
                        switch (datapoint) {
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-OU-CFM-Pl':
                        switch (datapoint) {
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-OU-CM-PCB':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-OU-LED16':
                        switch (datapoint) {
                            case 'LED_STATUS':
                                switch (value) {
                                    case '0':
                                        $('#' + ise_id).html('Aus');
                                        break;
                                    case '1':
                                        $('#' + ise_id).html('Rot');
                                        break;
                                    case '2':
                                        $('#' + ise_id).html('Gr&uuml;n');
                                        break;
                                    default:
                                        $('#' + ise_id).html('Orange');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-PB-2-FM':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-PB-2-WM':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-PB-2-WM55-2':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-PB-2-WM55':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-PB-4-WM':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-PB-4Dis-WM':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-PB-6-WM55':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-PBI-4-FM':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-RC-19-B':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-RC-19-SW':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-RC-19':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-RC-4-2':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-RC-4-B':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-RC-4':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-RC-Dis-H-x-EU':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-RC-Key3-B':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-RC-Key4-2':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-RC-P1':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-RCV-50':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-SCI-3-FM':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Offen');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Zu');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sec-Key':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/secur_open.png" />');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/secur_locked.png" />');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            case 'STATE_UNCERTAIN':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/control_x.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sec-Key-S':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/secur_open.png" />');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/secur_locked.png" />');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            case 'STATE_UNCERTAIN':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/control_x.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sec-MDIR-2':
                        switch (datapoint) {
                            case 'BRIGHTNESS':
                                $('#' + ise_id).html(value);
                                break;
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'MOTION':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/user_available.png" />');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/user_n_a.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sec-MDIR':
                        switch (datapoint) {
                            case 'BRIGHTNESS':
                                $('#' + ise_id).html(value);
                                break;
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'MOTION':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/user_available.png" />');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/user_n_a.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sec-RHS':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                switch (value) {
                                    case '0':
                                        $('#' + ise_id).html('<img src="../assets/icons/fts_window_1w.png" />');
                                        break;
                                    case '1':
                                        $('#' + ise_id).html('<img src="../assets/icons/fts_window_1w_tilt.png" />');
                                        break;
                                    case '2':
                                        $('#' + ise_id).html('<img src="../assets/icons/fts_window_1w_open.png" />');
                                        break;
                                    default:
                                        $('#' + ise_id).html(value);
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sec-SC-2':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'false') {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_window_1w.png" />');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_window_1w_open.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sec-SC':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'false') {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_window_1w.png" />');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_window_1w_open.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sec-SCo':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'false') {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_window_1w.png" />');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_window_1w_open.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sec-SD-Team':
                        switch (datapoint) {
                            case 'STATE':
                                if (value === 'false') {
                                    $('#' + ise_id).html('<img src="../assets/icons/control_clear.png" />');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/message_attention.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sec-SFA-SM':
                        switch (datapoint) {
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sec-TiS':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                if (value === 'false') {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_garage_door_100.png" />');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_garage.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sec-WDS':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                switch (value) {
                                    case '0':
                                        $('#' + ise_id).html('Trocken');
                                        break;
                                    case '1':
                                        $('#' + ise_id).html('Feucht');
                                        break;
                                    case '2':
                                        $('#' + ise_id).html('Nass');
                                        break;
                                    default:
                                        $('#' + ise_id).html(value);
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sec-WDS-2':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'STATE':
                                switch (value) {
                                    case '0':
                                        $('#' + ise_id).html('Trocken');
                                        break;
                                    case '1':
                                        $('#' + ise_id).html('Feucht');
                                        break;
                                    case '2':
                                        $('#' + ise_id).html('Nass');
                                        break;
                                    default:
                                        $('#' + ise_id).html(value);
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sec-Win':
                        switch (datapoint) {
                            case 'BATTERY_LEVEL':
                                value = (Math.round(value * 1000) / 10);

                                if (value === 100) {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_100.png" />');
                                } else if (value >= 75) {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_75.png" />');
                                } else if (value >= 50) {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_50.png" />');
                                } else if (value >= 25) {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                } else if (value >= 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_0.png" />');
                                }
                                break
                            case 'LEVEL':
                                if (value === '-0.005000') {
                                    $('#' + ise_id).html('<img src="../assets/icons/secur_locked.png" />');
                                } else {
                                    $('#' + ise_id).html((Math.round(value * 1000) / 10) + '%');
                                }
                                break;
                            case 'STATE_UNCERTAIN':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/control_x.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sen-DB-PCB':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sen-EP':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-Sen-MDIR-O-2':
                        switch (datapoint) {
                            case 'BRIGHTNESS':
                                $('#' + ise_id).html(value);
                                break;
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'MOTION':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/user_available.png" />');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/user_n_a.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sen-MDIR-O':
                        switch (datapoint) {
                            case 'BRIGHTNESS':
                                $('#' + ise_id).html(value);
                                break;
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'MOTION':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/user_available.png" />');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/user_n_a.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sen-MDIR-SM':
                        switch (datapoint) {
                            case 'MOTION':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/user_available.png" />');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/user_n_a.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sen-MDIR-WM55':
                        switch (datapoint) {
                            case 'BRIGHTNESS':
                                $('#' + ise_id).html(value);
                                break;
                            case 'MOTION':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/user_available.png" />');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/user_n_a.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sen-RD-O':
                        switch (datapoint) {
                            case 'STATE':
                                if (value === '0') {
                                    $('#' + ise_id).html('<img src="../assets/icons/weather_sun.png" />');
                                } else if (value === '1') {
                                    $('#' + ise_id).html('<img src="../assets/icons/weather_rain.png" />');
                                } else if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-Sen-Wa-Od':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'FILLING_LEVEL':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '%');
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-SwI-3-FM':
                        $('#' + ise_id).html(value);
                        break;
                    case 'HM-TC-IT-WM-W-EU':
                        switch (datapoint) {
                            case 'ACTUAL_HUMIDITY':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '%');
                                break;
                            case 'ACTUAL_TEMPERATURE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            case 'BATTERY_STATE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + 'V');
                                break;
                            case 'CONTROL_MODE':
                                if (value === '0') {
                                    $('#' + ise_id).html('<img src="../assets/icons/time_automatic.png" />');
                                    $('#' + ise_id).attr('data-set-id', parseInt(ise_id) + 3); //MANU_MODE
                                    $('#' + ise_id).attr('data-set-value', '1');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/time_manual_mode.png" />');
                                    $('#' + ise_id).attr('data-set-id', parseInt(ise_id) - 6); //AUTO_MODE
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            case 'SET_TEMPERATURE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            case 'WINDOW_OPEN_REPORTING':
                                if (value === 'false') {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_window_1w.png" />');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_window_1w_open.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-WDC7000':
                        switch (datapoint) {
                            case 'AIR_PRESSURE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + 'hPa');
                                break;
                            case 'HUMIDITY':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '%');
                                break;
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'TEMPERATURE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-WDS10-TH-O':
                        switch (datapoint) {
                            case 'HUMIDITY':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '%');
                                break;
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'TEMPERATURE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-WDS100-C6-O':
                        switch (datapoint) {
                            case 'BRIGHTNESS':
                                $('#' + ise_id).html(value);
                                break;
                            case 'HUMIDITY':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '%');
                                break;
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'RAIN_COUNTER':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + 'mm');
                                break;
                            case 'RAINING':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/weather_rain.png" />');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/weather_sun.png" />');
                                }
                                break;
                            case 'SUNSHINEDURATION':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + 'Min.');
                                break;
                            case 'TEMPERATURE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            case 'WIND_DIRECTION':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;');
                                break;
                            case 'WIND_DIRECTION_RANGE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;');
                                break;
                            case 'WIND_SPEED':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + 'km/h');
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-WDS30-OT2-SM':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'TEMPERATURE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-WDS30-T-O':
                        switch (datapoint) {
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'TEMPERATURE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-WDS40-TH-I-2':
                        switch (datapoint) {
                            case 'HUMIDITY':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '%');
                                break;
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'TEMPERATURE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HM-WDS40-TH-I':
                        switch (datapoint) {
                            case 'HUMIDITY':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '%');
                                break;
                            case 'LOWBAT':
                                if (value === 'true') {
                                    $('#' + ise_id).html('<img src="../assets/icons/measure_battery_25.png" />');
                                }
                                break;
                            case 'TEMPERATURE':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + '&deg;C');
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HMW-IO-12-FM':
                        switch (datapoint) {
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HMW-IO-12-Sw14-DR':
                        switch (datapoint) {
                            case 'FREQUENCY':
                                $('#' + ise_id).html((Math.round(value * 10) / 10) + 'mHz');
                                break;
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            case 'VALUE':
                                $('#' + ise_id).html(Math.round(value * 10) / 10);
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HMW-IO-12-Sw7-DR':
                        switch (datapoint) {
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HMW-IO-4-FM':
                        switch (datapoint) {
                            case 'STATE':
                                if (value === 'true') {
                                    $('#' + ise_id).html('Ein');
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html('Aus');
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HMW-LC-Bl1-DR':
                        switch (datapoint) {
                            case 'LEVEL':
                                value = (Math.round(value * 1000) / 10);

                                if (value === 100) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_window_2w.png" />');
                                } else if (value >= 90) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_10.png" />');
                                } else if (value >= 80) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_20.png" />');
                                } else if (value >= 70) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_30.png" />');
                                } else if (value >= 60) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_40.png" />');
                                } else if (value >= 50) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_50.png" />');
                                } else if (value >= 40) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_60.png" />');
                                } else if (value >= 30) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_70.png" />');
                                } else if (value >= 20) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_80.png" />');
                                } else if (value > 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_90.png" />');
                                } else if (value === 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_100.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'HMW-LC-Dim1L-DR':
                        switch (datapoint) {
                            case 'LEVEL':
                                value = (Math.round(value * 1000) / 10);

                                if (value === 100) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_window_2w.png" />');
                                } else if (value >= 90) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_10.png" />');
                                } else if (value >= 80) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_20.png" />');
                                } else if (value >= 70) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_30.png" />');
                                } else if (value >= 60) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_40.png" />');
                                } else if (value >= 50) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_50.png" />');
                                } else if (value >= 40) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_60.png" />');
                                } else if (value >= 30) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_70.png" />');
                                } else if (value >= 20) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_80.png" />');
                                } else if (value > 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_90.png" />');
                                } else if (value === 0) {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_shutter_100.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value + '%');
                        }
                        break;
                    case 'HMW-Sen-SC-12-DR':
                        switch (datapoint) {
                            case 'SENSOR':
                                if (value === 'false') {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_window_1w.png" />');
                                } else {
                                    $('#' + ise_id).html('<img src="../assets/icons/fts_window_1w_open.png" />');
                                }
                                break;
                            default:
                                $('#' + ise_id).html(value);
                        }
                        break;
                    case 'SysVar':
                        switch (datapoint) {
                            case '2':
                                // Yes/No
                                if (value === 'true') {
                                    $('#' + ise_id).html(valueList.split(';')[parseInt(1)]);
                                    $('#' + ise_id).addClass('btn-true');
                                    $('#' + ise_id).removeClass('btn-false');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '0');
                                } else {
                                    $('#' + ise_id).html(valueList.split(';')[parseInt(0)]);
                                    $('#' + ise_id).addClass('btn-false');
                                    $('#' + ise_id).removeClass('btn-true');
                                    $('#' + ise_id).attr('data-set-id', ise_id);
                                    $('#' + ise_id).attr('data-set-value', '1');
                                }
                                break;
                            case '4':
                                // Number
                                if (unit !== '') {
                                    $('#' + ise_id).html(parseFloat(value) + ' ' + unit);
                                } else {
                                    $('#' + ise_id).html(parseFloat(value));
                                }
                                break;
                            case '16':
                                // Value List
                                if (valueList !== '') {
                                    $('#' + ise_id).html(valueList.split(';')[parseInt(value)]);
                                }
                                break;
                            case '20':
                                // Text
                                if (unit !== '') {
                                    $('#' + ise_id).html(value + ' ' + unit);
                                } else {
                                    $('#' + ise_id).html(value);
                                }
                                break;
                            default:
                                if (unit !== '') {
                                    $('#' + ise_id).html(value + ' ' + unit);
                                } else {
                                    $('#' + ise_id).html(value);
                                }
                        }
                        break;
                    default:
                        $('#' + ise_id).html(value);
                }
            });

            //Run update periodically
            var timer = window.setTimeout(updateDatapoints, timerMiliseconds);
        },
        //other code
        error: function () {
            $('#flash-error').html('Der Update Prozess wurde unterbrochen.').show();

            //Run update periodically
            var timer = window.setTimeout(updateDatapoints, timerMiliseconds);
        }
    });
};

var setDatapoint = function (id, value) {
    $.ajax({
        type: 'GET',
        url: 'http://' + homematicIp + '/config/xmlapi/statechange.cgi?ise_id=' + id + '&new_value=' + escape(value),
        dataType: 'xml',
        success: function (xml) {
            $('#flash-error').hide();

            updateDatapoints();
        },
        //other code
        error: function () {
            $('#flash-error').html('Es gab einen Fehler beim Verarbeiten des Reqeusts.').show();
        }
    });
};

var runProgram = function (id) {
    $.ajax({
        type: 'GET',
        url: 'http://' + homematicIp + '/config/xmlapi/runprogram.cgi?program_id=' + id,
        dataType: 'xml',
        success: function (xml) {
            $('#flash-error').hide();

            updateDatapoints();
        },
        //other code
        error: function () {
            $('#flash-error').html('Es gab einen Fehler beim Verarbeiten des Reqeusts.').show();
        }
    });
};