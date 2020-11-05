System.register(["jquery.flot", "./lib/flot/jquery.flot.gauge", "jquery.flot.time", "jquery.flot.crosshair", "lodash", "jquery", "app/core/utils/kbn", "app/core/time_series2", "app/plugins/sdk", "./lib/flot/gauge-chart"], function (exports_1, context_1) {
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
    var lodash_1, jquery_1, kbn_1, time_series2_1, sdk_1, GaugeChart, BASE_FONT_SIZE, BlendStatCtrl;
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
                        var gaugeChart = GaugeChart.gaugeChart(element, height > width ? width : height, gaugeOptions);
                        elem.append(element);
                        var textInsertion = document.createElement('div');
                        textInsertion.id = 'textInsertion';
                        textInsertion.style.textAlign = 'center';
                        textInsertion.style.transform = "translateY(-45px)";
                        textInsertion.style.fontFamily = "Consolas";
                        textInsertion.style.fontSize = (((element.offsetWidth / 20) / 16) * (panel.gauge.fontSizeText ? panel.gauge.fontSizeText : 18)) + "px";
                        textInsertion.style.color = "#fff";
                        textInsertion.textContent = panel.gauge.textInsertion;
                        element.append(textInsertion);
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
                        var image = new Image(75);
                        image.src =
                            "https://www.softtek.com/images/content/design2015/LogoCompleto-Website-20.png";
                        image.style.opacity = "0.7";
                        image.style.width = "7%";
                        image.style.position = "absolute";
                        image.style.display = "block";
                        image.style.left = "1%";
                        image.style.bottom = "2%";
                        image.id = "logo";
                        image.onmouseover = function () {
                            image.src =
                                "https://static.cinepolis.com/img/lg-cinepolis-new.png";
                            image.style.opacity = "0.7";
                            image.style.width = "7%";
                            image.style.position = "absolute";
                            image.style.display = "block";
                            image.style.left = "1%";
                            image.style.bottom = "2%";
                        };
                        image.onmouseleave = function () {
                            image.src =
                                "https://www.softtek.com/images/content/design2015/LogoCompleto-Website-20.png";
                            image.style.opacity = "0.7";
                            image.style.width = "7%";
                            image.style.position = "absolute";
                            image.style.display = "block";
                            image.style.left = "1%";
                            image.style.bottom = "2%";
                        };
                        var panelContents = document.getElementsByClassName("singlestat-panel");
                        for (var i = 0; i < panelContents.length; i++) {
                            if (document.getElementById("logo")) {
                                document
                                    .getElementById("logo")
                                    .parentElement.removeChild(document.getElementById("logo"));
                            }
                            panelContents.item(i).style.backgroundColor = "#000";
                            panelContents.item(i).appendChild(image);
                        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQWc2QkEsMEJBQTBCLElBQUksRUFBRSxLQUFLO1FBQ25DLElBQUksQ0FBQyxnQkFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9DLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNuQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDekI7U0FDRjtRQUVELE9BQU8sZ0JBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBbDRCSyxjQUFjLEdBQUcsRUFBRSxDQUFDOztnQkFFRSxpQ0FBZ0I7Z0JBOEUxQyx1QkFBWSxNQUFNLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBVSxTQUFTO29CQUFuRSxZQUVFLGtCQUFNLE1BQU0sRUFBRSxTQUFTLENBQUMsU0FXekI7b0JBYnNDLGVBQVMsR0FBVCxTQUFTLENBQUE7b0JBQVUsZUFBUyxHQUFULFNBQVMsQ0FBQTtvQkEzRW5FLGNBQVEsR0FBRyxZQUFZLENBQUM7b0JBUXhCLHNCQUFnQixHQUFVO3dCQUN4QixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTt3QkFDN0IsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7d0JBQzdCLEVBQUUsS0FBSyxFQUFFLEtBQUss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c0JBQWdCOzs7UUFtNEI1QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cblxuLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbi8vIENvcHlyaWdodCAoYykgMjAxNiBHcmFmYW5hXG5cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4vLyBTT0ZUV0FSRS5cblxuaW1wb3J0IFwianF1ZXJ5LmZsb3RcIjtcbmltcG9ydCBcIi4vbGliL2Zsb3QvanF1ZXJ5LmZsb3QuZ2F1Z2VcIjtcbmltcG9ydCBcImpxdWVyeS5mbG90LnRpbWVcIjtcbmltcG9ydCBcImpxdWVyeS5mbG90LmNyb3NzaGFpclwiO1xuXG5cbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbi8vIGltcG9ydCAndmVuZG9yL2Zsb3QvanF1ZXJ5LmZsb3QnO1xuLy8gaW1wb3J0ICd2ZW5kb3IvZmxvdC9qcXVlcnkuZmxvdC5nYXVnZSc7XG4vLyBpbXBvcnQgJ2FwcC9mZWF0dXJlcy9kYXNoYm9hcmQvcGFuZWxsaW5rcy9saW5rX3Nydic7XG5cbmltcG9ydCBrYm4gZnJvbSBcImFwcC9jb3JlL3V0aWxzL2tiblwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiYXBwL2NvcmUvY29uZmlnXCI7XG5pbXBvcnQgVGltZVNlcmllcyBmcm9tIFwiYXBwL2NvcmUvdGltZV9zZXJpZXMyXCI7XG5pbXBvcnQgeyBNZXRyaWNzUGFuZWxDdHJsIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xuaW1wb3J0ICogYXMgR2F1Z2VDaGFydCBmcm9tIFwiLi9saWIvZmxvdC9nYXVnZS1jaGFydFwiO1xuXG5jb25zdCBCQVNFX0ZPTlRfU0laRSA9IDM4O1xuXG5jbGFzcyBCbGVuZFN0YXRDdHJsIGV4dGVuZHMgTWV0cmljc1BhbmVsQ3RybCB7XG4gIHN0YXRpYyB0ZW1wbGF0ZVVybCA9IFwibW9kdWxlLmh0bWxcIjtcblxuICBkYXRhVHlwZSA9IFwidGltZXNlcmllc1wiO1xuICBzZXJpZXM6IGFueVtdO1xuICBkYXRhOiBhbnk7XG4gIGZvbnRTaXplczogYW55W107XG4gIHVuaXRGb3JtYXRzOiBhbnlbXTtcbiAgaW52YWxpZEdhdWdlUmFuZ2U6IGJvb2xlYW47XG4gIHBhbmVsOiBhbnk7XG4gIGV2ZW50czogYW55O1xuICB2YWx1ZU5hbWVPcHRpb25zOiBhbnlbXSA9IFtcbiAgICB7IHZhbHVlOiBcIm1pblwiLCB0ZXh0OiBcIk1pblwiIH0sXG4gICAgeyB2YWx1ZTogXCJtYXhcIiwgdGV4dDogXCJNYXhcIiB9LFxuICAgIHsgdmFsdWU6IFwiYXZnXCIsIHRleHQ6IFwiQXZlcmFnZVwiIH0sXG4gICAgeyB2YWx1ZTogXCJjdXJyZW50XCIsIHRleHQ6IFwiQ3VycmVudFwiIH0sXG4gICAgeyB2YWx1ZTogXCJ0b3RhbFwiLCB0ZXh0OiBcIlRvdGFsXCIgfSxcbiAgICB7IHZhbHVlOiBcIm5hbWVcIiwgdGV4dDogXCJOYW1lXCIgfSxcbiAgICB7IHZhbHVlOiBcImZpcnN0XCIsIHRleHQ6IFwiRmlyc3RcIiB9LFxuICAgIHsgdmFsdWU6IFwiZGVsdGFcIiwgdGV4dDogXCJEZWx0YVwiIH0sXG4gICAgeyB2YWx1ZTogXCJkaWZmXCIsIHRleHQ6IFwiRGlmZmVyZW5jZVwiIH0sXG4gICAgeyB2YWx1ZTogXCJyYW5nZVwiLCB0ZXh0OiBcIlJhbmdlXCIgfSxcbiAgICB7IHZhbHVlOiBcImxhc3RfdGltZVwiLCB0ZXh0OiBcIlRpbWUgb2YgbGFzdCBwb2ludFwiIH0sXG4gIF07XG4gIGJsZW5kTmFtZU9wdGlvbnM6IGFueVtdID0gW1xuICAgIHsgdmFsdWU6IFwibWluXCIsIHRleHQ6IFwiTWluXCIgfSxcbiAgICB7IHZhbHVlOiBcIm1heFwiLCB0ZXh0OiBcIk1heFwiIH0sXG4gICAgeyB2YWx1ZTogXCJhdmdcIiwgdGV4dDogXCJBdmVyYWdlXCIgfSxcbiAgICB7IHZhbHVlOiBcInRvdGFsXCIsIHRleHQ6IFwiVG90YWxcIiB9LFxuICBdO1xuICB0YWJsZUNvbHVtbk9wdGlvbnM6IGFueTtcblxuICAvLyBTZXQgYW5kIHBvcHVsYXRlIGRlZmF1bHRzXG4gIHBhbmVsRGVmYXVsdHMgPSB7XG4gICAgbGlua3M6IFtdLFxuICAgIGRhdGFzb3VyY2U6IG51bGwsXG4gICAgbWF4RGF0YVBvaW50czogMTAwLFxuICAgIGludGVydmFsOiBudWxsLFxuICAgIHRhcmdldHM6IFt7fV0sXG4gICAgY2FjaGVUaW1lb3V0OiBudWxsLFxuICAgIGZvcm1hdDogXCJub25lXCIsXG4gICAgcHJlZml4OiBcIlwiLFxuICAgIHBvc3RmaXg6IFwiXCIsXG4gICAgbnVsbFRleHQ6IG51bGwsXG4gICAgdmFsdWVNYXBzOiBbeyB2YWx1ZTogXCJudWxsXCIsIG9wOiBcIj1cIiwgdGV4dDogXCJOL0FcIiB9XSxcbiAgICBtYXBwaW5nVHlwZXM6IFtcbiAgICAgIHsgbmFtZTogXCJ2YWx1ZSB0byB0ZXh0XCIsIHZhbHVlOiAxIH0sXG4gICAgICB7IG5hbWU6IFwicmFuZ2UgdG8gdGV4dFwiLCB2YWx1ZTogMiB9LFxuICAgIF0sXG4gICAgcmFuZ2VNYXBzOiBbeyBmcm9tOiBcIm51bGxcIiwgdG86IFwibnVsbFwiLCB0ZXh0OiBcIk4vQVwiIH1dLFxuICAgIG1hcHBpbmdUeXBlOiAxLFxuICAgIG51bGxQb2ludE1vZGU6IFwiY29ubmVjdGVkXCIsXG4gICAgdmFsdWVOYW1lOiBcImF2Z1wiLFxuICAgIGJsZW5kTmFtZTogXCJ0b3RhbFwiLFxuICAgIHByZWZpeEZvbnRTaXplOiBcIjUwJVwiLFxuICAgIHZhbHVlRm9udFNpemU6IFwiMTAwJVwiLFxuICAgIHBvc3RmaXhGb250U2l6ZTogXCI1MCVcIixcbiAgICB0aHJlc2hvbGRzOiBcIiBcIixcbiAgICBjb2xvckJhY2tncm91bmQ6IGZhbHNlLFxuICAgIGNvbG9yVmFsdWU6IGZhbHNlLFxuICAgIGNvbG9yczogW1wiIzI5OWM0NlwiLCBcInJnYmEoMjM3LCAxMjksIDQwLCAwLjg5KVwiLCBcIiNkNDRhM2FcIl0sXG4gICAgc3BhcmtsaW5lOiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIGZ1bGw6IGZhbHNlLFxuICAgICAgbGluZUNvbG9yOiBcInJnYigzMSwgMTIwLCAxOTMpXCIsXG4gICAgICBmaWxsQ29sb3I6IFwicmdiYSgzMSwgMTE4LCAxODksIDAuMTgpXCIsXG4gICAgfSxcbiAgICBnYXVnZToge1xuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICBtaW5WYWx1ZTogMCxcbiAgICAgIG1heFZhbHVlOiAxMDAsXG4gICAgICB0aHJlc2hvbGRNYXJrZXJzOiB0cnVlLFxuICAgICAgdGhyZXNob2xkTGFiZWxzOiBmYWxzZSxcbiAgICB9LFxuICAgIHRhYmxlQ29sdW1uOiBcIlwiLFxuICB9O1xuXG4gIC8qKiBAbmdJbmplY3QgKi9cbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkaW5qZWN0b3IsIHByaXZhdGUgJHNhbml0aXplLCBwcml2YXRlICRsb2NhdGlvbikge1xuICAgIC8vIHByaXZhdGUgbGlua1NydixcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XG4gICAgXy5kZWZhdWx0cyh0aGlzLnBhbmVsLCB0aGlzLnBhbmVsRGVmYXVsdHMpO1xuXG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLXJlY2VpdmVkXCIsIHRoaXMub25EYXRhUmVjZWl2ZWQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLWVycm9yXCIsIHRoaXMub25EYXRhRXJyb3IuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLXNuYXBzaG90LWxvYWRcIiwgdGhpcy5vbkRhdGFSZWNlaXZlZC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmV2ZW50cy5vbihcImluaXQtZWRpdC1tb2RlXCIsIHRoaXMub25Jbml0RWRpdE1vZGUuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLm9uU3BhcmtsaW5lQ29sb3JDaGFuZ2UgPSB0aGlzLm9uU3BhcmtsaW5lQ29sb3JDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uU3BhcmtsaW5lRmlsbENoYW5nZSA9IHRoaXMub25TcGFya2xpbmVGaWxsQ2hhbmdlLmJpbmQodGhpcyk7XG5cbiAgfVxuXG4gIG9uSW5pdEVkaXRNb2RlKCkge1xuICAgIHRoaXMuZm9udFNpemVzID0gW1xuICAgICAgXCIyMCVcIixcbiAgICAgIFwiMzAlXCIsXG4gICAgICBcIjUwJVwiLFxuICAgICAgXCI3MCVcIixcbiAgICAgIFwiODAlXCIsXG4gICAgICBcIjEwMCVcIixcbiAgICAgIFwiMTEwJVwiLFxuICAgICAgXCIxMjAlXCIsXG4gICAgICBcIjE1MCVcIixcbiAgICAgIFwiMTcwJVwiLFxuICAgICAgXCIyMDAlXCIsXG4gICAgXTtcbiAgICB0aGlzLmFkZEVkaXRvclRhYihcbiAgICAgIFwiT3B0aW9uc1wiLFxuICAgICAgXCJwdWJsaWMvcGx1Z2lucy9mYXJza2ktYmxlbmRzdGF0LXBhbmVsX25ldy9lZGl0b3IuaHRtbFwiLFxuICAgICAgMlxuICAgICk7XG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXG4gICAgICBcIlZhbHVlIE1hcHBpbmdzXCIsXG4gICAgICBcInB1YmxpYy9wbHVnaW5zL2ZhcnNraS1ibGVuZHN0YXQtcGFuZWxfbmV3L21hcHBpbmdzLmh0bWxcIixcbiAgICAgIDNcbiAgICApO1xuICAgIHRoaXMuYWRkRWRpdG9yVGFiKFxuICAgICAgXCJCbGVuZGluZ1wiLFxuICAgICAgXCJwdWJsaWMvcGx1Z2lucy9mYXJza2ktYmxlbmRzdGF0LXBhbmVsX25ldy9ibGVuZGluZy5odG1sXCIsXG4gICAgICA0XG4gICAgKTtcbiAgICB0aGlzLnVuaXRGb3JtYXRzID0ga2JuLmdldFVuaXRGb3JtYXRzKCk7XG5cblxuICB9XG5cbiAgc2V0VW5pdEZvcm1hdChzdWJJdGVtKSB7XG4gICAgdGhpcy5wYW5lbC5mb3JtYXQgPSBzdWJJdGVtLnZhbHVlO1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgb25EYXRhRXJyb3IoZXJyKSB7XG4gICAgdGhpcy5vbkRhdGFSZWNlaXZlZChbXSk7XG4gIH1cblxuICBvbkRhdGFSZWNlaXZlZChkYXRhTGlzdCkge1xuICAgIGlmIChkYXRhTGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCB0aW1lc3RhbXBzID0ge307XG4gICAgICBjb25zdCBjb3VudHMgPSB7fTtcblxuICAgICAgZm9yIChsZXQgc2VyaWVzIG9mIGRhdGFMaXN0KSB7XG4gICAgICAgIGZvciAobGV0IHBvaW50IG9mIHNlcmllcy5kYXRhcG9pbnRzKSB7XG4gICAgICAgICAgaWYgKHRpbWVzdGFtcHNbcG9pbnRbMV1dKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucGFuZWwuYmxlbmROYW1lKSB7XG4gICAgICAgICAgICAgIGNhc2UgXCJtaW5cIjpcbiAgICAgICAgICAgICAgICBpZiAocG9pbnRbMF0gPCB0aW1lc3RhbXBzW3BvaW50WzFdXSkge1xuICAgICAgICAgICAgICAgICAgdGltZXN0YW1wc1twb2ludFsxXV0gPSBwb2ludFswXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgXCJtYXhcIjpcbiAgICAgICAgICAgICAgICBpZiAocG9pbnRbMF0gPiB0aW1lc3RhbXBzW3BvaW50WzFdXSkge1xuICAgICAgICAgICAgICAgICAgdGltZXN0YW1wc1twb2ludFsxXV0gPSBwb2ludFswXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgXCJhdmdcIjpcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXBzW3BvaW50WzFdXSA9XG4gICAgICAgICAgICAgICAgICAodGltZXN0YW1wc1twb2ludFsxXV0gKiBjb3VudHNbcG9pbnRbMV1dICsgcG9pbnRbMF0pIC9cbiAgICAgICAgICAgICAgICAgIChjb3VudHNbcG9pbnRbMV1dICsgMSk7XG5cbiAgICAgICAgICAgICAgICBjb3VudHNbcG9pbnRbMV1dICs9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gRGVmYXVsdCBpcyB0b3RhbFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcHNbcG9pbnRbMV1dICs9IHBvaW50WzBdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aW1lc3RhbXBzW3BvaW50WzFdXSA9IHBvaW50WzBdO1xuICAgICAgICAgICAgY291bnRzW3BvaW50WzFdXSA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGFwb2ludHMgPSBPYmplY3Qua2V5cyh0aW1lc3RhbXBzKVxuICAgICAgICAuc29ydCgpXG4gICAgICAgIC5tYXAoKHRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFt0aW1lc3RhbXBzW3RzXSwgdHNdO1xuICAgICAgICB9KTtcblxuICAgICAgZGF0YUxpc3QgPSBbeyB0YXJnZXQ6IFwiQmxlbmRlZF9NZXRyaWNzXCIsIGRhdGFwb2ludHMgfV07XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YTogYW55ID0ge1xuICAgICAgc2NvcGVkVmFyczogXy5leHRlbmQoe30sIHRoaXMucGFuZWwuc2NvcGVkVmFycyksXG4gICAgfTtcblxuICAgIGlmIChkYXRhTGlzdC5sZW5ndGggPiAwICYmIGRhdGFMaXN0WzBdLnR5cGUgPT09IFwidGFibGVcIikge1xuICAgICAgdGhpcy5kYXRhVHlwZSA9IFwidGFibGVcIjtcbiAgICAgIGNvbnN0IHRhYmxlRGF0YSA9IGRhdGFMaXN0Lm1hcCh0aGlzLnRhYmxlSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuc2V0VGFibGVWYWx1ZXModGFibGVEYXRhLCBkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRhVHlwZSA9IFwidGltZXNlcmllc1wiO1xuICAgICAgdGhpcy5zZXJpZXMgPSBkYXRhTGlzdC5tYXAodGhpcy5zZXJpZXNIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5zZXRWYWx1ZXMoZGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgc2VyaWVzSGFuZGxlcihzZXJpZXNEYXRhKSB7XG4gICAgY29uc3Qgc2VyaWVzID0gbmV3IFRpbWVTZXJpZXMoe1xuICAgICAgZGF0YXBvaW50czogc2VyaWVzRGF0YS5kYXRhcG9pbnRzIHx8IFtdLFxuICAgICAgYWxpYXM6IHNlcmllc0RhdGEudGFyZ2V0LFxuICAgIH0pO1xuXG4gICAgc2VyaWVzLmZsb3RwYWlycyA9IHNlcmllcy5nZXRGbG90UGFpcnModGhpcy5wYW5lbC5udWxsUG9pbnRNb2RlKTtcbiAgICByZXR1cm4gc2VyaWVzO1xuICB9XG5cbiAgdGFibGVIYW5kbGVyKHRhYmxlRGF0YSkge1xuICAgIGNvbnN0IGRhdGFwb2ludHMgPSBbXTtcbiAgICBjb25zdCBjb2x1bW5OYW1lcyA9IHt9O1xuXG4gICAgdGFibGVEYXRhLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBjb2x1bW5JbmRleCkgPT4ge1xuICAgICAgY29sdW1uTmFtZXNbY29sdW1uSW5kZXhdID0gY29sdW1uLnRleHQ7XG4gICAgfSk7XG5cbiAgICB0aGlzLnRhYmxlQ29sdW1uT3B0aW9ucyA9IGNvbHVtbk5hbWVzO1xuICAgIGlmICghXy5maW5kKHRhYmxlRGF0YS5jb2x1bW5zLCBbXCJ0ZXh0XCIsIHRoaXMucGFuZWwudGFibGVDb2x1bW5dKSkge1xuICAgICAgdGhpcy5zZXRUYWJsZUNvbHVtblRvU2Vuc2libGVEZWZhdWx0KHRhYmxlRGF0YSk7XG4gICAgfVxuXG4gICAgdGFibGVEYXRhLnJvd3MuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICBjb25zdCBkYXRhcG9pbnQgPSB7fTtcblxuICAgICAgcm93LmZvckVhY2goKHZhbHVlLCBjb2x1bW5JbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBjb2x1bW5OYW1lc1tjb2x1bW5JbmRleF07XG4gICAgICAgIGRhdGFwb2ludFtrZXldID0gdmFsdWU7XG4gICAgICB9KTtcblxuICAgICAgZGF0YXBvaW50cy5wdXNoKGRhdGFwb2ludCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGF0YXBvaW50cztcbiAgfVxuXG4gIHNldFRhYmxlQ29sdW1uVG9TZW5zaWJsZURlZmF1bHQodGFibGVEYXRhKSB7XG4gICAgaWYgKHRhYmxlRGF0YS5jb2x1bW5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGhpcy5wYW5lbC50YWJsZUNvbHVtbiA9IHRhYmxlRGF0YS5jb2x1bW5zWzBdLnRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWwudGFibGVDb2x1bW4gPSBfLmZpbmQodGFibGVEYXRhLmNvbHVtbnMsIChjb2wpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbC50eXBlICE9PSBcInRpbWVcIjtcbiAgICAgIH0pLnRleHQ7XG4gICAgfVxuICB9XG5cbiAgc2V0VGFibGVWYWx1ZXModGFibGVEYXRhLCBkYXRhKSB7XG4gICAgaWYgKCF0YWJsZURhdGEgfHwgdGFibGVEYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHRhYmxlRGF0YVswXS5sZW5ndGggPT09IDAgfHxcbiAgICAgIHRhYmxlRGF0YVswXVswXVt0aGlzLnBhbmVsLnRhYmxlQ29sdW1uXSA9PT0gdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YXBvaW50ID0gdGFibGVEYXRhWzBdWzBdO1xuICAgIGRhdGEudmFsdWUgPSBkYXRhcG9pbnRbdGhpcy5wYW5lbC50YWJsZUNvbHVtbl07XG5cbiAgICBpZiAoXy5pc1N0cmluZyhkYXRhLnZhbHVlKSkge1xuICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZCA9IF8uZXNjYXBlKGRhdGEudmFsdWUpO1xuICAgICAgZGF0YS52YWx1ZSA9IDA7XG4gICAgICBkYXRhLnZhbHVlUm91bmRlZCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRlY2ltYWxJbmZvID0gdGhpcy5nZXREZWNpbWFsc0ZvclZhbHVlKGRhdGEudmFsdWUpO1xuICAgICAgY29uc3QgZm9ybWF0RnVuYyA9IGtibi52YWx1ZUZvcm1hdHNbdGhpcy5wYW5lbC5mb3JtYXRdO1xuICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZCA9IGZvcm1hdEZ1bmMoXG4gICAgICAgIGRhdGFwb2ludFt0aGlzLnBhbmVsLnRhYmxlQ29sdW1uXSxcbiAgICAgICAgZGVjaW1hbEluZm8uZGVjaW1hbHMsXG4gICAgICAgIGRlY2ltYWxJbmZvLnNjYWxlZERlY2ltYWxzXG4gICAgICApO1xuICAgICAgZGF0YS52YWx1ZVJvdW5kZWQgPSBrYm4ucm91bmRWYWx1ZShkYXRhLnZhbHVlLCB0aGlzLnBhbmVsLmRlY2ltYWxzIHx8IDApO1xuICAgIH1cblxuICAgIHRoaXMuc2V0VmFsdWVNYXBwaW5nKGRhdGEpO1xuICB9XG5cbiAgY2FuTW9kaWZ5VGV4dCgpIHtcbiAgICByZXR1cm4gIXRoaXMucGFuZWwuZ2F1Z2Uuc2hvdztcbiAgfVxuXG4gIHNldENvbG9yaW5nKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5iYWNrZ3JvdW5kKSB7XG4gICAgICB0aGlzLnBhbmVsLmNvbG9yVmFsdWUgPSBmYWxzZTtcbiAgICAgIHRoaXMucGFuZWwuY29sb3JzID0gW1xuICAgICAgICBcInJnYmEoNzEsIDIxMiwgNTksIDAuNClcIixcbiAgICAgICAgXCJyZ2JhKDI0NSwgMTUwLCA0MCwgMC43MylcIixcbiAgICAgICAgXCJyZ2JhKDIyNSwgNDAsIDQwLCAwLjU5KVwiLFxuICAgICAgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYW5lbC5jb2xvckJhY2tncm91bmQgPSBmYWxzZTtcbiAgICAgIHRoaXMucGFuZWwuY29sb3JzID0gW1xuICAgICAgICBcInJnYmEoNTAsIDE3MiwgNDUsIDAuOTcpXCIsXG4gICAgICAgIFwicmdiYSgyMzcsIDEyOSwgNDAsIDAuODkpXCIsXG4gICAgICAgIFwicmdiYSgyNDUsIDU0LCA1NCwgMC45KVwiLFxuICAgICAgXTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGludmVydENvbG9yT3JkZXIoKSB7XG4gICAgY29uc3QgdG1wID0gdGhpcy5wYW5lbC5jb2xvcnNbMF07XG4gICAgdGhpcy5wYW5lbC5jb2xvcnNbMF0gPSB0aGlzLnBhbmVsLmNvbG9yc1syXTtcbiAgICB0aGlzLnBhbmVsLmNvbG9yc1syXSA9IHRtcDtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgb25Db2xvckNoYW5nZShwYW5lbENvbG9ySW5kZXgpIHtcbiAgICByZXR1cm4gKGNvbG9yKSA9PiB7XG4gICAgICB0aGlzLnBhbmVsLmNvbG9yc1twYW5lbENvbG9ySW5kZXhdID0gY29sb3I7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH07XG4gIH1cblxuICBvblNwYXJrbGluZUNvbG9yQ2hhbmdlKG5ld0NvbG9yKSB7XG4gICAgdGhpcy5wYW5lbC5zcGFya2xpbmUubGluZUNvbG9yID0gbmV3Q29sb3I7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIG9uU3BhcmtsaW5lRmlsbENoYW5nZShuZXdDb2xvcikge1xuICAgIHRoaXMucGFuZWwuc3BhcmtsaW5lLmZpbGxDb2xvciA9IG5ld0NvbG9yO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBnZXREZWNpbWFsc0ZvclZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKF8uaXNOdW1iZXIodGhpcy5wYW5lbC5kZWNpbWFscykpIHtcbiAgICAgIHJldHVybiB7IGRlY2ltYWxzOiB0aGlzLnBhbmVsLmRlY2ltYWxzLCBzY2FsZWREZWNpbWFsczogbnVsbCB9O1xuICAgIH1cblxuICAgIGNvbnN0IGRlbHRhID0gdmFsdWUgLyAyO1xuICAgIGxldCBkZWMgPSAtTWF0aC5mbG9vcihNYXRoLmxvZyhkZWx0YSkgLyBNYXRoLkxOMTApO1xuXG4gICAgY29uc3QgbWFnbiA9IE1hdGgucG93KDEwLCAtZGVjKTtcbiAgICBjb25zdCBub3JtID0gZGVsdGEgLyBtYWduOyAvLyBub3JtIGlzIGJldHdlZW4gMS4wIGFuZCAxMC4wXG4gICAgbGV0IHNpemU7XG5cbiAgICBpZiAobm9ybSA8IDEuNSkge1xuICAgICAgc2l6ZSA9IDE7XG4gICAgfSBlbHNlIGlmIChub3JtIDwgMykge1xuICAgICAgc2l6ZSA9IDI7XG4gICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIDIuNSwgcmVxdWlyZXMgYW4gZXh0cmEgZGVjaW1hbFxuICAgICAgaWYgKG5vcm0gPiAyLjI1KSB7XG4gICAgICAgIHNpemUgPSAyLjU7XG4gICAgICAgICsrZGVjO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobm9ybSA8IDcuNSkge1xuICAgICAgc2l6ZSA9IDU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNpemUgPSAxMDtcbiAgICB9XG5cbiAgICBzaXplICo9IG1hZ247XG5cbiAgICAvLyByZWR1Y2Ugc3RhcnRpbmcgZGVjaW1hbHMgaWYgbm90IG5lZWRlZFxuICAgIGlmIChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUpIHtcbiAgICAgIGRlYyA9IDA7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcbiAgICByZXN1bHQuZGVjaW1hbHMgPSBNYXRoLm1heCgwLCBkZWMpO1xuICAgIHJlc3VsdC5zY2FsZWREZWNpbWFscyA9XG4gICAgICByZXN1bHQuZGVjaW1hbHMgLSBNYXRoLmZsb29yKE1hdGgubG9nKHNpemUpIC8gTWF0aC5MTjEwKSArIDI7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgc2V0VmFsdWVzKGRhdGEpIHtcbiAgICBkYXRhLmZsb3RwYWlycyA9IFtdO1xuXG4gICAgaWYgKHRoaXMuc2VyaWVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IGVycm9yOiBhbnkgPSBuZXcgRXJyb3IoKTtcbiAgICAgIGVycm9yLm1lc3NhZ2UgPSBcIk11bHRpcGxlIFNlcmllcyBFcnJvclwiO1xuICAgICAgZXJyb3IuZGF0YSA9XG4gICAgICAgIFwiTWV0cmljIHF1ZXJ5IHJldHVybnMgXCIgK1xuICAgICAgICB0aGlzLnNlcmllcy5sZW5ndGggK1xuICAgICAgICBcIiBzZXJpZXMuIFNpbmdsZSBTdGF0IFBhbmVsIGV4cGVjdHMgYSBzaW5nbGUgc2VyaWVzLlxcblxcblJlc3BvbnNlOlxcblwiICtcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkodGhpcy5zZXJpZXMpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2VyaWVzICYmIHRoaXMuc2VyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGxhc3RQb2ludCA9IF8ubGFzdCh0aGlzLnNlcmllc1swXS5kYXRhcG9pbnRzKTtcbiAgICAgIGNvbnN0IGxhc3RWYWx1ZSA9IF8uaXNBcnJheShsYXN0UG9pbnQpID8gbGFzdFBvaW50WzBdIDogbnVsbDtcblxuICAgICAgaWYgKHRoaXMucGFuZWwudmFsdWVOYW1lID09PSBcIm5hbWVcIikge1xuICAgICAgICBkYXRhLnZhbHVlID0gMDtcbiAgICAgICAgZGF0YS52YWx1ZVJvdW5kZWQgPSAwO1xuICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gdGhpcy5zZXJpZXNbMF0uYWxpYXM7XG4gICAgICB9IGVsc2UgaWYgKF8uaXNTdHJpbmcobGFzdFZhbHVlKSkge1xuICAgICAgICBkYXRhLnZhbHVlID0gMDtcbiAgICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZCA9IF8uZXNjYXBlKGxhc3RWYWx1ZSk7XG4gICAgICAgIGRhdGEudmFsdWVSb3VuZGVkID0gMDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wYW5lbC52YWx1ZU5hbWUgPT09IFwibGFzdF90aW1lXCIpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0RnVuYyA9IGtibi52YWx1ZUZvcm1hdHNbdGhpcy5wYW5lbC5mb3JtYXRdO1xuICAgICAgICBkYXRhLnZhbHVlID0gbGFzdFBvaW50WzFdO1xuICAgICAgICBkYXRhLnZhbHVlUm91bmRlZCA9IGRhdGEudmFsdWU7XG4gICAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSBmb3JtYXRGdW5jKFxuICAgICAgICAgIGRhdGEudmFsdWUsXG4gICAgICAgICAgdGhpcy5kYXNoYm9hcmQuaXNUaW1lem9uZVV0YygpXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhLnZhbHVlID0gdGhpcy5zZXJpZXNbMF0uc3RhdHNbdGhpcy5wYW5lbC52YWx1ZU5hbWVdO1xuICAgICAgICBkYXRhLmZsb3RwYWlycyA9IHRoaXMuc2VyaWVzWzBdLmZsb3RwYWlycztcblxuICAgICAgICBjb25zdCBkZWNpbWFsSW5mbyA9IHRoaXMuZ2V0RGVjaW1hbHNGb3JWYWx1ZShkYXRhLnZhbHVlKTtcbiAgICAgICAgY29uc3QgZm9ybWF0RnVuYyA9IGtibi52YWx1ZUZvcm1hdHNbdGhpcy5wYW5lbC5mb3JtYXRdO1xuICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gZm9ybWF0RnVuYyhcbiAgICAgICAgICBkYXRhLnZhbHVlLFxuICAgICAgICAgIGRlY2ltYWxJbmZvLmRlY2ltYWxzLFxuICAgICAgICAgIGRlY2ltYWxJbmZvLnNjYWxlZERlY2ltYWxzXG4gICAgICAgICk7XG4gICAgICAgIGRhdGEudmFsdWVSb3VuZGVkID0ga2JuLnJvdW5kVmFsdWUoZGF0YS52YWx1ZSwgZGVjaW1hbEluZm8uZGVjaW1hbHMpO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgJF9fbmFtZSB2YXJpYWJsZSBmb3IgdXNpbmcgaW4gcHJlZml4IG9yIHBvc3RmaXhcbiAgICAgIGRhdGEuc2NvcGVkVmFyc1tcIl9fbmFtZVwiXSA9IHsgdmFsdWU6IHRoaXMuc2VyaWVzWzBdLmxhYmVsIH07XG4gICAgfVxuICAgIHRoaXMuc2V0VmFsdWVNYXBwaW5nKGRhdGEpO1xuICB9XG5cbiAgc2V0VmFsdWVNYXBwaW5nKGRhdGEpIHtcbiAgICAvLyBjaGVjayB2YWx1ZSB0byB0ZXh0IG1hcHBpbmdzIGlmIGl0cyBlbmFibGVkXG4gICAgaWYgKHRoaXMucGFuZWwubWFwcGluZ1R5cGUgPT09IDEpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wYW5lbC52YWx1ZU1hcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5wYW5lbC52YWx1ZU1hcHNbaV07XG4gICAgICAgIC8vIHNwZWNpYWwgbnVsbCBjYXNlXG4gICAgICAgIGlmIChtYXAudmFsdWUgPT09IFwibnVsbFwiKSB7XG4gICAgICAgICAgaWYgKGRhdGEudmFsdWUgPT09IG51bGwgfHwgZGF0YS52YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gbWFwLnRleHQ7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsdWUvbnVtYmVyIHRvIHRleHQgbWFwcGluZ1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQobWFwLnZhbHVlKTtcbiAgICAgICAgaWYgKHZhbHVlID09PSBkYXRhLnZhbHVlUm91bmRlZCkge1xuICAgICAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSBtYXAudGV4dDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMucGFuZWwubWFwcGluZ1R5cGUgPT09IDIpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wYW5lbC5yYW5nZU1hcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5wYW5lbC5yYW5nZU1hcHNbaV07XG4gICAgICAgIC8vIHNwZWNpYWwgbnVsbCBjYXNlXG4gICAgICAgIGlmIChtYXAuZnJvbSA9PT0gXCJudWxsXCIgJiYgbWFwLnRvID09PSBcIm51bGxcIikge1xuICAgICAgICAgIGlmIChkYXRhLnZhbHVlID09PSBudWxsIHx8IGRhdGEudmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZCA9IG1hcC50ZXh0O1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbHVlL251bWJlciB0byByYW5nZSBtYXBwaW5nXG4gICAgICAgIGNvbnN0IGZyb20gPSBwYXJzZUZsb2F0KG1hcC5mcm9tKTtcbiAgICAgICAgY29uc3QgdG8gPSBwYXJzZUZsb2F0KG1hcC50byk7XG4gICAgICAgIGlmICh0byA+PSBkYXRhLnZhbHVlUm91bmRlZCAmJiBmcm9tIDw9IGRhdGEudmFsdWVSb3VuZGVkKSB7XG4gICAgICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZCA9IG1hcC50ZXh0O1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkYXRhLnZhbHVlID09PSBudWxsIHx8IGRhdGEudmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZCA9IFwibm8gdmFsdWVcIjtcbiAgICB9XG4gIH1cblxuICByZW1vdmVWYWx1ZU1hcChtYXApIHtcbiAgICBjb25zdCBpbmRleCA9IF8uaW5kZXhPZih0aGlzLnBhbmVsLnZhbHVlTWFwcywgbWFwKTtcbiAgICB0aGlzLnBhbmVsLnZhbHVlTWFwcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBhZGRWYWx1ZU1hcCgpIHtcbiAgICB0aGlzLnBhbmVsLnZhbHVlTWFwcy5wdXNoKHsgdmFsdWU6IFwiXCIsIG9wOiBcIj1cIiwgdGV4dDogXCJcIiB9KTtcbiAgfVxuXG4gIHJlbW92ZVJhbmdlTWFwKHJhbmdlTWFwKSB7XG4gICAgY29uc3QgaW5kZXggPSBfLmluZGV4T2YodGhpcy5wYW5lbC5yYW5nZU1hcHMsIHJhbmdlTWFwKTtcbiAgICB0aGlzLnBhbmVsLnJhbmdlTWFwcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBhZGRSYW5nZU1hcCgpIHtcbiAgICB0aGlzLnBhbmVsLnJhbmdlTWFwcy5wdXNoKHsgZnJvbTogXCJcIiwgdG86IFwiXCIsIHRleHQ6IFwiXCIgfSk7XG4gIH1cblxuICBsaW5rKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCkge1xuICAgIGNvbnN0ICRsb2NhdGlvbiA9IHRoaXMuJGxvY2F0aW9uO1xuICAgIC8vIGNvbnN0IGxpbmtTcnYgPSB0aGlzLmxpbmtTcnY7XG4gICAgY29uc3QgJHRpbWVvdXQgPSB0aGlzLiR0aW1lb3V0O1xuICAgIGNvbnN0ICRzYW5pdGl6ZSA9IHRoaXMuJHNhbml0aXplO1xuICAgIGNvbnN0IHBhbmVsID0gY3RybC5wYW5lbDtcbiAgICBjb25zdCB0ZW1wbGF0ZVNydiA9IHRoaXMudGVtcGxhdGVTcnY7XG4gICAgbGV0IGRhdGEsIGxpbmtJbmZvO1xuICAgIGNvbnN0ICRwYW5lbENvbnRhaW5lciA9IGVsZW0uZmluZChcIi5wYW5lbC1jb250YWluZXJcIik7XG4gICAgZWxlbSA9IGVsZW0uZmluZChcIi5zaW5nbGVzdGF0LXBhbmVsXCIpO1xuXG4gICAgZnVuY3Rpb24gYXBwbHlDb2xvcmluZ1RocmVzaG9sZHModmFsdWVTdHJpbmcpIHtcbiAgICAgIGNvbnN0IGNvbG9yID0gZ2V0Q29sb3JGb3JWYWx1ZShkYXRhLCBkYXRhLnZhbHVlKTtcbiAgICAgIGlmIChjb2xvcikge1xuICAgICAgICByZXR1cm4gJzxzcGFuIHN0eWxlPVwiY29sb3I6JyArIGNvbG9yICsgJ1wiPicgKyB2YWx1ZVN0cmluZyArIFwiPC9zcGFuPlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWVTdHJpbmc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U3BhbihjbGFzc05hbWUsIGZvbnRTaXplLCBhcHBseUNvbG9yaW5nLCB2YWx1ZSkge1xuICAgICAgdmFsdWUgPSAkc2FuaXRpemUodGVtcGxhdGVTcnYucmVwbGFjZSh2YWx1ZSwgZGF0YS5zY29wZWRWYXJzKSk7XG4gICAgICB2YWx1ZSA9IGFwcGx5Q29sb3JpbmcgPyBhcHBseUNvbG9yaW5nVGhyZXNob2xkcyh2YWx1ZSkgOiB2YWx1ZTtcbiAgICAgIGNvbnN0IHBpeGVsU2l6ZSA9IChwYXJzZUludChmb250U2l6ZSwgMTApIC8gMTAwKSAqIEJBU0VfRk9OVF9TSVpFO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwiJyArXG4gICAgICAgIGNsYXNzTmFtZSArXG4gICAgICAgICdcIiBzdHlsZT1cImZvbnQtc2l6ZTonICtcbiAgICAgICAgcGl4ZWxTaXplICtcbiAgICAgICAgJ3B4XCI+JyArXG4gICAgICAgIHZhbHVlICtcbiAgICAgICAgXCI8L3NwYW4+XCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QmlnVmFsdWVIdG1sKCkge1xuICAgICAgbGV0IGJvZHkgPSAnPGRpdiBjbGFzcz1cInNpbmdsZXN0YXQtcGFuZWwtdmFsdWUtY29udGFpbmVyXCI+JztcblxuICAgICAgaWYgKHBhbmVsLnByZWZpeCkge1xuICAgICAgICBib2R5ICs9IGdldFNwYW4oXG4gICAgICAgICAgXCJzaW5nbGVzdGF0LXBhbmVsLXByZWZpeFwiLFxuICAgICAgICAgIHBhbmVsLnByZWZpeEZvbnRTaXplLFxuICAgICAgICAgIHBhbmVsLmNvbG9yUHJlZml4LFxuICAgICAgICAgIHBhbmVsLnByZWZpeFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBib2R5ICs9IGdldFNwYW4oXG4gICAgICAgIFwic2luZ2xlc3RhdC1wYW5lbC12YWx1ZVwiLFxuICAgICAgICBwYW5lbC52YWx1ZUZvbnRTaXplLFxuICAgICAgICBwYW5lbC5jb2xvclZhbHVlLFxuICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkXG4gICAgICApO1xuXG4gICAgICBpZiAocGFuZWwucG9zdGZpeCkge1xuICAgICAgICBib2R5ICs9IGdldFNwYW4oXG4gICAgICAgICAgXCJzaW5nbGVzdGF0LXBhbmVsLXBvc3RmaXhcIixcbiAgICAgICAgICBwYW5lbC5wb3N0Zml4Rm9udFNpemUsXG4gICAgICAgICAgcGFuZWwuY29sb3JQb3N0Zml4LFxuICAgICAgICAgIHBhbmVsLnBvc3RmaXhcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgYm9keSArPSBcIjwvZGl2PlwiO1xuXG4gICAgICByZXR1cm4gYm9keTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRWYWx1ZVRleHQoKSB7XG4gICAgICBsZXQgcmVzdWx0ID0gcGFuZWwucHJlZml4XG4gICAgICAgID8gdGVtcGxhdGVTcnYucmVwbGFjZShwYW5lbC5wcmVmaXgsIGRhdGEuc2NvcGVkVmFycylcbiAgICAgICAgOiBcIlwiO1xuICAgICAgcmVzdWx0ICs9IGRhdGEudmFsdWVGb3JtYXR0ZWQ7XG4gICAgICByZXN1bHQgKz0gcGFuZWwucG9zdGZpeFxuICAgICAgICA/IHRlbXBsYXRlU3J2LnJlcGxhY2UocGFuZWwucG9zdGZpeCwgZGF0YS5zY29wZWRWYXJzKVxuICAgICAgICA6IFwiXCI7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkR2F1Z2UoKSB7XG5cbiAgICAgIGNvbnN0IHdpZHRoID0gZWxlbS53aWR0aCgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gZWxlbS5oZWlnaHQoKTtcbiAgICAgIC8vIEFsbG93IHRvIHVzZSBhIGJpdCBtb3JlIHNwYWNlIGZvciB3aWRlIGdhdWdlc1xuICAgICAgY29uc3QgZGltZW5zaW9uID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCAqIDEuMyk7XG5cbiAgICAgIGN0cmwuaW52YWxpZEdhdWdlUmFuZ2UgPSBmYWxzZTtcbiAgICAgIGlmIChwYW5lbC5nYXVnZS5taW5WYWx1ZSA+IHBhbmVsLmdhdWdlLm1heFZhbHVlKSB7XG4gICAgICAgIGN0cmwuaW52YWxpZEdhdWdlUmFuZ2UgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBsb3RDYW52YXMgPSAkKFwiPGRpdj48L2Rpdj5cIik7XG4gICAgICBjb25zdCBwbG90Q3NzID0ge1xuICAgICAgICB0b3A6IFwiMTBweFwiLFxuICAgICAgICBtYXJnaW46IFwiYXV0b1wiLFxuICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICBoZWlnaHQ6IGhlaWdodCAqIDAuOSArIFwicHhcIixcbiAgICAgICAgd2lkdGg6IGRpbWVuc2lvbiArIFwicHhcIixcbiAgICAgIH07XG5cbiAgICAgIHBsb3RDYW52YXMuY3NzKHBsb3RDc3MpO1xuICAgICAgLy9lbGVtZW50LmNzcyhwbG90Q3NzKTtcblxuICAgICAgY29uc3QgdGhyZXNob2xkcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnRocmVzaG9sZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhyZXNob2xkcy5wdXNoKHtcbiAgICAgICAgICB2YWx1ZTogZGF0YS50aHJlc2hvbGRzW2ldLFxuICAgICAgICAgIGNvbG9yOiBkYXRhLmNvbG9yTWFwW2ldLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRocmVzaG9sZHMucHVzaCh7XG4gICAgICAgIHZhbHVlOiBwYW5lbC5nYXVnZS5tYXhWYWx1ZSxcbiAgICAgICAgY29sb3I6IGRhdGEuY29sb3JNYXBbZGF0YS5jb2xvck1hcC5sZW5ndGggLSAxXSxcbiAgICAgIH0pO1xuXG4gICAgICAvL0NyZWF0ZSB0aGUgbmV3IGdhdWdlXG4gICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZWxlbWVudC5pZCA9ICcjZ2F1Z2VBcmVhJztcbiAgICAgICAgLy8gRWxlbWVudCBpbnNpZGUgd2hpY2ggeW91IHdhbnQgdG8gc2VlIHRoZSBjaGFydFxuICAgICAgbGV0IG5lZWRsZVZhbHVlID0gcGFyc2VGbG9hdChnZXRWYWx1ZVRleHQoKSk7XG4gICAgICAvLyAgIFByb3BlcnRpZXMgb2YgdGhlIGdhdWdlXG4gICAgICBsZXQgZ2F1Z2VPcHRpb25zID0ge1xuICAgICAgICAvLyBuZWVkbGUgb3B0aW9uc1xuICAgICAgICBoYXNOZWVkbGU6IHRydWUsXG4gICAgICAgIG91dGVyTmVlZGxlOiBmYWxzZSxcbiAgICAgICAgbmVlZGxlQ29sb3I6ICcjZmZmJyxcbiAgICAgICAgbmVlZGxlU3RhcnRWYWx1ZTogKG5lZWRsZVZhbHVlIC8gcGFuZWwuZ2F1Z2UubWF4VmFsdWUpICogMTAwLFxuICAgICAgICBuZWVkbGVVcGRhdGVTcGVlZDogMTAwLFxuICAgICAgICBuZWVkbGVWYWx1ZTogKG5lZWRsZVZhbHVlIC8gcGFuZWwuZ2F1Z2UubWF4VmFsdWUpICogMTAwLFxuICAgICAgICAvLyBhcmMgb3B0aW9uc1xuICAgICAgICBhcmNDb2xvcnM6IFsuLi5wYW5lbC5jb2xvcnNdLCAvLyBIZXJlIHdlIG1hdGNoIHRoZSB0aHJlc2hvbGQgY29sb3JzOyBncmVlbiwgcmVkIGFuZCBvcmFuZ2UuIFxuICAgICAgICBhcmNEZWxpbWl0ZXJzOiBbLi4ucGFuZWwudGhyZXNob2xkcy50cmltKCkuc3BsaXQoXCIsXCIpLm1hcChwYXJzZUZsb2F0KS5maWx0ZXIoaXRlbSA9PiBpdGVtID4gMCldLm1hcCgodGhyZXNob2xkKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2codGhyZXNob2xkKTtcbiAgICAgICAgICB0aHJlc2hvbGQgPSBwYXJzZUZsb2F0KHRocmVzaG9sZCk7XG4gICAgICAgICAgbGV0IGRlbGltaXRlciA9ICh0aHJlc2hvbGQgLyBwYW5lbC5nYXVnZS5tYXhWYWx1ZSkgKiAxMDA7XG4gICAgICAgICAgcmV0dXJuIGRlbGltaXRlcjtcbiAgICAgICAgfSksXG4gICAgICAgIGFyY1BhZGRpbmc6IDYsXG4gICAgICAgIGFyY1BhZGRpbmdDb2xvcjogJyMwMDAnLFxuICAgICAgICBhcmNMYWJlbHM6IGRhdGEudGhyZXNob2xkcywgLy90aGUgbGltaXQgaXMgMTAwXG4gICAgICAgIGFyY0xhYmVsRm9udFNpemU6IHRydWUsXG4gICAgICAgIGFyY092ZXJFZmZlY3Q6IHRydWUsXG4gICAgICAgIC8vYXJjT3ZlckVmZmVjdDogZmFsc2UsXG4gICAgICAgIC8vIGxhYmVsIG9wdGlvbnNcbiAgICAgICAgcmFuZ2VMYWJlbDogW3BhbmVsLmdhdWdlLm1pblZhbHVlICsgJycsIHBhbmVsLmdhdWdlLm1heFZhbHVlICsgJyddLFxuICAgICAgICBjZW50cmFsTGFiZWw6IGRhdGEudmFsdWVGb3JtYXR0ZWQgKyAnJywgIC8vSWYgeW91IGNvbWVudCB0aGlzIGxpbmUsIGFwcGVhcnMgdGhlIG5lZWRsZSBpbnN0ZWFkIG9mIHRoZSBudW1iZXJzIHZhbHVlLlxuICAgICAgICByYW5nZUxhYmVsRm9udFNpemU6IHBhbmVsLmdhdWdlLmZvbnRTaXplLFxuICAgICAgICBsYWJlbHNGb250OiAnQ29uc29sYXMnLFxuICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gICAvLyAvLyAvLyAvLyBEcmF3aW5nIGFuZCB1cGRhdGluZyB0aGUgY2hhcnQgYW5kIGFkZCB0aGUgR2F1Z2UgaW4gdGhlIHBhbmVsXG4gICAgICBsZXQgZ2F1Z2VDaGFydCA9IEdhdWdlQ2hhcnQuZ2F1Z2VDaGFydChlbGVtZW50LCBoZWlnaHQgPiB3aWR0aD8gd2lkdGg6aGVpZ2h0LCBnYXVnZU9wdGlvbnMpO1xuXG4gICAgICAvLyBlbGVtLmFwcGVuZChwbG90Q2FudmFzKTtcbiAgICAgIGVsZW0uYXBwZW5kKGVsZW1lbnQpO1xuXG4gICAgICAgLy9JbnNlcnRpb24gb2YgdGhlIHRleHQgYmVsbG93IHRoZSBHYXVnZVxuICAgICAgbGV0IHRleHRJbnNlcnRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRleHRJbnNlcnRpb24uaWQgPSAndGV4dEluc2VydGlvbic7XG4gICAgICB0ZXh0SW5zZXJ0aW9uLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgdGV4dEluc2VydGlvbi5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVkoLTQ1cHgpXCI7XG4gICAgICB0ZXh0SW5zZXJ0aW9uLnN0eWxlLmZvbnRGYW1pbHkgPSBcIkNvbnNvbGFzXCI7XG4gICAgICAvLyBIZXJlIHlvdSBtYWtlIHJlc3BvbnNpdmUgdGhlIHRleHRcbiAgICAgIHRleHRJbnNlcnRpb24uc3R5bGUuZm9udFNpemUgPSAoKChlbGVtZW50Lm9mZnNldFdpZHRoIC8gMjApIC8gMTYpICogKHBhbmVsLmdhdWdlLmZvbnRTaXplVGV4dCA/IHBhbmVsLmdhdWdlLmZvbnRTaXplVGV4dCA6IDE4KSkgKyBcInB4XCIgLy8gcGFuZWwuZ2F1Z2UuZm9udFNpemVUZXh0ICsgJ3B4JztcbiAgICAgIHRleHRJbnNlcnRpb24uc3R5bGUuY29sb3IgPSBcIiNmZmZcIjtcbiAgICAgIHRleHRJbnNlcnRpb24udGV4dENvbnRlbnQgPSBwYW5lbC5nYXVnZS50ZXh0SW5zZXJ0aW9uO1xuICAgICAgZWxlbWVudC5hcHBlbmQodGV4dEluc2VydGlvbik7IFxuICAgICAgIFxuICAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gYWRkU3BhcmtsaW5lKCkge1xuICAgICAgY29uc3Qgd2lkdGggPSBlbGVtLndpZHRoKCkgKyAyMDtcbiAgICAgIGlmICh3aWR0aCA8IDMwKSB7XG4gICAgICAgIC8vIGVsZW1lbnQgaGFzIG5vdCBnb3R0ZW4gaXQncyB3aWR0aCB5ZXRcbiAgICAgICAgLy8gZGVsYXkgc3BhcmtsaW5lIHJlbmRlclxuICAgICAgICBzZXRUaW1lb3V0KGFkZFNwYXJrbGluZSwgMzApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGhlaWdodCA9IGN0cmwuaGVpZ2h0O1xuICAgICAgY29uc3QgcGxvdENhbnZhcyA9ICQoXCI8ZGl2PjwvZGl2PlwiKTtcbiAgICAgIGNvbnN0IHBsb3RDc3M6IGFueSA9IHt9O1xuICAgICAgcGxvdENzcy5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblxuICAgICAgaWYgKHBhbmVsLnNwYXJrbGluZS5mdWxsKSB7XG4gICAgICAgIHBsb3RDc3MuYm90dG9tID0gXCI1cHhcIjtcbiAgICAgICAgcGxvdENzcy5sZWZ0ID0gXCItNXB4XCI7XG4gICAgICAgIHBsb3RDc3Mud2lkdGggPSB3aWR0aCAtIDEwICsgXCJweFwiO1xuICAgICAgICBjb25zdCBkeW5hbWljSGVpZ2h0TWFyZ2luID1cbiAgICAgICAgICBoZWlnaHQgPD0gMTAwID8gNSA6IE1hdGgucm91bmQoaGVpZ2h0IC8gMTAwKSAqIDE1ICsgNTtcbiAgICAgICAgcGxvdENzcy5oZWlnaHQgPSBoZWlnaHQgLSBkeW5hbWljSGVpZ2h0TWFyZ2luICsgXCJweFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGxvdENzcy5ib3R0b20gPSBcIjBweFwiO1xuICAgICAgICBwbG90Q3NzLmxlZnQgPSBcIi01cHhcIjtcbiAgICAgICAgcGxvdENzcy53aWR0aCA9IHdpZHRoIC0gMTAgKyBcInB4XCI7XG4gICAgICAgIHBsb3RDc3MuaGVpZ2h0ID0gTWF0aC5mbG9vcihoZWlnaHQgKiAwLjI1KSArIFwicHhcIjtcbiAgICAgIH1cblxuICAgICAgcGxvdENhbnZhcy5jc3MocGxvdENzcyk7XG5cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGxlZ2VuZDogeyBzaG93OiBmYWxzZSB9LFxuICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICBsaW5lczoge1xuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIGZpbGw6IDEsXG4gICAgICAgICAgICB6ZXJvOiBmYWxzZSxcbiAgICAgICAgICAgIGxpbmVXaWR0aDogMSxcbiAgICAgICAgICAgIGZpbGxDb2xvcjogcGFuZWwuc3BhcmtsaW5lLmZpbGxDb2xvcixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB5YXhlczogeyBzaG93OiBmYWxzZSB9LFxuICAgICAgICB4YXhpczoge1xuICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICAgIG1vZGU6IFwidGltZVwiLFxuICAgICAgICAgIG1pbjogY3RybC5yYW5nZS5mcm9tLnZhbHVlT2YoKSxcbiAgICAgICAgICBtYXg6IGN0cmwucmFuZ2UudG8udmFsdWVPZigpLFxuICAgICAgICB9LFxuICAgICAgICBncmlkOiB7IGhvdmVyYWJsZTogZmFsc2UsIHNob3c6IGZhbHNlIH0sXG4gICAgICB9O1xuXG4gICAgICBlbGVtLmFwcGVuZChwbG90Q2FudmFzKTtcbiAgICAgIFxuXG4gICAgICBjb25zdCBwbG90U2VyaWVzID0ge1xuICAgICAgICBkYXRhOiBkYXRhLmZsb3RwYWlycyxcbiAgICAgICAgY29sb3I6IHBhbmVsLnNwYXJrbGluZS5saW5lQ29sb3IsXG4gICAgICB9O1xuXG4gICAgICAkLnBsb3QocGxvdENhbnZhcywgW3Bsb3RTZXJpZXNdLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICBpZiAoIWN0cmwuZGF0YSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkYXRhID0gY3RybC5kYXRhO1xuXG4gICAgICAvLyBnZXQgdGhyZXNob2xkc1xuICAgICAgZGF0YS50aHJlc2hvbGRzID0gcGFuZWwudGhyZXNob2xkcy5zcGxpdChcIixcIikubWFwKChzdHJWYWxlKSA9PiB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoc3RyVmFsZS50cmltKCkpO1xuICAgICAgfSk7XG4gICAgICBkYXRhLmNvbG9yTWFwID0gcGFuZWwuY29sb3JzO1xuXG4gICAgICBjb25zdCBib2R5ID0gcGFuZWwuZ2F1Z2Uuc2hvdyA/IFwiXCIgOiBnZXRCaWdWYWx1ZUh0bWwoKTtcblxuICAgICAgaWYgKHBhbmVsLmNvbG9yQmFja2dyb3VuZCkge1xuICAgICAgICBjb25zdCBjb2xvciA9IGdldENvbG9yRm9yVmFsdWUoZGF0YSwgZGF0YS52YWx1ZSk7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgICRwYW5lbENvbnRhaW5lci5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIGNvbG9yKTtcbiAgICAgICAgICBpZiAoc2NvcGUuZnVsbHNjcmVlbikge1xuICAgICAgICAgICAgZWxlbS5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIGNvbG9yKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbS5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHBhbmVsQ29udGFpbmVyLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgXCJcIik7XG4gICAgICAgIGVsZW0uY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIlwiKTtcbiAgICAgIH1cblxuICAgICAgZWxlbS5odG1sKGJvZHkpO1xuXG4gICAgLy8gSW5zZXJ0IGxvZ29cbiAgICAvL0NyZWF0ZSB0aGUgZWxlbWVudFxuICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSg3NSk7XG4gICAgLy8gSW1wb3J0IHRoZSBpbWFnZVxuICAgIGltYWdlLnNyYyA9XG4gICAgICBcImh0dHBzOi8vd3d3LnNvZnR0ZWsuY29tL2ltYWdlcy9jb250ZW50L2Rlc2lnbjIwMTUvTG9nb0NvbXBsZXRvLVdlYnNpdGUtMjAucG5nXCI7XG4gICAgLy8gVG8gZml4IHRoZSBsb2dvIHBvc2l0aW9uIGluIHRoZSBwYW5lbFxuICAgIGltYWdlLnN0eWxlLm9wYWNpdHkgPSBcIjAuN1wiO1xuICAgIGltYWdlLnN0eWxlLndpZHRoID0gXCI3JVwiO1xuICAgIGltYWdlLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIGltYWdlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgaW1hZ2Uuc3R5bGUubGVmdCA9IFwiMSVcIjtcbiAgICBpbWFnZS5zdHlsZS5ib3R0b20gPSBcIjIlXCI7XG5cbiAgICAvLyBMb2dvIGNpbmVwb2xpcy5cbiAgICBpbWFnZS5pZCA9IFwibG9nb1wiO1xuICAgIGltYWdlLm9ubW91c2VvdmVyID0gKCkgPT4ge1xuICAgICAgaW1hZ2Uuc3JjID1cbiAgICAgICAgXCJodHRwczovL3N0YXRpYy5jaW5lcG9saXMuY29tL2ltZy9sZy1jaW5lcG9saXMtbmV3LnBuZ1wiO1xuICAgICAgICBpbWFnZS5zdHlsZS5vcGFjaXR5ID0gXCIwLjdcIjtcbiAgICAgICAgaW1hZ2Uuc3R5bGUud2lkdGggPSBcIjclXCI7XG4gICAgICAgIGltYWdlLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICBpbWFnZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBpbWFnZS5zdHlsZS5sZWZ0ID0gXCIxJVwiO1xuICAgICAgICBpbWFnZS5zdHlsZS5ib3R0b20gPSBcIjIlXCI7XG4gICAgfTtcbiAgICBpbWFnZS5vbm1vdXNlbGVhdmUgPSAoKSA9PiB7XG4gICAgICBpbWFnZS5zcmMgPVxuICAgICAgXCJodHRwczovL3d3dy5zb2Z0dGVrLmNvbS9pbWFnZXMvY29udGVudC9kZXNpZ24yMDE1L0xvZ29Db21wbGV0by1XZWJzaXRlLTIwLnBuZ1wiO1xuICAgICAgaW1hZ2Uuc3R5bGUub3BhY2l0eSA9IFwiMC43XCI7XG4gICAgICBpbWFnZS5zdHlsZS53aWR0aCA9IFwiNyVcIjtcbiAgICAgIGltYWdlLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgaW1hZ2Uuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgIGltYWdlLnN0eWxlLmxlZnQgPSBcIjElXCI7XG4gICAgICBpbWFnZS5zdHlsZS5ib3R0b20gPSBcIjIlXCI7XG4gICAgfTtcbiAgICAvLyBIZXJlIHdlIGNyZWF0ZSB0aGUgbG9nbyBpbiB0aGUgcGFuZWxcbiAgICBjb25zdCBwYW5lbENvbnRlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNpbmdsZXN0YXQtcGFuZWxcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYW5lbENvbnRlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvXCIpKSB7XG4gICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgLmdldEVsZW1lbnRCeUlkKFwibG9nb1wiKVxuICAgICAgICAgIC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb1wiKSk7XG4gICAgICB9XG4gICAgICAvLyBIZXJlIEkgY2hhbmdlIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIGFuZCBhZGQgdGhlIGxvZ28uXG4gICAgICBwYW5lbENvbnRlbnRzLml0ZW0oaSkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjMDAwXCI7XG4gICAgICBwYW5lbENvbnRlbnRzLml0ZW0oaSkuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuICAgIH1cblxuXG5cbiAgICAgIGlmIChwYW5lbC5zcGFya2xpbmUuc2hvdykge1xuICAgICAgICBhZGRTcGFya2xpbmUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhbmVsLmdhdWdlLnNob3cpIHtcbiAgICAgICAgYWRkR2F1Z2UoKTtcbiAgICAgIH1cblxuICAgICAgZWxlbS50b2dnbGVDbGFzcyhcInBvaW50ZXJcIiwgcGFuZWwubGlua3MubGVuZ3RoID4gMCk7XG5cbiAgICAgIGlmIChwYW5lbC5saW5rcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGxpbmtJbmZvID0gbGlua1Nydi5nZXRQYW5lbExpbmtBbmNob3JJbmZvKHBhbmVsLmxpbmtzWzBdLCBkYXRhLnNjb3BlZFZhcnMpO1xuICAgICAgICBsaW5rSW5mbyA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaW5rSW5mbyA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaG9va3VwRHJpbGxkb3duTGlua1Rvb2x0aXAoKSB7XG4gICAgICAvLyBkcmlsbGRvd24gbGluayB0b29sdGlwXG4gICAgICBjb25zdCBkcmlsbGRvd25Ub29sdGlwID0gJCgnPGRpdiBpZD1cInRvb2x0aXBcIiBjbGFzcz1cIlwiPmhlbGxvPC9kaXY+XCInKTtcblxuICAgICAgZWxlbS5tb3VzZWxlYXZlKCgpID0+IHtcbiAgICAgICAgaWYgKHBhbmVsLmxpbmtzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAkdGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZHJpbGxkb3duVG9vbHRpcC5kZXRhY2goKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZWxlbS5jbGljaygoZXZ0KSA9PiB7XG4gICAgICAgIGlmICghbGlua0luZm8pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWdub3JlIHRpdGxlIGNsaWNrcyBpbiB0aXRsZVxuICAgICAgICBpZiAoJChldnQpLnBhcmVudHMoXCIucGFuZWwtaGVhZGVyXCIpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlua0luZm8udGFyZ2V0ID09PSBcIl9ibGFua1wiKSB7XG4gICAgICAgICAgd2luZG93Lm9wZW4obGlua0luZm8uaHJlZiwgXCJfYmxhbmtcIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpbmtJbmZvLmhyZWYuaW5kZXhPZihcImh0dHBcIikgPT09IDApIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpbmtJbmZvLmhyZWY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJGxvY2F0aW9uLnVybChsaW5rSW5mby5ocmVmKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRyaWxsZG93blRvb2x0aXAuZGV0YWNoKCk7XG4gICAgICB9KTtcblxuICAgICAgZWxlbS5tb3VzZW1vdmUoKGUpID0+IHtcbiAgICAgICAgaWYgKCFsaW5rSW5mbykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRyaWxsZG93blRvb2x0aXAudGV4dChcImNsaWNrIHRvIGdvIHRvOiBcIiArIGxpbmtJbmZvLnRpdGxlKTtcbiAgICAgICAgZHJpbGxkb3duVG9vbHRpcC5wbGFjZV90dChlLnBhZ2VYLCBlLnBhZ2VZIC0gNTApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaG9va3VwRHJpbGxkb3duTGlua1Rvb2x0aXAoKTtcblxuICAgIHRoaXMuZXZlbnRzLm9uKFwicmVuZGVyXCIsICgpID0+IHtcbiAgICAgIHJlbmRlcigpO1xuICAgICAgY3RybC5yZW5kZXJpbmdDb21wbGV0ZWQoKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDb2xvckZvclZhbHVlKGRhdGEsIHZhbHVlKSB7XG4gIGlmICghXy5pc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSBkYXRhLnRocmVzaG9sZHMubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgaWYgKHZhbHVlID49IGRhdGEudGhyZXNob2xkc1tpIC0gMV0pIHtcbiAgICAgIHJldHVybiBkYXRhLmNvbG9yTWFwW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfLmZpcnN0KGRhdGEuY29sb3JNYXApO1xufVxuXG5leHBvcnQgeyBCbGVuZFN0YXRDdHJsLCBCbGVuZFN0YXRDdHJsIGFzIFBhbmVsQ3RybCwgZ2V0Q29sb3JGb3JWYWx1ZSB9O1xuIl19