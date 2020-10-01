System.register(["jquery.flot", "./lib/flot/jquery.flot.gauge", "jquery.flot.time", "jquery.flot.crosshair", "lodash", "jquery", "app/core/utils/kbn", "app/core/config", "app/core/time_series2", "app/plugins/sdk", "./lib/flot/gauge-chart"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var lodash_1, jquery_1, kbn_1, config_1, time_series2_1, sdk_1, GaugeChart, BASE_FONT_SIZE, BlendStatCtrl;
    var __moduleName = context_1 && context_1.id;
    function getColorForValue(data, value) {
        if (!lodash_1.default.isFinite(value)) {
            return null;
        }
        for (var i = data.thresholds.length; i > 0; i--) {
            if (value >= data.thresholds[i - 1]) {
                return data.colorMap[i];
            }
        }
        return lodash_1.default.first(data.colorMap);
    }
    exports_1("getColorForValue", getColorForValue);
    return {
        setters: [
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            },
            function (_4) {
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (time_series2_1_1) {
                time_series2_1 = time_series2_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (GaugeChart_1) {
                GaugeChart = GaugeChart_1;
            }
        ],
        execute: function () {
            BASE_FONT_SIZE = 38;
            BlendStatCtrl = (function (_super) {
                __extends(BlendStatCtrl, _super);
                function BlendStatCtrl($scope, $injector, $sanitize, $location) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.$sanitize = $sanitize;
                    _this.$location = $location;
                    _this.dataType = "timeseries";
                    _this.valueNameOptions = [
                        { value: "min", text: "Min" },
                        { value: "max", text: "Max" },
                        { value: "avg", text: "Average" },
                        { value: "current", text: "Current" },
                        { value: "total", text: "Total" },
                        { value: "name", text: "Name" },
                        { value: "first", text: "First" },
                        { value: "delta", text: "Delta" },
                        { value: "diff", text: "Difference" },
                        { value: "range", text: "Range" },
                        { value: "last_time", text: "Time of last point" },
                    ];
                    _this.blendNameOptions = [
                        { value: "min", text: "Min" },
                        { value: "max", text: "Max" },
                        { value: "avg", text: "Average" },
                        { value: "total", text: "Total" },
                    ];
                    _this.panelDefaults = {
                        links: [],
                        datasource: null,
                        maxDataPoints: 100,
                        interval: null,
                        targets: [{}],
                        cacheTimeout: null,
                        format: "none",
                        prefix: "",
                        postfix: "",
                        nullText: null,
                        valueMaps: [{ value: "null", op: "=", text: "N/A" }],
                        mappingTypes: [
                            { name: "value to text", value: 1 },
                            { name: "range to text", value: 2 },
                        ],
                        rangeMaps: [{ from: "null", to: "null", text: "N/A" }],
                        mappingType: 1,
                        nullPointMode: "connected",
                        valueName: "avg",
                        blendName: "total",
                        prefixFontSize: "50%",
                        valueFontSize: "100%",
                        postfixFontSize: "50%",
                        thresholds: " ",
                        colorBackground: false,
                        colorValue: false,
                        colors: ["#299c46", "rgba(237, 129, 40, 0.89)", "#d44a3a"],
                        sparkline: {
                            show: false,
                            full: false,
                            lineColor: "rgb(31, 120, 193)",
                            fillColor: "rgba(31, 118, 189, 0.18)",
                        },
                        gauge: {
                            show: false,
                            minValue: 0,
                            maxValue: 100,
                            thresholdMarkers: true,
                            thresholdLabels: false,
                        },
                        tableColumn: "",
                    };
                    lodash_1.default.defaults(_this.panel, _this.panelDefaults);
                    _this.events.on("data-received", _this.onDataReceived.bind(_this));
                    _this.events.on("data-error", _this.onDataError.bind(_this));
                    _this.events.on("data-snapshot-load", _this.onDataReceived.bind(_this));
                    _this.events.on("init-edit-mode", _this.onInitEditMode.bind(_this));
                    _this.onSparklineColorChange = _this.onSparklineColorChange.bind(_this);
                    _this.onSparklineFillChange = _this.onSparklineFillChange.bind(_this);
                    var image = new Image(75);
                    image.src =
                        "https://www.softtek.com/images/content/design2015/LogoCompleto-Website-20.png";
                    image.style.transform = "translateY(-35px)";
                    image.id = "logo";
                    var panelContents = document.getElementsByClassName("panel-content");
                    for (var i = 0; i < panelContents.length; i++) {
                        if (document.getElementById("logo")) {
                            document
                                .getElementById("logo")
                                .parentElement.removeChild(document.getElementById("logo"));
                        }
                        panelContents.item(i).style.backgroundColor = "#000";
                        panelContents.item(i).appendChild(image);
                    }
                    return _this;
                }
                BlendStatCtrl.prototype.onInitEditMode = function () {
                    this.fontSizes = [
                        "20%",
                        "30%",
                        "50%",
                        "70%",
                        "80%",
                        "100%",
                        "110%",
                        "120%",
                        "150%",
                        "170%",
                        "200%",
                    ];
                    this.addEditorTab("Options", "public/plugins/farski-blendstat-panel_new/editor.html", 2);
                    this.addEditorTab("Value Mappings", "public/plugins/farski-blendstat-panel_new/mappings.html", 3);
                    this.addEditorTab("Blending", "public/plugins/farski-blendstat-panel_new/blending.html", 4);
                    this.unitFormats = kbn_1.default.getUnitFormats();
                };
                BlendStatCtrl.prototype.setUnitFormat = function (subItem) {
                    this.panel.format = subItem.value;
                    this.refresh();
                };
                BlendStatCtrl.prototype.onDataError = function (err) {
                    this.onDataReceived([]);
                };
                BlendStatCtrl.prototype.onDataReceived = function (dataList) {
                    if (dataList.length > 1) {
                        var timestamps_1 = {};
                        var counts = {};
                        for (var _i = 0, dataList_1 = dataList; _i < dataList_1.length; _i++) {
                            var series = dataList_1[_i];
                            for (var _a = 0, _b = series.datapoints; _a < _b.length; _a++) {
                                var point = _b[_a];
                                if (timestamps_1[point[1]]) {
                                    switch (this.panel.blendName) {
                                        case "min":
                                            if (point[0] < timestamps_1[point[1]]) {
                                                timestamps_1[point[1]] = point[0];
                                            }
                                            break;
                                        case "max":
                                            if (point[0] > timestamps_1[point[1]]) {
                                                timestamps_1[point[1]] = point[0];
                                            }
                                            break;
                                        case "avg":
                                            timestamps_1[point[1]] =
                                                (timestamps_1[point[1]] * counts[point[1]] + point[0]) /
                                                    (counts[point[1]] + 1);
                                            counts[point[1]] += 1;
                                            break;
                                        default:
                                            timestamps_1[point[1]] += point[0];
                                            break;
                                    }
                                }
                                else {
                                    timestamps_1[point[1]] = point[0];
                                    counts[point[1]] = 1;
                                }
                            }
                        }
                        var datapoints = Object.keys(timestamps_1)
                            .sort()
                            .map(function (ts) {
                            return [timestamps_1[ts], ts];
                        });
                        dataList = [{ target: "Blended_Metrics", datapoints: datapoints }];
                    }
                    var data = {
                        scopedVars: lodash_1.default.extend({}, this.panel.scopedVars),
                    };
                    if (dataList.length > 0 && dataList[0].type === "table") {
                        this.dataType = "table";
                        var tableData = dataList.map(this.tableHandler.bind(this));
                        this.setTableValues(tableData, data);
                    }
                    else {
                        this.dataType = "timeseries";
                        this.series = dataList.map(this.seriesHandler.bind(this));
                        this.setValues(data);
                    }
                    this.data = data;
                    this.render();
                };
                BlendStatCtrl.prototype.seriesHandler = function (seriesData) {
                    var series = new time_series2_1.default({
                        datapoints: seriesData.datapoints || [],
                        alias: seriesData.target,
                    });
                    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
                    return series;
                };
                BlendStatCtrl.prototype.tableHandler = function (tableData) {
                    var datapoints = [];
                    var columnNames = {};
                    tableData.columns.forEach(function (column, columnIndex) {
                        columnNames[columnIndex] = column.text;
                    });
                    this.tableColumnOptions = columnNames;
                    if (!lodash_1.default.find(tableData.columns, ["text", this.panel.tableColumn])) {
                        this.setTableColumnToSensibleDefault(tableData);
                    }
                    tableData.rows.forEach(function (row) {
                        var datapoint = {};
                        row.forEach(function (value, columnIndex) {
                            var key = columnNames[columnIndex];
                            datapoint[key] = value;
                        });
                        datapoints.push(datapoint);
                    });
                    return datapoints;
                };
                BlendStatCtrl.prototype.setTableColumnToSensibleDefault = function (tableData) {
                    if (tableData.columns.length === 1) {
                        this.panel.tableColumn = tableData.columns[0].text;
                    }
                    else {
                        this.panel.tableColumn = lodash_1.default.find(tableData.columns, function (col) {
                            return col.type !== "time";
                        }).text;
                    }
                };
                BlendStatCtrl.prototype.setTableValues = function (tableData, data) {
                    if (!tableData || tableData.length === 0) {
                        return;
                    }
                    if (tableData[0].length === 0 ||
                        tableData[0][0][this.panel.tableColumn] === undefined) {
                        return;
                    }
                    var datapoint = tableData[0][0];
                    data.value = datapoint[this.panel.tableColumn];
                    if (lodash_1.default.isString(data.value)) {
                        data.valueFormatted = lodash_1.default.escape(data.value);
                        data.value = 0;
                        data.valueRounded = 0;
                    }
                    else {
                        var decimalInfo = this.getDecimalsForValue(data.value);
                        var formatFunc = kbn_1.default.valueFormats[this.panel.format];
                        data.valueFormatted = formatFunc(datapoint[this.panel.tableColumn], decimalInfo.decimals, decimalInfo.scaledDecimals);
                        data.valueRounded = kbn_1.default.roundValue(data.value, this.panel.decimals || 0);
                    }
                    this.setValueMapping(data);
                };
                BlendStatCtrl.prototype.canModifyText = function () {
                    return !this.panel.gauge.show;
                };
                BlendStatCtrl.prototype.setColoring = function (options) {
                    if (options.background) {
                        this.panel.colorValue = false;
                        this.panel.colors = [
                            "rgba(71, 212, 59, 0.4)",
                            "rgba(245, 150, 40, 0.73)",
                            "rgba(225, 40, 40, 0.59)",
                        ];
                    }
                    else {
                        this.panel.colorBackground = false;
                        this.panel.colors = [
                            "rgba(50, 172, 45, 0.97)",
                            "rgba(237, 129, 40, 0.89)",
                            "rgba(245, 54, 54, 0.9)",
                        ];
                    }
                    this.render();
                };
                BlendStatCtrl.prototype.invertColorOrder = function () {
                    var tmp = this.panel.colors[0];
                    this.panel.colors[0] = this.panel.colors[2];
                    this.panel.colors[2] = tmp;
                    this.render();
                };
                BlendStatCtrl.prototype.onColorChange = function (panelColorIndex) {
                    var _this = this;
                    return function (color) {
                        _this.panel.colors[panelColorIndex] = color;
                        _this.render();
                    };
                };
                BlendStatCtrl.prototype.onSparklineColorChange = function (newColor) {
                    this.panel.sparkline.lineColor = newColor;
                    this.render();
                };
                BlendStatCtrl.prototype.onSparklineFillChange = function (newColor) {
                    this.panel.sparkline.fillColor = newColor;
                    this.render();
                };
                BlendStatCtrl.prototype.getDecimalsForValue = function (value) {
                    if (lodash_1.default.isNumber(this.panel.decimals)) {
                        return { decimals: this.panel.decimals, scaledDecimals: null };
                    }
                    var delta = value / 2;
                    var dec = -Math.floor(Math.log(delta) / Math.LN10);
                    var magn = Math.pow(10, -dec);
                    var norm = delta / magn;
                    var size;
                    if (norm < 1.5) {
                        size = 1;
                    }
                    else if (norm < 3) {
                        size = 2;
                        if (norm > 2.25) {
                            size = 2.5;
                            ++dec;
                        }
                    }
                    else if (norm < 7.5) {
                        size = 5;
                    }
                    else {
                        size = 10;
                    }
                    size *= magn;
                    if (Math.floor(value) === value) {
                        dec = 0;
                    }
                    var result = {};
                    result.decimals = Math.max(0, dec);
                    result.scaledDecimals =
                        result.decimals - Math.floor(Math.log(size) / Math.LN10) + 2;
                    return result;
                };
                BlendStatCtrl.prototype.setValues = function (data) {
                    data.flotpairs = [];
                    if (this.series.length > 1) {
                        var error = new Error();
                        error.message = "Multiple Series Error";
                        error.data =
                            "Metric query returns " +
                                this.series.length +
                                " series. Single Stat Panel expects a single series.\n\nResponse:\n" +
                                JSON.stringify(this.series);
                        throw error;
                    }
                    if (this.series && this.series.length > 0) {
                        var lastPoint = lodash_1.default.last(this.series[0].datapoints);
                        var lastValue = lodash_1.default.isArray(lastPoint) ? lastPoint[0] : null;
                        if (this.panel.valueName === "name") {
                            data.value = 0;
                            data.valueRounded = 0;
                            data.valueFormatted = this.series[0].alias;
                        }
                        else if (lodash_1.default.isString(lastValue)) {
                            data.value = 0;
                            data.valueFormatted = lodash_1.default.escape(lastValue);
                            data.valueRounded = 0;
                        }
                        else if (this.panel.valueName === "last_time") {
                            var formatFunc = kbn_1.default.valueFormats[this.panel.format];
                            data.value = lastPoint[1];
                            data.valueRounded = data.value;
                            data.valueFormatted = formatFunc(data.value, this.dashboard.isTimezoneUtc());
                        }
                        else {
                            data.value = this.series[0].stats[this.panel.valueName];
                            data.flotpairs = this.series[0].flotpairs;
                            var decimalInfo = this.getDecimalsForValue(data.value);
                            var formatFunc = kbn_1.default.valueFormats[this.panel.format];
                            data.valueFormatted = formatFunc(data.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                            data.valueRounded = kbn_1.default.roundValue(data.value, decimalInfo.decimals);
                        }
                        data.scopedVars["__name"] = { value: this.series[0].label };
                    }
                    this.setValueMapping(data);
                };
                BlendStatCtrl.prototype.setValueMapping = function (data) {
                    if (this.panel.mappingType === 1) {
                        for (var i = 0; i < this.panel.valueMaps.length; i++) {
                            var map = this.panel.valueMaps[i];
                            if (map.value === "null") {
                                if (data.value === null || data.value === void 0) {
                                    data.valueFormatted = map.text;
                                    return;
                                }
                                continue;
                            }
                            var value = parseFloat(map.value);
                            if (value === data.valueRounded) {
                                data.valueFormatted = map.text;
                                return;
                            }
                        }
                    }
                    else if (this.panel.mappingType === 2) {
                        for (var i = 0; i < this.panel.rangeMaps.length; i++) {
                            var map = this.panel.rangeMaps[i];
                            if (map.from === "null" && map.to === "null") {
                                if (data.value === null || data.value === void 0) {
                                    data.valueFormatted = map.text;
                                    return;
                                }
                                continue;
                            }
                            var from = parseFloat(map.from);
                            var to = parseFloat(map.to);
                            if (to >= data.valueRounded && from <= data.valueRounded) {
                                data.valueFormatted = map.text;
                                return;
                            }
                        }
                    }
                    if (data.value === null || data.value === void 0) {
                        data.valueFormatted = "no value";
                    }
                };
                BlendStatCtrl.prototype.removeValueMap = function (map) {
                    var index = lodash_1.default.indexOf(this.panel.valueMaps, map);
                    this.panel.valueMaps.splice(index, 1);
                    this.render();
                };
                BlendStatCtrl.prototype.addValueMap = function () {
                    this.panel.valueMaps.push({ value: "", op: "=", text: "" });
                };
                BlendStatCtrl.prototype.removeRangeMap = function (rangeMap) {
                    var index = lodash_1.default.indexOf(this.panel.rangeMaps, rangeMap);
                    this.panel.rangeMaps.splice(index, 1);
                    this.render();
                };
                BlendStatCtrl.prototype.addRangeMap = function () {
                    this.panel.rangeMaps.push({ from: "", to: "", text: "" });
                };
                BlendStatCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
                    var $location = this.$location;
                    var $timeout = this.$timeout;
                    var $sanitize = this.$sanitize;
                    var panel = ctrl.panel;
                    var templateSrv = this.templateSrv;
                    var data, linkInfo;
                    var $panelContainer = elem.find(".panel-container");
                    elem = elem.find(".singlestat-panel");
                    function applyColoringThresholds(valueString) {
                        var color = getColorForValue(data, data.value);
                        if (color) {
                            return '<span style="color:' + color + '">' + valueString + "</span>";
                        }
                        return valueString;
                    }
                    function getSpan(className, fontSize, applyColoring, value) {
                        value = $sanitize(templateSrv.replace(value, data.scopedVars));
                        value = applyColoring ? applyColoringThresholds(value) : value;
                        var pixelSize = (parseInt(fontSize, 10) / 100) * BASE_FONT_SIZE;
                        return ('<span class="' +
                            className +
                            '" style="font-size:' +
                            pixelSize +
                            'px">' +
                            value +
                            "</span>");
                    }
                    function getBigValueHtml() {
                        var body = '<div class="singlestat-panel-value-container">';
                        if (panel.prefix) {
                            body += getSpan("singlestat-panel-prefix", panel.prefixFontSize, panel.colorPrefix, panel.prefix);
                        }
                        body += getSpan("singlestat-panel-value", panel.valueFontSize, panel.colorValue, data.valueFormatted);
                        if (panel.postfix) {
                            body += getSpan("singlestat-panel-postfix", panel.postfixFontSize, panel.colorPostfix, panel.postfix);
                        }
                        body += "</div>";
                        return body;
                    }
                    function getValueText() {
                        var result = panel.prefix
                            ? templateSrv.replace(panel.prefix, data.scopedVars)
                            : "";
                        result += data.valueFormatted;
                        result += panel.postfix
                            ? templateSrv.replace(panel.postfix, data.scopedVars)
                            : "";
                        return result;
                    }
                    function addGauge() {
                        var width = elem.width();
                        var height = elem.height();
                        var dimension = Math.min(width, height * 1.3);
                        ctrl.invalidGaugeRange = false;
                        if (panel.gauge.minValue > panel.gauge.maxValue) {
                            ctrl.invalidGaugeRange = true;
                            return;
                        }
                        var plotCanvas = jquery_1.default("<div></div>");
                        var plotCss = {
                            top: "10px",
                            margin: "auto",
                            position: "relative",
                            height: height * 0.9 + "px",
                            width: dimension + "px",
                        };
                        plotCanvas.css(plotCss);
                        var thresholds = [];
                        for (var i = 0; i < data.thresholds.length; i++) {
                            thresholds.push({
                                value: data.thresholds[i],
                                color: data.colorMap[i],
                            });
                        }
                        thresholds.push({
                            value: panel.gauge.maxValue,
                            color: data.colorMap[data.colorMap.length - 1],
                        });
                        var element = document.createElement('div');
                        element.id = '#gaugeArea';
                        var needleValue = parseFloat(getValueText());
                        var gaugeOptions = {
                            hasNeedle: true,
                            outerNeedle: false,
                            needleColor: '#fff',
                            needleStartValue: (needleValue / panel.gauge.maxValue) * 100,
                            needleUpdateSpeed: 100,
                            needleValue: (needleValue / panel.gauge.maxValue) * 100,
                            arcColors: panel.colors.slice(),
                            arcDelimiters: panel.thresholds.trim().split(",").map(parseFloat).filter(function (item) { return item > 0; }).slice().map(function (threshold) {
                                console.log(threshold);
                                threshold = parseFloat(threshold);
                                var delimiter = (threshold / panel.gauge.maxValue) * 100;
                                return delimiter;
                            }),
                            arcPadding: 6,
                            arcPaddingColor: '#000',
                            arcLabels: data.thresholds,
                            arcLabelFontSize: true,
                            arcOverEffect: true,
                            rangeLabel: [panel.gauge.minValue + '', panel.gauge.maxValue + ''],
                            centralLabel: data.valueFormatted + '',
                            rangeLabelFontSize: panel.gauge.fontSize,
                            labelsFont: 'Consolas',
                            color: 'white',
                        };
                        var gaugeChart = GaugeChart.gaugeChart(element, 500, gaugeOptions);
                        var bgColor = config_1.default.bootData.user.lightTheme
                            ? "rgb(230,230,230)"
                            : "rgb(38,38,38)";
                        var fontScale = parseInt(panel.valueFontSize, 7) / 100;
                        var fontSize = Math.min(dimension / 5, 100) * fontScale;
                        var gaugeWidthReduceRatio = panel.gauge.thresholdLabels ? 1.5 : 1;
                        var gaugeWidth = Math.min(dimension / 4, 60) / gaugeWidthReduceRatio;
                        var thresholdMarkersWidth = gaugeWidth / 7;
                        var thresholdLabelFontSize = fontSize / 3.2;
                        var options = {
                            series: {
                                gauges: {
                                    gauge: {
                                        min: panel.gauge.minValue,
                                        max: panel.gauge.maxValue,
                                        background: { color: bgColor },
                                        border: { color: null },
                                        shadow: { show: false },
                                        width: gaugeWidth,
                                    },
                                    frame: { show: false },
                                    label: { show: false },
                                    layout: { margin: 0, thresholdWidth: 0 },
                                    cell: { border: { width: 0 } },
                                    threshold: {
                                        values: thresholds,
                                        label: {
                                            show: panel.gauge.thresholdLabels,
                                            margin: thresholdMarkersWidth + 10,
                                            font: { size: thresholdLabelFontSize },
                                        },
                                        show: panel.gauge.thresholdMarkers,
                                        width: thresholdMarkersWidth,
                                    },
                                    value: {
                                        color: panel.colorValue
                                            ? getColorForValue(data, data.valueRounded)
                                            : null,
                                        formatter: function () {
                                            return getValueText();
                                        },
                                        font: {
                                            size: fontSize,
                                            family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                        },
                                    },
                                    show: true,
                                },
                            },
                        };
                        elem.append(element);
                        var plotSeries = {
                            data: [[0, data.value]],
                        };
                        jquery_1.default.plot(plotCanvas, [plotSeries], options);
                    }
                    function addSparkline() {
                        var width = elem.width() + 20;
                        if (width < 30) {
                            setTimeout(addSparkline, 30);
                            return;
                        }
                        var height = ctrl.height;
                        var plotCanvas = jquery_1.default("<div></div>");
                        var plotCss = {};
                        plotCss.position = "absolute";
                        if (panel.sparkline.full) {
                            plotCss.bottom = "5px";
                            plotCss.left = "-5px";
                            plotCss.width = width - 10 + "px";
                            var dynamicHeightMargin = height <= 100 ? 5 : Math.round(height / 100) * 15 + 5;
                            plotCss.height = height - dynamicHeightMargin + "px";
                        }
                        else {
                            plotCss.bottom = "0px";
                            plotCss.left = "-5px";
                            plotCss.width = width - 10 + "px";
                            plotCss.height = Math.floor(height * 0.25) + "px";
                        }
                        plotCanvas.css(plotCss);
                        var options = {
                            legend: { show: false },
                            series: {
                                lines: {
                                    show: true,
                                    fill: 1,
                                    zero: false,
                                    lineWidth: 1,
                                    fillColor: panel.sparkline.fillColor,
                                },
                            },
                            yaxes: { show: false },
                            xaxis: {
                                show: false,
                                mode: "time",
                                min: ctrl.range.from.valueOf(),
                                max: ctrl.range.to.valueOf(),
                            },
                            grid: { hoverable: false, show: false },
                        };
                        elem.append(plotCanvas);
                        var plotSeries = {
                            data: data.flotpairs,
                            color: panel.sparkline.lineColor,
                        };
                        jquery_1.default.plot(plotCanvas, [plotSeries], options);
                    }
                    function render() {
                        if (!ctrl.data) {
                            return;
                        }
                        data = ctrl.data;
                        data.thresholds = panel.thresholds.split(",").map(function (strVale) {
                            return Number(strVale.trim());
                        });
                        data.colorMap = panel.colors;
                        var body = panel.gauge.show ? "" : getBigValueHtml();
                        if (panel.colorBackground) {
                            var color = getColorForValue(data, data.value);
                            if (color) {
                                $panelContainer.css("background-color", color);
                                if (scope.fullscreen) {
                                    elem.css("background-color", color);
                                }
                                else {
                                    elem.css("background-color", "");
                                }
                            }
                        }
                        else {
                            $panelContainer.css("background-color", "");
                            elem.css("background-color", "");
                        }
                        elem.html(body);
                        if (panel.sparkline.show) {
                            addSparkline();
                        }
                        if (panel.gauge.show) {
                            addGauge();
                        }
                        elem.toggleClass("pointer", panel.links.length > 0);
                        if (panel.links.length > 0) {
                            linkInfo = null;
                        }
                        else {
                            linkInfo = null;
                        }
                    }
                    function hookupDrilldownLinkTooltip() {
                        var drilldownTooltip = jquery_1.default('<div id="tooltip" class="">hello</div>"');
                        elem.mouseleave(function () {
                            if (panel.links.length === 0) {
                                return;
                            }
                            $timeout(function () {
                                drilldownTooltip.detach();
                            });
                        });
                        elem.click(function (evt) {
                            if (!linkInfo) {
                                return;
                            }
                            if (jquery_1.default(evt).parents(".panel-header").length > 0) {
                                return;
                            }
                            if (linkInfo.target === "_blank") {
                                window.open(linkInfo.href, "_blank");
                                return;
                            }
                            if (linkInfo.href.indexOf("http") === 0) {
                                window.location.href = linkInfo.href;
                            }
                            else {
                                $timeout(function () {
                                    $location.url(linkInfo.href);
                                });
                            }
                            drilldownTooltip.detach();
                        });
                        elem.mousemove(function (e) {
                            if (!linkInfo) {
                                return;
                            }
                            drilldownTooltip.text("click to go to: " + linkInfo.title);
                            drilldownTooltip.place_tt(e.pageX, e.pageY - 50);
                        });
                    }
                    hookupDrilldownLinkTooltip();
                    this.events.on("render", function () {
                        render();
                        ctrl.renderingCompleted();
                    });
                };
                BlendStatCtrl.templateUrl = "module.html";
                return BlendStatCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("BlendStatCtrl", BlendStatCtrl);
            exports_1("PanelCtrl", BlendStatCtrl);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQWs3QkEsMEJBQTBCLElBQUksRUFBRSxLQUFLO1FBQ25DLElBQUksQ0FBQyxnQkFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9DLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNuQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDekI7U0FDRjtRQUVELE9BQU8sZ0JBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBcjVCSyxjQUFjLEdBQUcsRUFBRSxDQUFDOztnQkFFRSxpQ0FBZ0I7Z0JBOEUxQyx1QkFBWSxNQUFNLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBVSxTQUFTO29CQUFuRSxZQUVFLGtCQUFNLE1BQU0sRUFBRSxTQUFTLENBQUMsU0FnQ3pCO29CQWxDc0MsZUFBUyxHQUFULFNBQVMsQ0FBQTtvQkFBVSxlQUFTLEdBQVQsU0FBUyxDQUFBO29CQTNFbkUsY0FBUSxHQUFHLFlBQVksQ0FBQztvQkFReEIsc0JBQWdCLEdBQVU7d0JBQ3hCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFO3dCQUM3QixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTt3QkFDN0IsRUFBRSxLQUFLLEVBQUUs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RUFBRSxDQUFDLFFBQVEsRUFBRTt3QkFDdkIsTUFBTSxFQUFFLENBQUM7d0JBQ1QsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7b0JBQzVCLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBbjRCTSx5QkFBVyxHQUFHLGFBQWEsQ0FBQztnQkFvNEJyQyxvQkFBQzthQUFBLEFBcjRCRCxDQUE0QixzQkFBZ0I7OztRQXM1QjVDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxuXG4vLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuLy8gQ29weXJpZ2h0IChjKSAyMDE2IEdyYWZhbmFcblxuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbi8vIFNPRlRXQVJFLlxuXG5pbXBvcnQgXCJqcXVlcnkuZmxvdFwiO1xuaW1wb3J0IFwiLi9saWIvZmxvdC9qcXVlcnkuZmxvdC5nYXVnZVwiO1xuaW1wb3J0IFwianF1ZXJ5LmZsb3QudGltZVwiO1xuaW1wb3J0IFwianF1ZXJ5LmZsb3QuY3Jvc3NoYWlyXCI7XG5cbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbi8vIGltcG9ydCAndmVuZG9yL2Zsb3QvanF1ZXJ5LmZsb3QnO1xuLy8gaW1wb3J0ICd2ZW5kb3IvZmxvdC9qcXVlcnkuZmxvdC5nYXVnZSc7XG4vLyBpbXBvcnQgJ2FwcC9mZWF0dXJlcy9kYXNoYm9hcmQvcGFuZWxsaW5rcy9saW5rX3Nydic7XG5cbmltcG9ydCBrYm4gZnJvbSBcImFwcC9jb3JlL3V0aWxzL2tiblwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiYXBwL2NvcmUvY29uZmlnXCI7XG5pbXBvcnQgVGltZVNlcmllcyBmcm9tIFwiYXBwL2NvcmUvdGltZV9zZXJpZXMyXCI7XG5pbXBvcnQgeyBNZXRyaWNzUGFuZWxDdHJsIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xuaW1wb3J0ICogYXMgR2F1Z2VDaGFydCBmcm9tIFwiLi9saWIvZmxvdC9nYXVnZS1jaGFydFwiO1xuXG5jb25zdCBCQVNFX0ZPTlRfU0laRSA9IDM4O1xuXG5jbGFzcyBCbGVuZFN0YXRDdHJsIGV4dGVuZHMgTWV0cmljc1BhbmVsQ3RybCB7XG4gIHN0YXRpYyB0ZW1wbGF0ZVVybCA9IFwibW9kdWxlLmh0bWxcIjtcblxuICBkYXRhVHlwZSA9IFwidGltZXNlcmllc1wiO1xuICBzZXJpZXM6IGFueVtdO1xuICBkYXRhOiBhbnk7XG4gIGZvbnRTaXplczogYW55W107XG4gIHVuaXRGb3JtYXRzOiBhbnlbXTtcbiAgaW52YWxpZEdhdWdlUmFuZ2U6IGJvb2xlYW47XG4gIHBhbmVsOiBhbnk7XG4gIGV2ZW50czogYW55O1xuICB2YWx1ZU5hbWVPcHRpb25zOiBhbnlbXSA9IFtcbiAgICB7IHZhbHVlOiBcIm1pblwiLCB0ZXh0OiBcIk1pblwiIH0sXG4gICAgeyB2YWx1ZTogXCJtYXhcIiwgdGV4dDogXCJNYXhcIiB9LFxuICAgIHsgdmFsdWU6IFwiYXZnXCIsIHRleHQ6IFwiQXZlcmFnZVwiIH0sXG4gICAgeyB2YWx1ZTogXCJjdXJyZW50XCIsIHRleHQ6IFwiQ3VycmVudFwiIH0sXG4gICAgeyB2YWx1ZTogXCJ0b3RhbFwiLCB0ZXh0OiBcIlRvdGFsXCIgfSxcbiAgICB7IHZhbHVlOiBcIm5hbWVcIiwgdGV4dDogXCJOYW1lXCIgfSxcbiAgICB7IHZhbHVlOiBcImZpcnN0XCIsIHRleHQ6IFwiRmlyc3RcIiB9LFxuICAgIHsgdmFsdWU6IFwiZGVsdGFcIiwgdGV4dDogXCJEZWx0YVwiIH0sXG4gICAgeyB2YWx1ZTogXCJkaWZmXCIsIHRleHQ6IFwiRGlmZmVyZW5jZVwiIH0sXG4gICAgeyB2YWx1ZTogXCJyYW5nZVwiLCB0ZXh0OiBcIlJhbmdlXCIgfSxcbiAgICB7IHZhbHVlOiBcImxhc3RfdGltZVwiLCB0ZXh0OiBcIlRpbWUgb2YgbGFzdCBwb2ludFwiIH0sXG4gIF07XG4gIGJsZW5kTmFtZU9wdGlvbnM6IGFueVtdID0gW1xuICAgIHsgdmFsdWU6IFwibWluXCIsIHRleHQ6IFwiTWluXCIgfSxcbiAgICB7IHZhbHVlOiBcIm1heFwiLCB0ZXh0OiBcIk1heFwiIH0sXG4gICAgeyB2YWx1ZTogXCJhdmdcIiwgdGV4dDogXCJBdmVyYWdlXCIgfSxcbiAgICB7IHZhbHVlOiBcInRvdGFsXCIsIHRleHQ6IFwiVG90YWxcIiB9LFxuICBdO1xuICB0YWJsZUNvbHVtbk9wdGlvbnM6IGFueTtcblxuICAvLyBTZXQgYW5kIHBvcHVsYXRlIGRlZmF1bHRzXG4gIHBhbmVsRGVmYXVsdHMgPSB7XG4gICAgbGlua3M6IFtdLFxuICAgIGRhdGFzb3VyY2U6IG51bGwsXG4gICAgbWF4RGF0YVBvaW50czogMTAwLFxuICAgIGludGVydmFsOiBudWxsLFxuICAgIHRhcmdldHM6IFt7fV0sXG4gICAgY2FjaGVUaW1lb3V0OiBudWxsLFxuICAgIGZvcm1hdDogXCJub25lXCIsXG4gICAgcHJlZml4OiBcIlwiLFxuICAgIHBvc3RmaXg6IFwiXCIsXG4gICAgbnVsbFRleHQ6IG51bGwsXG4gICAgdmFsdWVNYXBzOiBbeyB2YWx1ZTogXCJudWxsXCIsIG9wOiBcIj1cIiwgdGV4dDogXCJOL0FcIiB9XSxcbiAgICBtYXBwaW5nVHlwZXM6IFtcbiAgICAgIHsgbmFtZTogXCJ2YWx1ZSB0byB0ZXh0XCIsIHZhbHVlOiAxIH0sXG4gICAgICB7IG5hbWU6IFwicmFuZ2UgdG8gdGV4dFwiLCB2YWx1ZTogMiB9LFxuICAgIF0sXG4gICAgcmFuZ2VNYXBzOiBbeyBmcm9tOiBcIm51bGxcIiwgdG86IFwibnVsbFwiLCB0ZXh0OiBcIk4vQVwiIH1dLFxuICAgIG1hcHBpbmdUeXBlOiAxLFxuICAgIG51bGxQb2ludE1vZGU6IFwiY29ubmVjdGVkXCIsXG4gICAgdmFsdWVOYW1lOiBcImF2Z1wiLFxuICAgIGJsZW5kTmFtZTogXCJ0b3RhbFwiLFxuICAgIHByZWZpeEZvbnRTaXplOiBcIjUwJVwiLFxuICAgIHZhbHVlRm9udFNpemU6IFwiMTAwJVwiLFxuICAgIHBvc3RmaXhGb250U2l6ZTogXCI1MCVcIixcbiAgICB0aHJlc2hvbGRzOiBcIiBcIixcbiAgICBjb2xvckJhY2tncm91bmQ6IGZhbHNlLFxuICAgIGNvbG9yVmFsdWU6IGZhbHNlLFxuICAgIGNvbG9yczogW1wiIzI5OWM0NlwiLCBcInJnYmEoMjM3LCAxMjksIDQwLCAwLjg5KVwiLCBcIiNkNDRhM2FcIl0sXG4gICAgc3BhcmtsaW5lOiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIGZ1bGw6IGZhbHNlLFxuICAgICAgbGluZUNvbG9yOiBcInJnYigzMSwgMTIwLCAxOTMpXCIsXG4gICAgICBmaWxsQ29sb3I6IFwicmdiYSgzMSwgMTE4LCAxODksIDAuMTgpXCIsXG4gICAgfSxcbiAgICBnYXVnZToge1xuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICBtaW5WYWx1ZTogMCxcbiAgICAgIG1heFZhbHVlOiAxMDAsXG4gICAgICB0aHJlc2hvbGRNYXJrZXJzOiB0cnVlLFxuICAgICAgdGhyZXNob2xkTGFiZWxzOiBmYWxzZSxcbiAgICB9LFxuICAgIHRhYmxlQ29sdW1uOiBcIlwiLFxuICB9O1xuXG4gIC8qKiBAbmdJbmplY3QgKi9cbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkaW5qZWN0b3IsIHByaXZhdGUgJHNhbml0aXplLCBwcml2YXRlICRsb2NhdGlvbikge1xuICAgIC8vIHByaXZhdGUgbGlua1NydixcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XG4gICAgXy5kZWZhdWx0cyh0aGlzLnBhbmVsLCB0aGlzLnBhbmVsRGVmYXVsdHMpO1xuXG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLXJlY2VpdmVkXCIsIHRoaXMub25EYXRhUmVjZWl2ZWQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLWVycm9yXCIsIHRoaXMub25EYXRhRXJyb3IuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLXNuYXBzaG90LWxvYWRcIiwgdGhpcy5vbkRhdGFSZWNlaXZlZC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmV2ZW50cy5vbihcImluaXQtZWRpdC1tb2RlXCIsIHRoaXMub25Jbml0RWRpdE1vZGUuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLm9uU3BhcmtsaW5lQ29sb3JDaGFuZ2UgPSB0aGlzLm9uU3BhcmtsaW5lQ29sb3JDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uU3BhcmtsaW5lRmlsbENoYW5nZSA9IHRoaXMub25TcGFya2xpbmVGaWxsQ2hhbmdlLmJpbmQodGhpcyk7XG5cbiAgICBcblxuICAgIC8vIEluc2VydGFyIGxvZ29cblxuICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSg3NSk7XG4gICAgaW1hZ2Uuc3JjID1cbiAgICAgIFwiaHR0cHM6Ly93d3cuc29mdHRlay5jb20vaW1hZ2VzL2NvbnRlbnQvZGVzaWduMjAxNS9Mb2dvQ29tcGxldG8tV2Vic2l0ZS0yMC5wbmdcIjtcbiAgICBpbWFnZS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVkoLTM1cHgpXCI7XG4gICAgaW1hZ2UuaWQgPSBcImxvZ29cIjtcblxuICAgIGNvbnN0IHBhbmVsQ29udGVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGFuZWwtY29udGVudFwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhbmVsQ29udGVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ29cIikpIHtcbiAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvXCIpXG4gICAgICAgICAgLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvXCIpKTtcbiAgICAgIH1cbiAgICAgIHBhbmVsQ29udGVudHMuaXRlbShpKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMwMDBcIjtcbiAgICAgIHBhbmVsQ29udGVudHMuaXRlbShpKS5hcHBlbmRDaGlsZChpbWFnZSk7XG4gICAgXG4gICAgfVxuICB9XG5cbiAgb25Jbml0RWRpdE1vZGUoKSB7XG4gICAgdGhpcy5mb250U2l6ZXMgPSBbXG4gICAgICBcIjIwJVwiLFxuICAgICAgXCIzMCVcIixcbiAgICAgIFwiNTAlXCIsXG4gICAgICBcIjcwJVwiLFxuICAgICAgXCI4MCVcIixcbiAgICAgIFwiMTAwJVwiLFxuICAgICAgXCIxMTAlXCIsXG4gICAgICBcIjEyMCVcIixcbiAgICAgIFwiMTUwJVwiLFxuICAgICAgXCIxNzAlXCIsXG4gICAgICBcIjIwMCVcIixcbiAgICBdO1xuICAgIHRoaXMuYWRkRWRpdG9yVGFiKFxuICAgICAgXCJPcHRpb25zXCIsXG4gICAgICBcInB1YmxpYy9wbHVnaW5zL2ZhcnNraS1ibGVuZHN0YXQtcGFuZWxfbmV3L2VkaXRvci5odG1sXCIsXG4gICAgICAyXG4gICAgKTtcbiAgICB0aGlzLmFkZEVkaXRvclRhYihcbiAgICAgIFwiVmFsdWUgTWFwcGluZ3NcIixcbiAgICAgIFwicHVibGljL3BsdWdpbnMvZmFyc2tpLWJsZW5kc3RhdC1wYW5lbF9uZXcvbWFwcGluZ3MuaHRtbFwiLFxuICAgICAgM1xuICAgICk7XG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXG4gICAgICBcIkJsZW5kaW5nXCIsXG4gICAgICBcInB1YmxpYy9wbHVnaW5zL2ZhcnNraS1ibGVuZHN0YXQtcGFuZWxfbmV3L2JsZW5kaW5nLmh0bWxcIixcbiAgICAgIDRcbiAgICApO1xuICAgIHRoaXMudW5pdEZvcm1hdHMgPSBrYm4uZ2V0VW5pdEZvcm1hdHMoKTtcbiAgfVxuXG4gIHNldFVuaXRGb3JtYXQoc3ViSXRlbSkge1xuICAgIHRoaXMucGFuZWwuZm9ybWF0ID0gc3ViSXRlbS52YWx1ZTtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIG9uRGF0YUVycm9yKGVycikge1xuICAgIHRoaXMub25EYXRhUmVjZWl2ZWQoW10pO1xuICB9XG5cbiAgb25EYXRhUmVjZWl2ZWQoZGF0YUxpc3QpIHtcbiAgICBpZiAoZGF0YUxpc3QubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgdGltZXN0YW1wcyA9IHt9O1xuICAgICAgY29uc3QgY291bnRzID0ge307XG5cbiAgICAgIGZvciAobGV0IHNlcmllcyBvZiBkYXRhTGlzdCkge1xuICAgICAgICBmb3IgKGxldCBwb2ludCBvZiBzZXJpZXMuZGF0YXBvaW50cykge1xuICAgICAgICAgIGlmICh0aW1lc3RhbXBzW3BvaW50WzFdXSkge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnBhbmVsLmJsZW5kTmFtZSkge1xuICAgICAgICAgICAgICBjYXNlIFwibWluXCI6XG4gICAgICAgICAgICAgICAgaWYgKHBvaW50WzBdIDwgdGltZXN0YW1wc1twb2ludFsxXV0pIHtcbiAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcHNbcG9pbnRbMV1dID0gcG9pbnRbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIFwibWF4XCI6XG4gICAgICAgICAgICAgICAgaWYgKHBvaW50WzBdID4gdGltZXN0YW1wc1twb2ludFsxXV0pIHtcbiAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcHNbcG9pbnRbMV1dID0gcG9pbnRbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIFwiYXZnXCI6XG4gICAgICAgICAgICAgICAgdGltZXN0YW1wc1twb2ludFsxXV0gPVxuICAgICAgICAgICAgICAgICAgKHRpbWVzdGFtcHNbcG9pbnRbMV1dICogY291bnRzW3BvaW50WzFdXSArIHBvaW50WzBdKSAvXG4gICAgICAgICAgICAgICAgICAoY291bnRzW3BvaW50WzFdXSArIDEpO1xuXG4gICAgICAgICAgICAgICAgY291bnRzW3BvaW50WzFdXSArPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgaXMgdG90YWxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXBzW3BvaW50WzFdXSArPSBwb2ludFswXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGltZXN0YW1wc1twb2ludFsxXV0gPSBwb2ludFswXTtcbiAgICAgICAgICAgIGNvdW50c1twb2ludFsxXV0gPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhcG9pbnRzID0gT2JqZWN0LmtleXModGltZXN0YW1wcylcbiAgICAgICAgLnNvcnQoKVxuICAgICAgICAubWFwKCh0cykgPT4ge1xuICAgICAgICAgIHJldHVybiBbdGltZXN0YW1wc1t0c10sIHRzXTtcbiAgICAgICAgfSk7XG5cbiAgICAgIGRhdGFMaXN0ID0gW3sgdGFyZ2V0OiBcIkJsZW5kZWRfTWV0cmljc1wiLCBkYXRhcG9pbnRzIH1dO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGE6IGFueSA9IHtcbiAgICAgIHNjb3BlZFZhcnM6IF8uZXh0ZW5kKHt9LCB0aGlzLnBhbmVsLnNjb3BlZFZhcnMpLFxuICAgIH07XG5cbiAgICBpZiAoZGF0YUxpc3QubGVuZ3RoID4gMCAmJiBkYXRhTGlzdFswXS50eXBlID09PSBcInRhYmxlXCIpIHtcbiAgICAgIHRoaXMuZGF0YVR5cGUgPSBcInRhYmxlXCI7XG4gICAgICBjb25zdCB0YWJsZURhdGEgPSBkYXRhTGlzdC5tYXAodGhpcy50YWJsZUhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgICB0aGlzLnNldFRhYmxlVmFsdWVzKHRhYmxlRGF0YSwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0YVR5cGUgPSBcInRpbWVzZXJpZXNcIjtcbiAgICAgIHRoaXMuc2VyaWVzID0gZGF0YUxpc3QubWFwKHRoaXMuc2VyaWVzSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuc2V0VmFsdWVzKGRhdGEpO1xuICAgIH1cblxuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHNlcmllc0hhbmRsZXIoc2VyaWVzRGF0YSkge1xuICAgIGNvbnN0IHNlcmllcyA9IG5ldyBUaW1lU2VyaWVzKHtcbiAgICAgIGRhdGFwb2ludHM6IHNlcmllc0RhdGEuZGF0YXBvaW50cyB8fCBbXSxcbiAgICAgIGFsaWFzOiBzZXJpZXNEYXRhLnRhcmdldCxcbiAgICB9KTtcblxuICAgIHNlcmllcy5mbG90cGFpcnMgPSBzZXJpZXMuZ2V0RmxvdFBhaXJzKHRoaXMucGFuZWwubnVsbFBvaW50TW9kZSk7XG4gICAgcmV0dXJuIHNlcmllcztcbiAgfVxuXG4gIHRhYmxlSGFuZGxlcih0YWJsZURhdGEpIHtcbiAgICBjb25zdCBkYXRhcG9pbnRzID0gW107XG4gICAgY29uc3QgY29sdW1uTmFtZXMgPSB7fTtcblxuICAgIHRhYmxlRGF0YS5jb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgY29sdW1uSW5kZXgpID0+IHtcbiAgICAgIGNvbHVtbk5hbWVzW2NvbHVtbkluZGV4XSA9IGNvbHVtbi50ZXh0O1xuICAgIH0pO1xuXG4gICAgdGhpcy50YWJsZUNvbHVtbk9wdGlvbnMgPSBjb2x1bW5OYW1lcztcbiAgICBpZiAoIV8uZmluZCh0YWJsZURhdGEuY29sdW1ucywgW1widGV4dFwiLCB0aGlzLnBhbmVsLnRhYmxlQ29sdW1uXSkpIHtcbiAgICAgIHRoaXMuc2V0VGFibGVDb2x1bW5Ub1NlbnNpYmxlRGVmYXVsdCh0YWJsZURhdGEpO1xuICAgIH1cblxuICAgIHRhYmxlRGF0YS5yb3dzLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgY29uc3QgZGF0YXBvaW50ID0ge307XG5cbiAgICAgIHJvdy5mb3JFYWNoKCh2YWx1ZSwgY29sdW1uSW5kZXgpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gY29sdW1uTmFtZXNbY29sdW1uSW5kZXhdO1xuICAgICAgICBkYXRhcG9pbnRba2V5XSA9IHZhbHVlO1xuICAgICAgfSk7XG5cbiAgICAgIGRhdGFwb2ludHMucHVzaChkYXRhcG9pbnQpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRhdGFwb2ludHM7XG4gIH1cblxuICBzZXRUYWJsZUNvbHVtblRvU2Vuc2libGVEZWZhdWx0KHRhYmxlRGF0YSkge1xuICAgIGlmICh0YWJsZURhdGEuY29sdW1ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMucGFuZWwudGFibGVDb2x1bW4gPSB0YWJsZURhdGEuY29sdW1uc1swXS50ZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhbmVsLnRhYmxlQ29sdW1uID0gXy5maW5kKHRhYmxlRGF0YS5jb2x1bW5zLCAoY29sKSA9PiB7XG4gICAgICAgIHJldHVybiBjb2wudHlwZSAhPT0gXCJ0aW1lXCI7XG4gICAgICB9KS50ZXh0O1xuICAgIH1cbiAgfVxuXG4gIHNldFRhYmxlVmFsdWVzKHRhYmxlRGF0YSwgZGF0YSkge1xuICAgIGlmICghdGFibGVEYXRhIHx8IHRhYmxlRGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0YWJsZURhdGFbMF0ubGVuZ3RoID09PSAwIHx8XG4gICAgICB0YWJsZURhdGFbMF1bMF1bdGhpcy5wYW5lbC50YWJsZUNvbHVtbl0gPT09IHVuZGVmaW5lZFxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGFwb2ludCA9IHRhYmxlRGF0YVswXVswXTtcbiAgICBkYXRhLnZhbHVlID0gZGF0YXBvaW50W3RoaXMucGFuZWwudGFibGVDb2x1bW5dO1xuXG4gICAgaWYgKF8uaXNTdHJpbmcoZGF0YS52YWx1ZSkpIHtcbiAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSBfLmVzY2FwZShkYXRhLnZhbHVlKTtcbiAgICAgIGRhdGEudmFsdWUgPSAwO1xuICAgICAgZGF0YS52YWx1ZVJvdW5kZWQgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkZWNpbWFsSW5mbyA9IHRoaXMuZ2V0RGVjaW1hbHNGb3JWYWx1ZShkYXRhLnZhbHVlKTtcbiAgICAgIGNvbnN0IGZvcm1hdEZ1bmMgPSBrYm4udmFsdWVGb3JtYXRzW3RoaXMucGFuZWwuZm9ybWF0XTtcbiAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSBmb3JtYXRGdW5jKFxuICAgICAgICBkYXRhcG9pbnRbdGhpcy5wYW5lbC50YWJsZUNvbHVtbl0sXG4gICAgICAgIGRlY2ltYWxJbmZvLmRlY2ltYWxzLFxuICAgICAgICBkZWNpbWFsSW5mby5zY2FsZWREZWNpbWFsc1xuICAgICAgKTtcbiAgICAgIGRhdGEudmFsdWVSb3VuZGVkID0ga2JuLnJvdW5kVmFsdWUoZGF0YS52YWx1ZSwgdGhpcy5wYW5lbC5kZWNpbWFscyB8fCAwKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFZhbHVlTWFwcGluZyhkYXRhKTtcbiAgfVxuXG4gIGNhbk1vZGlmeVRleHQoKSB7XG4gICAgcmV0dXJuICF0aGlzLnBhbmVsLmdhdWdlLnNob3c7XG4gIH1cblxuICBzZXRDb2xvcmluZyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuYmFja2dyb3VuZCkge1xuICAgICAgdGhpcy5wYW5lbC5jb2xvclZhbHVlID0gZmFsc2U7XG4gICAgICB0aGlzLnBhbmVsLmNvbG9ycyA9IFtcbiAgICAgICAgXCJyZ2JhKDcxLCAyMTIsIDU5LCAwLjQpXCIsXG4gICAgICAgIFwicmdiYSgyNDUsIDE1MCwgNDAsIDAuNzMpXCIsXG4gICAgICAgIFwicmdiYSgyMjUsIDQwLCA0MCwgMC41OSlcIixcbiAgICAgIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWwuY29sb3JCYWNrZ3JvdW5kID0gZmFsc2U7XG4gICAgICB0aGlzLnBhbmVsLmNvbG9ycyA9IFtcbiAgICAgICAgXCJyZ2JhKDUwLCAxNzIsIDQ1LCAwLjk3KVwiLFxuICAgICAgICBcInJnYmEoMjM3LCAxMjksIDQwLCAwLjg5KVwiLFxuICAgICAgICBcInJnYmEoMjQ1LCA1NCwgNTQsIDAuOSlcIixcbiAgICAgIF07XG4gICAgfVxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBpbnZlcnRDb2xvck9yZGVyKCkge1xuICAgIGNvbnN0IHRtcCA9IHRoaXMucGFuZWwuY29sb3JzWzBdO1xuICAgIHRoaXMucGFuZWwuY29sb3JzWzBdID0gdGhpcy5wYW5lbC5jb2xvcnNbMl07XG4gICAgdGhpcy5wYW5lbC5jb2xvcnNbMl0gPSB0bXA7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIG9uQ29sb3JDaGFuZ2UocGFuZWxDb2xvckluZGV4KSB7XG4gICAgcmV0dXJuIChjb2xvcikgPT4ge1xuICAgICAgdGhpcy5wYW5lbC5jb2xvcnNbcGFuZWxDb2xvckluZGV4XSA9IGNvbG9yO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9O1xuICB9XG5cbiAgb25TcGFya2xpbmVDb2xvckNoYW5nZShuZXdDb2xvcikge1xuICAgIHRoaXMucGFuZWwuc3BhcmtsaW5lLmxpbmVDb2xvciA9IG5ld0NvbG9yO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBvblNwYXJrbGluZUZpbGxDaGFuZ2UobmV3Q29sb3IpIHtcbiAgICB0aGlzLnBhbmVsLnNwYXJrbGluZS5maWxsQ29sb3IgPSBuZXdDb2xvcjtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgZ2V0RGVjaW1hbHNGb3JWYWx1ZSh2YWx1ZSkge1xuICAgIGlmIChfLmlzTnVtYmVyKHRoaXMucGFuZWwuZGVjaW1hbHMpKSB7XG4gICAgICByZXR1cm4geyBkZWNpbWFsczogdGhpcy5wYW5lbC5kZWNpbWFscywgc2NhbGVkRGVjaW1hbHM6IG51bGwgfTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWx0YSA9IHZhbHVlIC8gMjtcbiAgICBsZXQgZGVjID0gLU1hdGguZmxvb3IoTWF0aC5sb2coZGVsdGEpIC8gTWF0aC5MTjEwKTtcblxuICAgIGNvbnN0IG1hZ24gPSBNYXRoLnBvdygxMCwgLWRlYyk7XG4gICAgY29uc3Qgbm9ybSA9IGRlbHRhIC8gbWFnbjsgLy8gbm9ybSBpcyBiZXR3ZWVuIDEuMCBhbmQgMTAuMFxuICAgIGxldCBzaXplO1xuXG4gICAgaWYgKG5vcm0gPCAxLjUpIHtcbiAgICAgIHNpemUgPSAxO1xuICAgIH0gZWxzZSBpZiAobm9ybSA8IDMpIHtcbiAgICAgIHNpemUgPSAyO1xuICAgICAgLy8gc3BlY2lhbCBjYXNlIGZvciAyLjUsIHJlcXVpcmVzIGFuIGV4dHJhIGRlY2ltYWxcbiAgICAgIGlmIChub3JtID4gMi4yNSkge1xuICAgICAgICBzaXplID0gMi41O1xuICAgICAgICArK2RlYztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vcm0gPCA3LjUpIHtcbiAgICAgIHNpemUgPSA1O1xuICAgIH0gZWxzZSB7XG4gICAgICBzaXplID0gMTA7XG4gICAgfVxuXG4gICAgc2l6ZSAqPSBtYWduO1xuXG4gICAgLy8gcmVkdWNlIHN0YXJ0aW5nIGRlY2ltYWxzIGlmIG5vdCBuZWVkZWRcbiAgICBpZiAoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlKSB7XG4gICAgICBkZWMgPSAwO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gICAgcmVzdWx0LmRlY2ltYWxzID0gTWF0aC5tYXgoMCwgZGVjKTtcbiAgICByZXN1bHQuc2NhbGVkRGVjaW1hbHMgPVxuICAgICAgcmVzdWx0LmRlY2ltYWxzIC0gTWF0aC5mbG9vcihNYXRoLmxvZyhzaXplKSAvIE1hdGguTE4xMCkgKyAyO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHNldFZhbHVlcyhkYXRhKSB7XG4gICAgZGF0YS5mbG90cGFpcnMgPSBbXTtcblxuICAgIGlmICh0aGlzLnNlcmllcy5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBlcnJvcjogYW55ID0gbmV3IEVycm9yKCk7XG4gICAgICBlcnJvci5tZXNzYWdlID0gXCJNdWx0aXBsZSBTZXJpZXMgRXJyb3JcIjtcbiAgICAgIGVycm9yLmRhdGEgPVxuICAgICAgICBcIk1ldHJpYyBxdWVyeSByZXR1cm5zIFwiICtcbiAgICAgICAgdGhpcy5zZXJpZXMubGVuZ3RoICtcbiAgICAgICAgXCIgc2VyaWVzLiBTaW5nbGUgU3RhdCBQYW5lbCBleHBlY3RzIGEgc2luZ2xlIHNlcmllcy5cXG5cXG5SZXNwb25zZTpcXG5cIiArXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuc2VyaWVzKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNlcmllcyAmJiB0aGlzLnNlcmllcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBsYXN0UG9pbnQgPSBfLmxhc3QodGhpcy5zZXJpZXNbMF0uZGF0YXBvaW50cyk7XG4gICAgICBjb25zdCBsYXN0VmFsdWUgPSBfLmlzQXJyYXkobGFzdFBvaW50KSA/IGxhc3RQb2ludFswXSA6IG51bGw7XG5cbiAgICAgIGlmICh0aGlzLnBhbmVsLnZhbHVlTmFtZSA9PT0gXCJuYW1lXCIpIHtcbiAgICAgICAgZGF0YS52YWx1ZSA9IDA7XG4gICAgICAgIGRhdGEudmFsdWVSb3VuZGVkID0gMDtcbiAgICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZCA9IHRoaXMuc2VyaWVzWzBdLmFsaWFzO1xuICAgICAgfSBlbHNlIGlmIChfLmlzU3RyaW5nKGxhc3RWYWx1ZSkpIHtcbiAgICAgICAgZGF0YS52YWx1ZSA9IDA7XG4gICAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSBfLmVzY2FwZShsYXN0VmFsdWUpO1xuICAgICAgICBkYXRhLnZhbHVlUm91bmRlZCA9IDA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucGFuZWwudmFsdWVOYW1lID09PSBcImxhc3RfdGltZVwiKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdEZ1bmMgPSBrYm4udmFsdWVGb3JtYXRzW3RoaXMucGFuZWwuZm9ybWF0XTtcbiAgICAgICAgZGF0YS52YWx1ZSA9IGxhc3RQb2ludFsxXTtcbiAgICAgICAgZGF0YS52YWx1ZVJvdW5kZWQgPSBkYXRhLnZhbHVlO1xuICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gZm9ybWF0RnVuYyhcbiAgICAgICAgICBkYXRhLnZhbHVlLFxuICAgICAgICAgIHRoaXMuZGFzaGJvYXJkLmlzVGltZXpvbmVVdGMoKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YS52YWx1ZSA9IHRoaXMuc2VyaWVzWzBdLnN0YXRzW3RoaXMucGFuZWwudmFsdWVOYW1lXTtcbiAgICAgICAgZGF0YS5mbG90cGFpcnMgPSB0aGlzLnNlcmllc1swXS5mbG90cGFpcnM7XG5cbiAgICAgICAgY29uc3QgZGVjaW1hbEluZm8gPSB0aGlzLmdldERlY2ltYWxzRm9yVmFsdWUoZGF0YS52YWx1ZSk7XG4gICAgICAgIGNvbnN0IGZvcm1hdEZ1bmMgPSBrYm4udmFsdWVGb3JtYXRzW3RoaXMucGFuZWwuZm9ybWF0XTtcbiAgICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZCA9IGZvcm1hdEZ1bmMoXG4gICAgICAgICAgZGF0YS52YWx1ZSxcbiAgICAgICAgICBkZWNpbWFsSW5mby5kZWNpbWFscyxcbiAgICAgICAgICBkZWNpbWFsSW5mby5zY2FsZWREZWNpbWFsc1xuICAgICAgICApO1xuICAgICAgICBkYXRhLnZhbHVlUm91bmRlZCA9IGtibi5yb3VuZFZhbHVlKGRhdGEudmFsdWUsIGRlY2ltYWxJbmZvLmRlY2ltYWxzKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkICRfX25hbWUgdmFyaWFibGUgZm9yIHVzaW5nIGluIHByZWZpeCBvciBwb3N0Zml4XG4gICAgICBkYXRhLnNjb3BlZFZhcnNbXCJfX25hbWVcIl0gPSB7IHZhbHVlOiB0aGlzLnNlcmllc1swXS5sYWJlbCB9O1xuICAgIH1cbiAgICB0aGlzLnNldFZhbHVlTWFwcGluZyhkYXRhKTtcbiAgfVxuXG4gIHNldFZhbHVlTWFwcGluZyhkYXRhKSB7XG4gICAgLy8gY2hlY2sgdmFsdWUgdG8gdGV4dCBtYXBwaW5ncyBpZiBpdHMgZW5hYmxlZFxuICAgIGlmICh0aGlzLnBhbmVsLm1hcHBpbmdUeXBlID09PSAxKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFuZWwudmFsdWVNYXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMucGFuZWwudmFsdWVNYXBzW2ldO1xuICAgICAgICAvLyBzcGVjaWFsIG51bGwgY2FzZVxuICAgICAgICBpZiAobWFwLnZhbHVlID09PSBcIm51bGxcIikge1xuICAgICAgICAgIGlmIChkYXRhLnZhbHVlID09PSBudWxsIHx8IGRhdGEudmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZCA9IG1hcC50ZXh0O1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbHVlL251bWJlciB0byB0ZXh0IG1hcHBpbmdcbiAgICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUZsb2F0KG1hcC52YWx1ZSk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gZGF0YS52YWx1ZVJvdW5kZWQpIHtcbiAgICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gbWFwLnRleHQ7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhbmVsLm1hcHBpbmdUeXBlID09PSAyKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFuZWwucmFuZ2VNYXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMucGFuZWwucmFuZ2VNYXBzW2ldO1xuICAgICAgICAvLyBzcGVjaWFsIG51bGwgY2FzZVxuICAgICAgICBpZiAobWFwLmZyb20gPT09IFwibnVsbFwiICYmIG1hcC50byA9PT0gXCJudWxsXCIpIHtcbiAgICAgICAgICBpZiAoZGF0YS52YWx1ZSA9PT0gbnVsbCB8fCBkYXRhLnZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSBtYXAudGV4dDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWx1ZS9udW1iZXIgdG8gcmFuZ2UgbWFwcGluZ1xuICAgICAgICBjb25zdCBmcm9tID0gcGFyc2VGbG9hdChtYXAuZnJvbSk7XG4gICAgICAgIGNvbnN0IHRvID0gcGFyc2VGbG9hdChtYXAudG8pO1xuICAgICAgICBpZiAodG8gPj0gZGF0YS52YWx1ZVJvdW5kZWQgJiYgZnJvbSA8PSBkYXRhLnZhbHVlUm91bmRlZCkge1xuICAgICAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSBtYXAudGV4dDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGF0YS52YWx1ZSA9PT0gbnVsbCB8fCBkYXRhLnZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSBcIm5vIHZhbHVlXCI7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlVmFsdWVNYXAobWFwKSB7XG4gICAgY29uc3QgaW5kZXggPSBfLmluZGV4T2YodGhpcy5wYW5lbC52YWx1ZU1hcHMsIG1hcCk7XG4gICAgdGhpcy5wYW5lbC52YWx1ZU1hcHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgYWRkVmFsdWVNYXAoKSB7XG4gICAgdGhpcy5wYW5lbC52YWx1ZU1hcHMucHVzaCh7IHZhbHVlOiBcIlwiLCBvcDogXCI9XCIsIHRleHQ6IFwiXCIgfSk7XG4gIH1cblxuICByZW1vdmVSYW5nZU1hcChyYW5nZU1hcCkge1xuICAgIGNvbnN0IGluZGV4ID0gXy5pbmRleE9mKHRoaXMucGFuZWwucmFuZ2VNYXBzLCByYW5nZU1hcCk7XG4gICAgdGhpcy5wYW5lbC5yYW5nZU1hcHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgYWRkUmFuZ2VNYXAoKSB7XG4gICAgdGhpcy5wYW5lbC5yYW5nZU1hcHMucHVzaCh7IGZyb206IFwiXCIsIHRvOiBcIlwiLCB0ZXh0OiBcIlwiIH0pO1xuICB9XG5cbiAgbGluayhzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwpIHtcbiAgICBjb25zdCAkbG9jYXRpb24gPSB0aGlzLiRsb2NhdGlvbjtcbiAgICAvLyBjb25zdCBsaW5rU3J2ID0gdGhpcy5saW5rU3J2O1xuICAgIGNvbnN0ICR0aW1lb3V0ID0gdGhpcy4kdGltZW91dDtcbiAgICBjb25zdCAkc2FuaXRpemUgPSB0aGlzLiRzYW5pdGl6ZTtcbiAgICBjb25zdCBwYW5lbCA9IGN0cmwucGFuZWw7XG4gICAgY29uc3QgdGVtcGxhdGVTcnYgPSB0aGlzLnRlbXBsYXRlU3J2O1xuICAgIGxldCBkYXRhLCBsaW5rSW5mbztcbiAgICBjb25zdCAkcGFuZWxDb250YWluZXIgPSBlbGVtLmZpbmQoXCIucGFuZWwtY29udGFpbmVyXCIpO1xuICAgIGVsZW0gPSBlbGVtLmZpbmQoXCIuc2luZ2xlc3RhdC1wYW5lbFwiKTtcblxuICAgIGZ1bmN0aW9uIGFwcGx5Q29sb3JpbmdUaHJlc2hvbGRzKHZhbHVlU3RyaW5nKSB7XG4gICAgICBjb25zdCBjb2xvciA9IGdldENvbG9yRm9yVmFsdWUoZGF0YSwgZGF0YS52YWx1ZSk7XG4gICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgcmV0dXJuICc8c3BhbiBzdHlsZT1cImNvbG9yOicgKyBjb2xvciArICdcIj4nICsgdmFsdWVTdHJpbmcgKyBcIjwvc3Bhbj5cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlU3RyaW5nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNwYW4oY2xhc3NOYW1lLCBmb250U2l6ZSwgYXBwbHlDb2xvcmluZywgdmFsdWUpIHtcbiAgICAgIHZhbHVlID0gJHNhbml0aXplKHRlbXBsYXRlU3J2LnJlcGxhY2UodmFsdWUsIGRhdGEuc2NvcGVkVmFycykpO1xuICAgICAgdmFsdWUgPSBhcHBseUNvbG9yaW5nID8gYXBwbHlDb2xvcmluZ1RocmVzaG9sZHModmFsdWUpIDogdmFsdWU7XG4gICAgICBjb25zdCBwaXhlbFNpemUgPSAocGFyc2VJbnQoZm9udFNpemUsIDEwKSAvIDEwMCkgKiBCQVNFX0ZPTlRfU0laRTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICc8c3BhbiBjbGFzcz1cIicgK1xuICAgICAgICBjbGFzc05hbWUgK1xuICAgICAgICAnXCIgc3R5bGU9XCJmb250LXNpemU6JyArXG4gICAgICAgIHBpeGVsU2l6ZSArXG4gICAgICAgICdweFwiPicgK1xuICAgICAgICB2YWx1ZSArXG4gICAgICAgIFwiPC9zcGFuPlwiXG4gICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJpZ1ZhbHVlSHRtbCgpIHtcbiAgICAgIGxldCBib2R5ID0gJzxkaXYgY2xhc3M9XCJzaW5nbGVzdGF0LXBhbmVsLXZhbHVlLWNvbnRhaW5lclwiPic7XG5cbiAgICAgIGlmIChwYW5lbC5wcmVmaXgpIHtcbiAgICAgICAgYm9keSArPSBnZXRTcGFuKFxuICAgICAgICAgIFwic2luZ2xlc3RhdC1wYW5lbC1wcmVmaXhcIixcbiAgICAgICAgICBwYW5lbC5wcmVmaXhGb250U2l6ZSxcbiAgICAgICAgICBwYW5lbC5jb2xvclByZWZpeCxcbiAgICAgICAgICBwYW5lbC5wcmVmaXhcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgYm9keSArPSBnZXRTcGFuKFxuICAgICAgICBcInNpbmdsZXN0YXQtcGFuZWwtdmFsdWVcIixcbiAgICAgICAgcGFuZWwudmFsdWVGb250U2l6ZSxcbiAgICAgICAgcGFuZWwuY29sb3JWYWx1ZSxcbiAgICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZFxuICAgICAgKTtcblxuICAgICAgaWYgKHBhbmVsLnBvc3RmaXgpIHtcbiAgICAgICAgYm9keSArPSBnZXRTcGFuKFxuICAgICAgICAgIFwic2luZ2xlc3RhdC1wYW5lbC1wb3N0Zml4XCIsXG4gICAgICAgICAgcGFuZWwucG9zdGZpeEZvbnRTaXplLFxuICAgICAgICAgIHBhbmVsLmNvbG9yUG9zdGZpeCxcbiAgICAgICAgICBwYW5lbC5wb3N0Zml4XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGJvZHkgKz0gXCI8L2Rpdj5cIjtcblxuICAgICAgcmV0dXJuIGJvZHk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VmFsdWVUZXh0KCkge1xuICAgICAgbGV0IHJlc3VsdCA9IHBhbmVsLnByZWZpeFxuICAgICAgICA/IHRlbXBsYXRlU3J2LnJlcGxhY2UocGFuZWwucHJlZml4LCBkYXRhLnNjb3BlZFZhcnMpXG4gICAgICAgIDogXCJcIjtcbiAgICAgIHJlc3VsdCArPSBkYXRhLnZhbHVlRm9ybWF0dGVkO1xuICAgICAgcmVzdWx0ICs9IHBhbmVsLnBvc3RmaXhcbiAgICAgICAgPyB0ZW1wbGF0ZVNydi5yZXBsYWNlKHBhbmVsLnBvc3RmaXgsIGRhdGEuc2NvcGVkVmFycylcbiAgICAgICAgOiBcIlwiO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZEdhdWdlKCkge1xuXG4gICAgICBjb25zdCB3aWR0aCA9IGVsZW0ud2lkdGgoKTtcbiAgICAgIGNvbnN0IGhlaWdodCA9IGVsZW0uaGVpZ2h0KCk7XG4gICAgICAvLyBBbGxvdyB0byB1c2UgYSBiaXQgbW9yZSBzcGFjZSBmb3Igd2lkZSBnYXVnZXNcbiAgICAgIGNvbnN0IGRpbWVuc2lvbiA9IE1hdGgubWluKHdpZHRoLCBoZWlnaHQgKiAxLjMpO1xuXG4gICAgICBjdHJsLmludmFsaWRHYXVnZVJhbmdlID0gZmFsc2U7XG4gICAgICBpZiAocGFuZWwuZ2F1Z2UubWluVmFsdWUgPiBwYW5lbC5nYXVnZS5tYXhWYWx1ZSkge1xuICAgICAgICBjdHJsLmludmFsaWRHYXVnZVJhbmdlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwbG90Q2FudmFzID0gJChcIjxkaXY+PC9kaXY+XCIpO1xuICAgICAgY29uc3QgcGxvdENzcyA9IHtcbiAgICAgICAgdG9wOiBcIjEwcHhcIixcbiAgICAgICAgbWFyZ2luOiBcImF1dG9cIixcbiAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQgKiAwLjkgKyBcInB4XCIsXG4gICAgICAgIHdpZHRoOiBkaW1lbnNpb24gKyBcInB4XCIsXG4gICAgICB9O1xuXG4gICAgICBwbG90Q2FudmFzLmNzcyhwbG90Q3NzKTtcbiAgICAgIC8vZWxlbWVudC5jc3MocGxvdENzcyk7XG5cbiAgICAgIGNvbnN0IHRocmVzaG9sZHMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS50aHJlc2hvbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRocmVzaG9sZHMucHVzaCh7XG4gICAgICAgICAgdmFsdWU6IGRhdGEudGhyZXNob2xkc1tpXSxcbiAgICAgICAgICBjb2xvcjogZGF0YS5jb2xvck1hcFtpXSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aHJlc2hvbGRzLnB1c2goe1xuICAgICAgICB2YWx1ZTogcGFuZWwuZ2F1Z2UubWF4VmFsdWUsXG4gICAgICAgIGNvbG9yOiBkYXRhLmNvbG9yTWFwW2RhdGEuY29sb3JNYXAubGVuZ3RoIC0gMV0sXG4gICAgICB9KTtcblxuICAgICAgLy9TZSBjcmVhIGVsIG51ZXZvIGdhdWdlXG4gICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZWxlbWVudC5pZCA9ICcjZ2F1Z2VBcmVhJztcbiAgICAgICAgLy8gRWxlbWVudCBpbnNpZGUgd2hpY2ggeW91IHdhbnQgdG8gc2VlIHRoZSBjaGFydFxuICAgICAgbGV0IG5lZWRsZVZhbHVlID0gcGFyc2VGbG9hdChnZXRWYWx1ZVRleHQoKSk7XG4gICAgICAvLyAgIC8vUHJvcGVydGllcyBvZiB0aGUgZ2F1Z2VcbiAgICAgIGxldCBnYXVnZU9wdGlvbnMgPSB7XG4gICAgICAgIC8vIG5lZWRsZSBvcHRpb25zXG4gICAgICAgIGhhc05lZWRsZTogdHJ1ZSxcbiAgICAgICAgb3V0ZXJOZWVkbGU6IGZhbHNlLFxuICAgICAgICBuZWVkbGVDb2xvcjogJyNmZmYnLFxuICAgICAgICBuZWVkbGVTdGFydFZhbHVlOiAobmVlZGxlVmFsdWUgLyBwYW5lbC5nYXVnZS5tYXhWYWx1ZSkgKiAxMDAsXG4gICAgICAgIG5lZWRsZVVwZGF0ZVNwZWVkOiAxMDAsXG4gICAgICAgIG5lZWRsZVZhbHVlOiAobmVlZGxlVmFsdWUgLyBwYW5lbC5nYXVnZS5tYXhWYWx1ZSkgKiAxMDAsXG4gICAgICAgIC8vIGFyYyBvcHRpb25zXG4gICAgICAgIGFyY0NvbG9yczogWy4uLnBhbmVsLmNvbG9yc10sIC8vIHNpcnZlIHBhcmEgbG9zIGNvbG9yZXMgZGUgbG9zIHRocmVzaG9sZCB5IHNpIHF1aWVybyBsb3MgcXVlIHZpZW5lIHBvciBkZWZhdWx0IGxvIGRlam8gZW4gYmxhbmNvXG4gICAgICAgIGFyY0RlbGltaXRlcnM6IFsuLi5wYW5lbC50aHJlc2hvbGRzLnRyaW0oKS5zcGxpdChcIixcIikubWFwKHBhcnNlRmxvYXQpLmZpbHRlcihpdGVtID0+IGl0ZW0gPiAwKV0ubWFwKCh0aHJlc2hvbGQpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aHJlc2hvbGQpO1xuICAgICAgICAgIHRocmVzaG9sZCA9IHBhcnNlRmxvYXQodGhyZXNob2xkKTtcbiAgICAgICAgICBsZXQgZGVsaW1pdGVyID0gKHRocmVzaG9sZCAvIHBhbmVsLmdhdWdlLm1heFZhbHVlKSAqIDEwMDtcbiAgICAgICAgICByZXR1cm4gZGVsaW1pdGVyO1xuICAgICAgICB9KSxcbiAgICAgICAgYXJjUGFkZGluZzogNixcbiAgICAgICAgYXJjUGFkZGluZ0NvbG9yOiAnIzAwMCcsXG4gICAgICAgIGFyY0xhYmVsczogZGF0YS50aHJlc2hvbGRzLCAvL1NvbG8gbGxlZ2EgaGFzdGEgMTAwXG4gICAgICAgIGFyY0xhYmVsRm9udFNpemU6IHRydWUsXG4gICAgICAgIGFyY092ZXJFZmZlY3Q6IHRydWUsXG4gICAgICAgIC8vYXJjT3ZlckVmZmVjdDogZmFsc2UsXG4gICAgICAgIC8vIGxhYmVsIG9wdGlvbnNcbiAgICAgICAgcmFuZ2VMYWJlbDogW3BhbmVsLmdhdWdlLm1pblZhbHVlICsgJycsIHBhbmVsLmdhdWdlLm1heFZhbHVlICsgJyddLFxuICAgICAgICBjZW50cmFsTGFiZWw6IGRhdGEudmFsdWVGb3JtYXR0ZWQgKyAnJyxcbiAgICAgICAgcmFuZ2VMYWJlbEZvbnRTaXplOiBwYW5lbC5nYXVnZS5mb250U2l6ZSxcbiAgICAgICAgbGFiZWxzRm9udDogJ0NvbnNvbGFzJyxcbiAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vICAgLy8gLy8gLy8gLy8gRHJhd2luZyBhbmQgdXBkYXRpbmcgdGhlIGNoYXJ0XG4gICAgICBsZXQgZ2F1Z2VDaGFydCA9IEdhdWdlQ2hhcnQuZ2F1Z2VDaGFydChlbGVtZW50LCA1MDAsIGdhdWdlT3B0aW9ucyk7XG5cbiAgICAgIFxuXG4gICAgICBjb25zdCBiZ0NvbG9yID0gY29uZmlnLmJvb3REYXRhLnVzZXIubGlnaHRUaGVtZVxuICAgICAgICA/IFwicmdiKDIzMCwyMzAsMjMwKVwiXG4gICAgICAgIDogXCJyZ2IoMzgsMzgsMzgpXCI7XG4gICAgICAvL0FqdXN0YSBlbCBmb250U2l6ZSBkZW50cm8gZGVsIEdhdWdlXG4gICAgICBjb25zdCBmb250U2NhbGUgPSBwYXJzZUludChwYW5lbC52YWx1ZUZvbnRTaXplLCA3KSAvIDEwMDtcbiAgICAgIGNvbnN0IGZvbnRTaXplID0gTWF0aC5taW4oZGltZW5zaW9uIC8gNSwgMTAwKSAqIGZvbnRTY2FsZTtcbiAgICAgIC8vIFJlZHVjZSBnYXVnZSB3aWR0aCBpZiB0aHJlc2hvbGQgbGFiZWxzIGVuYWJsZWRcbiAgICAgIGNvbnN0IGdhdWdlV2lkdGhSZWR1Y2VSYXRpbyA9IHBhbmVsLmdhdWdlLnRocmVzaG9sZExhYmVscyA/IDEuNSA6IDE7XG4gICAgICBjb25zdCBnYXVnZVdpZHRoID0gTWF0aC5taW4oZGltZW5zaW9uIC8gNCwgNjApIC8gZ2F1Z2VXaWR0aFJlZHVjZVJhdGlvO1xuICAgICAgY29uc3QgdGhyZXNob2xkTWFya2Vyc1dpZHRoID0gZ2F1Z2VXaWR0aCAvIDc7XG4gICAgICBjb25zdCB0aHJlc2hvbGRMYWJlbEZvbnRTaXplID0gZm9udFNpemUgLyAzLjI7XG5cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHNlcmllczoge1xuICAgICAgICAgIGdhdWdlczoge1xuICAgICAgICAgICAgZ2F1Z2U6IHtcbiAgICAgICAgICAgICAgLy9BanVzdGFyIGVsIHRhbWFubyB5IGVzcGFjaW8gZGVsIG1pblZhbHVlIHkgbWF4VmFsdWVcbiAgICAgICAgICAgICAgbWluOiBwYW5lbC5nYXVnZS5taW5WYWx1ZSxcbiAgICAgICAgICAgICAgbWF4OiBwYW5lbC5nYXVnZS5tYXhWYWx1ZSxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogeyBjb2xvcjogYmdDb2xvciB9LFxuICAgICAgICAgICAgICBib3JkZXI6IHsgY29sb3I6IG51bGwgfSxcbiAgICAgICAgICAgICAgc2hhZG93OiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICAgIHdpZHRoOiBnYXVnZVdpZHRoLFxuICAgICAgICAgICAgICAvLyAgd2lkdGg6IFwiYXV0b1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZyYW1lOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICBsYWJlbDogeyBzaG93OiBmYWxzZSB9LFxuICAgICAgICAgICAgbGF5b3V0OiB7IG1hcmdpbjogMCwgdGhyZXNob2xkV2lkdGg6IDAgfSxcbiAgICAgICAgICAgIGNlbGw6IHsgYm9yZGVyOiB7IHdpZHRoOiAwIH0gfSxcbiAgICAgICAgICAgIHRocmVzaG9sZDoge1xuICAgICAgICAgICAgICB2YWx1ZXM6IHRocmVzaG9sZHMsXG4gICAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogcGFuZWwuZ2F1Z2UudGhyZXNob2xkTGFiZWxzLFxuICAgICAgICAgICAgICAgIG1hcmdpbjogdGhyZXNob2xkTWFya2Vyc1dpZHRoICsgMTAsXG4gICAgICAgICAgICAgICAgZm9udDogeyBzaXplOiB0aHJlc2hvbGRMYWJlbEZvbnRTaXplIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNob3c6IHBhbmVsLmdhdWdlLnRocmVzaG9sZE1hcmtlcnMsXG4gICAgICAgICAgICAgIHdpZHRoOiB0aHJlc2hvbGRNYXJrZXJzV2lkdGgsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgY29sb3I6IHBhbmVsLmNvbG9yVmFsdWVcbiAgICAgICAgICAgICAgICA/IGdldENvbG9yRm9yVmFsdWUoZGF0YSwgZGF0YS52YWx1ZVJvdW5kZWQpXG4gICAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgICBmb3JtYXR0ZXI6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0VmFsdWVUZXh0KCk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGZvbnQ6IHtcbiAgICAgICAgICAgICAgICBzaXplOiBmb250U2l6ZSxcbiAgICAgICAgICAgICAgICBmYW1pbHk6ICdcIkhlbHZldGljYSBOZXVlXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgLy8gZWxlbS5hcHBlbmQocGxvdENhbnZhcyk7XG4gICAgICBlbGVtLmFwcGVuZChlbGVtZW50KTtcblxuICAgICAgY29uc3QgcGxvdFNlcmllcyA9IHtcbiAgICAgICAgZGF0YTogW1swLCBkYXRhLnZhbHVlXV0sXG4gICAgICB9O1xuXG4gICAgICAkLnBsb3QocGxvdENhbnZhcywgW3Bsb3RTZXJpZXNdLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRTcGFya2xpbmUoKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IGVsZW0ud2lkdGgoKSArIDIwO1xuICAgICAgaWYgKHdpZHRoIDwgMzApIHtcbiAgICAgICAgLy8gZWxlbWVudCBoYXMgbm90IGdvdHRlbiBpdCdzIHdpZHRoIHlldFxuICAgICAgICAvLyBkZWxheSBzcGFya2xpbmUgcmVuZGVyXG4gICAgICAgIHNldFRpbWVvdXQoYWRkU3BhcmtsaW5lLCAzMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaGVpZ2h0ID0gY3RybC5oZWlnaHQ7XG4gICAgICBjb25zdCBwbG90Q2FudmFzID0gJChcIjxkaXY+PC9kaXY+XCIpO1xuICAgICAgY29uc3QgcGxvdENzczogYW55ID0ge307XG4gICAgICBwbG90Q3NzLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXG4gICAgICBpZiAocGFuZWwuc3BhcmtsaW5lLmZ1bGwpIHtcbiAgICAgICAgcGxvdENzcy5ib3R0b20gPSBcIjVweFwiO1xuICAgICAgICBwbG90Q3NzLmxlZnQgPSBcIi01cHhcIjtcbiAgICAgICAgcGxvdENzcy53aWR0aCA9IHdpZHRoIC0gMTAgKyBcInB4XCI7XG4gICAgICAgIGNvbnN0IGR5bmFtaWNIZWlnaHRNYXJnaW4gPVxuICAgICAgICAgIGhlaWdodCA8PSAxMDAgPyA1IDogTWF0aC5yb3VuZChoZWlnaHQgLyAxMDApICogMTUgKyA1O1xuICAgICAgICBwbG90Q3NzLmhlaWdodCA9IGhlaWdodCAtIGR5bmFtaWNIZWlnaHRNYXJnaW4gKyBcInB4XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbG90Q3NzLmJvdHRvbSA9IFwiMHB4XCI7XG4gICAgICAgIHBsb3RDc3MubGVmdCA9IFwiLTVweFwiO1xuICAgICAgICBwbG90Q3NzLndpZHRoID0gd2lkdGggLSAxMCArIFwicHhcIjtcbiAgICAgICAgcGxvdENzcy5oZWlnaHQgPSBNYXRoLmZsb29yKGhlaWdodCAqIDAuMjUpICsgXCJweFwiO1xuICAgICAgfVxuXG4gICAgICBwbG90Q2FudmFzLmNzcyhwbG90Q3NzKTtcblxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgbGVnZW5kOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgIHNlcmllczoge1xuICAgICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgZmlsbDogMSxcbiAgICAgICAgICAgIHplcm86IGZhbHNlLFxuICAgICAgICAgICAgbGluZVdpZHRoOiAxLFxuICAgICAgICAgICAgZmlsbENvbG9yOiBwYW5lbC5zcGFya2xpbmUuZmlsbENvbG9yLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHlheGVzOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgIHhheGlzOiB7XG4gICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgbW9kZTogXCJ0aW1lXCIsXG4gICAgICAgICAgbWluOiBjdHJsLnJhbmdlLmZyb20udmFsdWVPZigpLFxuICAgICAgICAgIG1heDogY3RybC5yYW5nZS50by52YWx1ZU9mKCksXG4gICAgICAgIH0sXG4gICAgICAgIGdyaWQ6IHsgaG92ZXJhYmxlOiBmYWxzZSwgc2hvdzogZmFsc2UgfSxcbiAgICAgIH07XG5cbiAgICAgIGVsZW0uYXBwZW5kKHBsb3RDYW52YXMpO1xuICAgICAgXG5cbiAgICAgIGNvbnN0IHBsb3RTZXJpZXMgPSB7XG4gICAgICAgIGRhdGE6IGRhdGEuZmxvdHBhaXJzLFxuICAgICAgICBjb2xvcjogcGFuZWwuc3BhcmtsaW5lLmxpbmVDb2xvcixcbiAgICAgIH07XG5cbiAgICAgICQucGxvdChwbG90Q2FudmFzLCBbcGxvdFNlcmllc10sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIGlmICghY3RybC5kYXRhKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRhdGEgPSBjdHJsLmRhdGE7XG5cbiAgICAgIC8vIGdldCB0aHJlc2hvbGRzXG4gICAgICBkYXRhLnRocmVzaG9sZHMgPSBwYW5lbC50aHJlc2hvbGRzLnNwbGl0KFwiLFwiKS5tYXAoKHN0clZhbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIE51bWJlcihzdHJWYWxlLnRyaW0oKSk7XG4gICAgICB9KTtcbiAgICAgIGRhdGEuY29sb3JNYXAgPSBwYW5lbC5jb2xvcnM7XG5cbiAgICAgIGNvbnN0IGJvZHkgPSBwYW5lbC5nYXVnZS5zaG93ID8gXCJcIiA6IGdldEJpZ1ZhbHVlSHRtbCgpO1xuXG4gICAgICBpZiAocGFuZWwuY29sb3JCYWNrZ3JvdW5kKSB7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gZ2V0Q29sb3JGb3JWYWx1ZShkYXRhLCBkYXRhLnZhbHVlKTtcbiAgICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgICAgJHBhbmVsQ29udGFpbmVyLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgY29sb3IpO1xuICAgICAgICAgIGlmIChzY29wZS5mdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBlbGVtLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgY29sb3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgXCJcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkcGFuZWxDb250YWluZXIuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIlwiKTtcbiAgICAgICAgZWxlbS5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiXCIpO1xuICAgICAgfVxuXG4gICAgICBlbGVtLmh0bWwoYm9keSk7XG5cbiAgICAgIGlmIChwYW5lbC5zcGFya2xpbmUuc2hvdykge1xuICAgICAgICBhZGRTcGFya2xpbmUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhbmVsLmdhdWdlLnNob3cpIHtcbiAgICAgICAgYWRkR2F1Z2UoKTtcbiAgICAgIH1cblxuICAgICAgZWxlbS50b2dnbGVDbGFzcyhcInBvaW50ZXJcIiwgcGFuZWwubGlua3MubGVuZ3RoID4gMCk7XG5cbiAgICAgIGlmIChwYW5lbC5saW5rcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGxpbmtJbmZvID0gbGlua1Nydi5nZXRQYW5lbExpbmtBbmNob3JJbmZvKHBhbmVsLmxpbmtzWzBdLCBkYXRhLnNjb3BlZFZhcnMpO1xuICAgICAgICBsaW5rSW5mbyA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaW5rSW5mbyA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaG9va3VwRHJpbGxkb3duTGlua1Rvb2x0aXAoKSB7XG4gICAgICAvLyBkcmlsbGRvd24gbGluayB0b29sdGlwXG4gICAgICBjb25zdCBkcmlsbGRvd25Ub29sdGlwID0gJCgnPGRpdiBpZD1cInRvb2x0aXBcIiBjbGFzcz1cIlwiPmhlbGxvPC9kaXY+XCInKTtcblxuICAgICAgZWxlbS5tb3VzZWxlYXZlKCgpID0+IHtcbiAgICAgICAgaWYgKHBhbmVsLmxpbmtzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAkdGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZHJpbGxkb3duVG9vbHRpcC5kZXRhY2goKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZWxlbS5jbGljaygoZXZ0KSA9PiB7XG4gICAgICAgIGlmICghbGlua0luZm8pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWdub3JlIHRpdGxlIGNsaWNrcyBpbiB0aXRsZVxuICAgICAgICBpZiAoJChldnQpLnBhcmVudHMoXCIucGFuZWwtaGVhZGVyXCIpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlua0luZm8udGFyZ2V0ID09PSBcIl9ibGFua1wiKSB7XG4gICAgICAgICAgd2luZG93Lm9wZW4obGlua0luZm8uaHJlZiwgXCJfYmxhbmtcIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpbmtJbmZvLmhyZWYuaW5kZXhPZihcImh0dHBcIikgPT09IDApIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpbmtJbmZvLmhyZWY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJGxvY2F0aW9uLnVybChsaW5rSW5mby5ocmVmKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRyaWxsZG93blRvb2x0aXAuZGV0YWNoKCk7XG4gICAgICB9KTtcblxuICAgICAgZWxlbS5tb3VzZW1vdmUoKGUpID0+IHtcbiAgICAgICAgaWYgKCFsaW5rSW5mbykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRyaWxsZG93blRvb2x0aXAudGV4dChcImNsaWNrIHRvIGdvIHRvOiBcIiArIGxpbmtJbmZvLnRpdGxlKTtcbiAgICAgICAgZHJpbGxkb3duVG9vbHRpcC5wbGFjZV90dChlLnBhZ2VYLCBlLnBhZ2VZIC0gNTApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaG9va3VwRHJpbGxkb3duTGlua1Rvb2x0aXAoKTtcblxuICAgIHRoaXMuZXZlbnRzLm9uKFwicmVuZGVyXCIsICgpID0+IHtcbiAgICAgIHJlbmRlcigpO1xuICAgICAgY3RybC5yZW5kZXJpbmdDb21wbGV0ZWQoKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDb2xvckZvclZhbHVlKGRhdGEsIHZhbHVlKSB7XG4gIGlmICghXy5pc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSBkYXRhLnRocmVzaG9sZHMubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgaWYgKHZhbHVlID49IGRhdGEudGhyZXNob2xkc1tpIC0gMV0pIHtcbiAgICAgIHJldHVybiBkYXRhLmNvbG9yTWFwW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfLmZpcnN0KGRhdGEuY29sb3JNYXApO1xufVxuXG5leHBvcnQgeyBCbGVuZFN0YXRDdHJsLCBCbGVuZFN0YXRDdHJsIGFzIFBhbmVsQ3RybCwgZ2V0Q29sb3JGb3JWYWx1ZSB9O1xuIl19