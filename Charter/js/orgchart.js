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
            x: 'Satya Nadella',
            id: 'president',
            attributes: {
                role: 'Chairman and Chief Executive Officer',
                photo: getImgText(
                    'https://news.microsoft.com/wp-content/uploads/prod/2017/09/satya-bio.png'
                )
            }
        },
        {
            x: 'Harvey-Lee Travis',
            id: 'vPresident1',
            parent: 'president',
            attributes: {
                role: 'Vice President',
                photo: getImgText(
                    'https://icons.iconarchive.com/icons/yellowicon/game-stars/256/Mario-icon.png'
                )
            }
        },
        {
            x: 'Gethin Morley',
            id: 'vPresident2',
            parent: 'president',
            attributes: {
                role: 'Vice President',
                photo: getImgText(
                    'https://icons.iconarchive.com/icons/yellowicon/game-stars/256/Pacman-icon.png'
                )
            }
        },
        {
            x: 'Sonnie Kim',
            id: 'vPresident3',
            parent: 'president',
            attributes: {
                role: 'Vice President',
                photo: getImgText(
                    'https://icons.iconarchive.com/icons/yellowicon/game-stars/256/Sonic-icon.png'
                )
            }
        },
        {
            x: 'Dante Curtis',
            id: 'manager1',
            parent: 'vPresident1',
            attributes: {
                role: 'Manager', photo: getImgText(
                    'https://icons.iconarchive.com/icons/yellowicon/game-stars/256/Zelda-icon.png'
                )
            }
        },
        {
            x: 'Honey Mullen',
            id: 'manager2',
            parent: 'vPresident1',
            attributes: {
                role: 'Manager', photo: getImgText(
                    'https://icons.iconarchive.com/icons/femfoyou/angry-birds/256/angry-bird-icon.png'
                )
            }
        },
        {
            x: 'Steffan Taylor',
            id: 'manager3',
            parent: 'vPresident2',
            attributes: {
                role: 'Manager', photo: getImgText(
                    'https://icons.iconarchive.com/icons/femfoyou/angry-birds/256/angry-bird-black-icon.png'
                )
            }
        },
        {
            x: 'Charlton Hester',
            id: 'manager4',
            parent: 'vPresident2',
            attributes: {
                role: 'Manager', photo: getImgText(
                    'https://icons.iconarchive.com/icons/femfoyou/angry-birds/256/angry-bird-blue-icon.png'
                )
            }
        },
        {
            x: 'Ishmael Orr',
            id: 'manager5',
            parent: 'vPresident2',
            attributes: {
                role: 'Manager', photo: getImgText(
                    'https://icons.iconarchive.com/icons/femfoyou/angry-birds/256/angry-bird-green-icon.png'
                )
            }
        },
        {
            x: 'Dua Frost',
            id: 'manager6',
            parent: 'manager5',
            attributes: {
                role: 'Manager', photo: getImgText(
                    'https://icons.iconarchive.com/icons/femfoyou/angry-birds/256/angry-bird-red-icon.png'
                )
            }
        },
        {
            x: 'Salahuddin Eastwood',
            id: 'manager7',
            parent: 'manager5',
            attributes: {
                role: 'Manager', photo: getImgText(
                    'https://icons.iconarchive.com/icons/femfoyou/angry-birds/256/angry-bird-white-icon.png'
                )
            }
        },
        {
            x: 'Nicole Tapia',
            id: 'employee1',
            parent: 'manager6',
            attributes: {
                role: 'Employee', photo: getImgText(
                    'https://icons.iconarchive.com/icons/femfoyou/angry-birds/256/angry-bird-yellow-icon.png'
                )
            }
        },
        {
            x: 'Arisha Hinton',
            id: 'employee2',
            parent: 'manager6',
            attributes: {
                role: 'Employee', photo: getImgText(
                    'https://icons.iconarchive.com/icons/sirea/angry-birds/256/Bird-black-icon.png'
                )
            }
        },
        {
            x: 'Martha Morley',
            id: 'employee3',
            parent: 'manager6',
            attributes: {
                role: 'Employee', photo: getImgText(
                    'https://icons.iconarchive.com/icons/sirea/angry-birds/256/Bird-blue-icon.png'
                )
            }
        },
        {
            x: 'Cathy Mcpherson',
            id: 'employee4',
            parent: 'manager6',
            attributes: {
                role: 'Employee', photo: getImgText(
                    'https://icons.iconarchive.com/icons/sirea/angry-birds/256/Bird-red-icon.png'
                )
            }
        },
        {
            x: 'Kiara Johns',
            id: 'manager8',
            parent: 'vPresident3',
            attributes: {
                role: 'Manager', photo: getImgText(
                    'https://icons.iconarchive.com/icons/sirea/angry-birds/256/Bird-white-icon.png'
                )
            }
        },
        {
            x: 'Grant Cash',
            id: 'manager9',
            parent: 'vPresident3',
            attributes: {
                role: 'Manager', photo: getImgText(
                    'https://icons.iconarchive.com/icons/sirea/angry-birds/256/Bird-yellow-icon.png'
                )
            }
        },
        {
            x: 'Juanita Cottrell',
            id: 'employee5',
            parent: 'manager8',
            attributes: {
                role: 'Employee', photo: getImgText(
                    'https://icons.iconarchive.com/icons/sirea/angry-birds/256/Pig-icon.png'
                )
            }
        },
        {
            x: 'Allana Frey',
            id: 'employee6',
            parent: 'manager8',
            attributes: {
                role: 'Employee', photo: getImgText(
                    'https://icons.iconarchive.com/icons/yellowicon/game-stars/256/Bomberman-icon.png'
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