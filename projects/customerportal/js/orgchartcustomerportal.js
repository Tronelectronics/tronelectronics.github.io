$(document).ready(function () {
    // JS 
    var selectedPoint;
    var highlightColor = '#5C6BC0',
        mutedHighlightColor = '#9FA8DA',
        mutedFill = '#f3f4fa',
        selectedFill = '#E8EAF6',
        normalFill = 'white';

    var points = [
        {
            x: 'Digital Steering Committee',
            id: 'DSG',
            attributes: {
                role: 'Steering Committee',
                photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'Procurement Manager',
            id: 'ProcurementManager',
            parent: 'DSG',
            attributes: {
                role: 'Procurement', photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'Guo, Mark',
            id: 'GuoMark',
            parent: 'DSG',
            attributes: {
                role: 'PMO Leader',
                photo: getImgText(
                    '../persona/Guo, Mark.jfif'
                )
            }
        },
        {
            x: 'Jiang, Josslyn',
            id: 'JiangJosslyn',
            parent: 'DSG',
            attributes: {
                role: 'Legal Counsel', photo: getImgText(
                    '../persona/Jiang, Josslyn.jfif'
                )
            }
        },
        {
            x: 'Jin, Charlie',
            id: 'JinCharlie',
            parent: 'LuDerrick',
            attributes: {
                role: 'Product Manager', photo: getImgText(
                    '../persona/Jin, Charlie.jfif'
                )
            }
        },
        {
            x: 'Chen, Dong',
            id: 'ChenDong',
            parent: 'DSG',
            attributes: {
                role: 'IT Manager', photo: getImgText(
                    '../persona/Chen, Dong.jfif'
                )
            }
        },
        {
            x: 'Lu, Derrick',
            id: 'LuDerrick',
            parent: 'YingSimon',
            attributes: {
                role: 'Product Manager', photo: getImgText(
                    '../persona/Lu, Derrick.jfif'
                )
            }
        },
        {
            x: 'Qian, Colin',
            id: 'QianColin',
            parent: 'ZhongXiaohu',
            attributes: {
                role: 'IoT Engineering Manager', photo: getImgText(
                    '../persona/Qian, Colin.jfif'
                )
            }
        },
        {
            x: 'Tian, Walter',
            id: 'TianWalter',
            parent: 'DSG',
            attributes: {
                role: 'Director, Aftermarket, Compression, Asia Pacific',
                photo: getImgText(
                    '../persona/Tian, Walter.jfif'
                )
            }
        },
        {
            x: 'Xu, Owen',
            id: 'XuOwen',
            parent: 'GuoMark',
            attributes: {
                role: 'PMO',
                photo: getImgText(
                    '../persona/Xu, Owen.jfif'
                )
            }
        },
        {
            x: 'Ying, Simon',
            id: 'YingSimon',
            parent: 'DSG',
            attributes: {
                role: 'Director, Digital Solution',
                photo: getImgText(
                    '../persona/Ying, Simon.jfif'
                )
            }
        },
        {
            x: 'Zhong, Xiaohu',
            id: 'ZhongXiaohu',
            parent: 'DSG',
            attributes: {
                role: 'Engineering Director, Electrical & Control', photo: getImgText(
                    '../persona/Zhong, Xiaohu.jfif'
                )
            }
        }
    ];

    var chart = JSC.chart('chartDiv1', {
        debug: true,
        type: 'organizational',
        defaultTooltip_enabled: false,

        /* These options will apply to all annotations including point nodes. */
        defaultAnnotation: {
            padding: [5, 10],
            margin: 6
        },
        annotations: [
            {
                position: 'bottom',
                label_text:
                    'Click on a node to select all nodes up the tree or click again to deselect.'
            }
        ],

        defaultSeries: {
            color: normalFill,
            /* Point selection is disabled because it is managed manually with point click events. */
            pointSelection: false
        },
        defaultPoint: {
            focusGlow: false,
            connectorLine: {
                color: '#e0e0e0',
                radius: [10, 3]
            },
            label: {
                text:
                    '%photo%name<br><span style="color:#9E9E9E">%role</span>',
                style_color: 'black'
            },
            outline: { color: '#e0e0e0', width: 1 },
            annotation: { syncHeight_with: 'level' },
            states: {
                mute: {
                    opacity: 0.8,
                    outline: {
                        color: mutedHighlightColor,
                        opacity: 0.9,
                        width: 2
                    }
                },
                select: {
                    enabled: true,
                    outline: {
                        color: highlightColor,
                        width: 2
                    },
                    color: selectedFill
                },
                hover: {
                    outline: {
                        color: mutedHighlightColor,
                        width: 2
                    },
                    color: mutedFill
                }
            },
            events: {
                click: pointClick,
                mouseOver: pointMouseOver,
                mouseOut: pointMouseOut
            }
        },
        series: [{ points: points }]
    });

    /** 
     * Event Handlers 
     */

    function pointClick() {
        var point = this,
            chart = point.chart;
        resetStyles(chart);
        if (point.id === selectedPoint) {
            selectedPoint = undefined;
            return;
        }
        selectedPoint = point.id;
        styleSelectedPoint(chart);
    }

    function pointMouseOver() {
        var point = this,
            chart = point.chart;
        chart.connectors([point.id, 'up'], {
            color: mutedHighlightColor,
            width: 2
        });
        chart
            .series()
            .points([point.id, 'up'])
            .options({ muted: true });
    }

    function pointMouseOut() {
        var point = this,
            chart = point.chart;
        // Reset point and line styling. 
        resetStyles(chart);
        // Style clicked points 
        styleSelectedPoint(chart);
        return false;
    }

    /** 
     * Styling helper functions 
     */

    function styleSelectedPoint(chart) {
        if (selectedPoint) {
            chart.connectors([selectedPoint, 'up'], {
                color: highlightColor,
                width: 2
            });
            chart
                .series()
                .points([selectedPoint, 'up'])
                .options({ selected: true, muted: false });
        }
    }

    /** 
     * Clears connectors and point states. 
     * @param chart Chart object 
     */
    function resetStyles(chart) {
        chart.connectors();
        chart
            .series()
            .points()
            .options({ selected: false, muted: false });
    }

    function getImgText(name) {
        return (
            '<img width=50 height=50 align=center margin_bottom=4 margin_top=4 src=' +
            name +
            '><br>'
        );
    }
})
