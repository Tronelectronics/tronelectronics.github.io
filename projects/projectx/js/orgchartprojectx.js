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
            x: 'Chen, Cathier',
            id: 'ChenCathier',
            parent: 'DSG',
            attributes: {
                role: 'Process Support',
                photo: getImgText(
                    '../persona/Chen, Cathier.jfif'
                )
            }
        },
        {
            x: 'Xu, Owen',
            id: 'XuOwen',
            parent: 'DSG',
            attributes: {
                role: 'PMO',
                photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'Ying, Simon',
            id: 'YingSimon',
            parent: 'DSG',
            attributes: {
                role: 'Project Leader',
                photo: getImgText(
                    '../persona/Ying, Simon.jfif'
                )
            }
        },
        {
            x: 'Liu, Yin',
            id: 'LiuYin',
            parent: 'YingSimon',
            attributes: {
                role: 'Product Manager', photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'Zhong, Xiaohu',
            id: 'ZhongXiaohu',
            parent: 'YingSimon',
            attributes: {
                role: 'Engineering', photo: getImgText(
                    '../persona/Zhong, Xiaohu.jfif'
                )
            }
        },
        {
            x: 'Wang, Bob',
            id: 'WangBob',
            parent: 'YingSimon',
            attributes: {
                role: 'Procurement', photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'Liang, Karon',
            id: 'Liang, Karon',
            parent: 'YingSimon',
            attributes: {
                role: 'Delivery', photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'Kang, Zijin',
            id: 'KangZijin',
            parent: 'YingSimon',
            attributes: {
                role: 'Commercial', photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'Hong, Ganghong',
            id: 'HongGanghong',
            parent: 'KangZijin',
            attributes: {
                role: 'Commercial', photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'TBA',
            id: 'TBA',
            parent: 'YingSimon',
            attributes: {
                role: 'IT', photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
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