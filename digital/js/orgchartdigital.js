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
            parent: 'LiArnold',
            attributes: {
                role: 'Steering Committee',
                photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'BPO (Lean)',
            id: 'BusinessProcessOwnerLean',
            parent: 'LiDong',
            attributes: {
                role: 'Buniness Process',
                photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'BPO (Marketing)',
            id: 'BusinessProcessOwnerMarketing',
            parent: 'LiFlora',
            attributes: {
                role: 'Buniness Process',
                photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'BPO (Sales)',
            id: 'BusinessProcessOwnerSales',
            parent: 'GeKidd',
            attributes: {
                role: 'Buniness Process',
                photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'Data Analytics Resource',
            id: 'DataAnalyticsResource',
            parent: 'FanGeorge',
            attributes: {
                role: 'Data Analytics', photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'Fan, George',
            id: 'FanGeorge',
            parent: 'LinLily',
            attributes: {
                role: 'Engineering Director, Rotary', photo: getImgText(
                    '../persona/Fan, George.jfif'
                )
            }
        },
        {
            x: 'Ge, Kidd',
            id: 'GeKidd',
            parent: 'DSG',
            attributes: {
                role: 'VP & GM, Greater China, Customer Center, ITS AP',
                photo: getImgText(
                    '../persona/Ge, Kidd.jfif'
                )
            }
        },
        {
            x: 'Guo, Mark',
            id: 'GuoMark',
            parent: 'WangJun',
            attributes: {
                role: 'PMO and AME Leader',
                photo: getImgText(
                    '../persona/Guo, Mark.jfif'
                )
            }
        },
        {
            x: 'IT Application',
            id: 'ITApplication',
            parent: 'LuTony',
            attributes: {
                role: 'Application', photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'IT Cyber Security',
            id: 'ITCyberSecurity',
            parent: 'LuTony',
            attributes: {
                role: 'Cyber Security', photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'IT Infrastructure',
            id: 'ITInfrastructure',
            parent: 'LuTony',
            attributes: {
                role: 'Infrastructure', photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'IOT Resource',
            id: 'IOTResource',
            parent: 'ZhongXiaohu',
            attributes: {
                role: 'IOT', photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'Jiang, Josslyn',
            id: 'JiangJosslyn',
            parent: 'YuWarren',
            attributes: {
                role: 'Legal Counsel', photo: getImgText(
                    '../persona/Jiang, Josslyn.jfif'
                )
            }
        },
        {
            x: 'Li, Arnold',
            id: 'LiArnold',
            attributes: {
                role: 'SVP and President, ITS AP',
                photo: getImgText(
                    '../persona/Li, Arnold.jfif'
                )
            }
        },
        {
            x: 'Li, Dong',
            id: 'LiDong',
            parent: 'DSG',
            attributes: {
                role: 'Vice President, Execution Excellence, ITS AP',
                photo: getImgText(
                    '../persona/Li, Dong.jfif'
                )
            }
        },
        {
            x: 'Li, Flora',
            id: 'LiFlora',
            parent: 'DSG',
            attributes: {
                role: 'Vice President, Marketing & Product Management',
                photo: getImgText(
                    '../persona/Li, Flora.jfif'
                )
            }
        },
        {
            x: 'Lin, Lily',
            id: 'LinLily',
            parent: 'DSG',
            attributes: {
                role: 'Vice President, Engineering',
                photo: getImgText(
                    '../persona/Lin, Lily.jfif'
                )
            }
        },
        {
            x: 'Liu, Jason',
            id: 'LiuJason',
            parent: 'DSG',
            attributes: {
                role: 'Vice President, Procurement, ITS AP', photo: getImgText(
                    '../persona/Liu, Jason.jfif'
                )
            }
        },
        {
            x: 'Liu, Xi',
            id: 'LiuXi',
            parent: 'LiDong',
            attributes: {
                role: 'SFA Business Partner', photo: getImgText(
                    '../persona/Liu, Xi.jfif'
                )
            }
        },
        {
            x: 'Lu, Derrick',
            id: 'LuDerrick',
            parent: 'YingSimon',
            attributes: {
                role: 'Digital Product Manager',
                photo: getImgText(
                    '../persona/Lu, Derrick.jfif'
                )
            }
        },
        {
            x: 'Lu, Tony',
            id: 'LuTony',
            parent: 'DSG',
            attributes: {
                role: 'IT Director', photo: getImgText(
                    '../persona/Lu, Tony.jfif'
                )
            }
        },
        {
            x: 'Procurement Manager',
            id: 'ProcurementManager',
            parent: 'LiuJason',
            attributes: {
                role: 'Procurement',
                photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'Tian, Walter',
            id: 'TianWalter',
            parent: 'LiFlora',
            attributes: {
                role: 'Director, Aftermarket , Compression, Asia Pacific', photo: getImgText(
                    '../persona/Tian, Walter.jfif'
                )
            }
        },
        {
            x: 'Vendor Resource',
            id: 'VendorResource',
            parent: 'DSG',
            attributes: {
                role: 'Outsourcing',
                photo: getImgText(
                    'https://www.sap.com/content/dam/application/shared/icons/default-avatar.png'
                )
            }
        },
        {
            x: 'Wang, Jun',
            id: 'WangJun',
            parent: 'DSG',
            attributes: {
                role: 'Vice President, Operations',
                photo: getImgText(
                    '../persona/Wang, Jun.jfif'
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
            parent: 'LiFlora',
            attributes: {
                role: 'Director, Digital Solution',
                photo: getImgText(
                    '../persona/Ying, Simon.jfif'
                )
            }
        },
        {
            x: 'Yu, Warren',
            id: 'YuWarren',
            parent: 'DSG',
            attributes: {
                role: 'General Counsel - ITS AP', photo: getImgText(
                    '../persona/Yu, Warren.jfif'
                )
            }
        },
        {
            x: 'Zhong, Xiaohu',
            id: 'ZhongXiaohu',
            parent: 'LinLily',
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
