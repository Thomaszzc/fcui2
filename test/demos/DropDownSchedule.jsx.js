define(function (require) {

    var React = require('react');
    var DropDownSchedule = require('fcui/DropDownSchedule.jsx');

    function strFactory(l, a) {
        var s = '';
        while (l > 0) {
            s += a;
            l--;
        }
        return s;
    }

    var items = [
        {
            title: 'Normal DropDownSchedule',
            onChange: true,
            props: {label: '选择时间'}
        },
        {
            title: 'DropDownSchedule with ClassName',
            onChange: true,
            props: {className: 'marginLeft100 border2'}
        },
        {
            title: 'Readonly DropDownSchedule',
            onChange: true,
            props: {value: '111000000111110001011010000011111110011110001111111111001111'}
        },
        {
            title: 'Disabled DropDownSchedule',
            onChange: true,
            props: {disable: true, value: '111000000111110001011010000011111110011110001111111111001111'}
        },
        {
            title: 'DropDownSchedule with ShortCut',
            onChange: true,
            props: {
                className: 'border2',
                shortCut: [
                    {
                        label: '全选',
                        getValues: function () {
                            return strFactory(24 * 7, 1);
                        }
                    },
                    {
                        label: '工作日',
                        getValues: function () {
                            return strFactory(24 * 5, 1) + strFactory(24 * 2, 0);
                        }
                    },
                    {
                        label: '休息日',
                        getValues: function () {
                            return strFactory(24 * 5, 0) + strFactory(24 * 2, 1);
                        }
                    }
                ]
            }
        },
        {
            title: 'DropDownSchedule with ValueLinker',
            valueLink: true,
            props: {}
        },
        {
            title: 'Custom Link DropDownSchedule',
            customLink: true,
            props: {}
        }
    ];

    function setter(me, field) {
        return function (e) {
            var obj = {};
            obj[field] = e.target.value;
            me.setState(obj);
        }
    }

    function factory(me, items) {
        var widgets = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var prop = item.props;
            var conf = JSON.stringify(prop);
            if (item.onChange) prop.onChange = me.changeHandler;
            if (item.valueLink) {
                prop.valueLink = me.linkState(item.title);
                conf = '{valueLink: this.linkState(\'message\')}';
            }
            if (item.customLink) {
                prop.value = me.state[item.title];
                prop.onChange = setter(me, item.title);
                conf = '{value: this.state.message, onChange: this.changeHandler}';
            }
            widgets.push(
                <div className="demo-item" key={i}>
                    <h3>{item.title}</h3>
                    <div className="props">{conf}</div>
                    <DropDownSchedule {...prop}/>
                    <span>{me.state[item.title]}</span>
                </div>
            );
        }
        return widgets;
    }


    return React.createClass({
        mixins: [React.addons.LinkedStateMixin],
        // @override
        getDefaultProps: function () {
            return {
                demo: 'DropDownSchedule',
                alert: function () {}
            };
        },
        // @override
        getInitialState: function () {
            return {};
        },
        changeHandler: function (e) {
            this.props.alert(e.target.value);
        },
        render: function () {
            var containerProp = {
                className: 'demo-content',
                style: {
                    display: this.props.demo === 'DropDownSchedule' ? 'block' : 'none'
                }
            };
            return (<div {...containerProp}>{factory(this, items)}</div>);
        }
    });
});
