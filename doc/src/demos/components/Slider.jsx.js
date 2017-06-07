define(function (require) {

    var Creater = require('../Main.jsx');
    var Slider = require('fcui2/Slider.jsx');

    var items = [
        {
            title: 'Normal Slider',
            props: {}
        },
        {
            title: 'Slider with ShowLabel',
            props: {showLabel: true}
        },
        {
            title: 'Slider with Measure',
            props: {showLabel: true, measure: 'kg'}
        },
        {
            title: 'Readonly Slider',
            props: {value: 50, width: 300}
        },
        {
            title: 'Slider with Float Value',
            props: {type: 'float'}
        },
        {
            title: 'Slider with Max and Step',
            props: {max: 200, step: 20}
        },
        {
            title: 'Slider with Min, and an incorrect Value',
            props: {min: 10, value: 1, width: 200}
        },
        {
            title: 'Slider with Fixed',
            props: {fixed: 1, width: 100, type: 'float'}
        },
        {
            title: 'Slider with ClassName',
            props: {className: 'marginLeft100 border2'}
        },
        {
            title: 'Disabled Slider',
            props: {disabled: true}
        },
        {
            title: 'Slider with Width',
            props: {width: 500}
        }
    ];

    return Creater(Slider, items, 'onChange');
});
