/**
 * @file 选择框组件
 * @author Brian Li
 * @email lbxxlht@163.com
 * @version 0.0.1
 */
define(function (require) {


    var React = require('react');
    var InputWidgetBase = require('./mixins/InputWidgetBase');
    var InputWidgetInForm = require('./mixins/InputWidgetInForm');
    var Layer = require('./Layer.jsx');
    var List = require('./List.jsx');


    return React.createClass({
        // @override
        mixins: [InputWidgetBase, InputWidgetInForm],
        // @override
        getDefaultProps: function () {
            return {
                className: '',
                minWidth: 60,
                width: NaN,
                placeholder: 'please select',
                datasource: [],  // 见List
                disabled: false,
                valueTemplate: ''
            };
        },
        // @override
        getInitialState: function () {
            return {
                layerOpen: false
            };
        },
        listClickHandler: function (e) {
            var value = this.___getValue___();
            if (this.props.disabled || value === e.target.value) return;
            this.___dispatchChange___(e);
            this.setState({layerOpen: false});
        },
        mouseEnterHandler: function (e) {
            this.setState({layerOpen: true});
        },
        mouseLeaveHandler: function (e) {
            var me = this;
            // 这个延迟不加layer会消失
            setTimeout(function () {
                if (me.refs.list && me.refs.list.state.mouseover) return;
                me.setState({layerOpen: false});
            }, 100);
        },
        render: function () {
            var me = this;
            var containerProp = {
                className: 'fcui2-dropdownlist ' + this.props.className,
                style: {
                    minWidth: this.props.minWidth,
                    borderColor: this.state.isValid === false ? '#F00' : undefined 
                },
                onMouseEnter: this.mouseEnterHandler,
                onMouseLeave: this.mouseLeaveHandler,
                ref: 'container'
            };
            var listProp = {
                datasource: this.props.datasource,
                ref: 'list',
                onMouseLeave: this.mouseLeaveHandler,
                onClick: this.listClickHandler
            };
            if (this.props.disabled) {
                containerProp.className += ' fcui2-dropdownlist-disabled';
            }
            if (!isNaN(this.props.width)) {
                delete containerProp.style.minWidth;
                containerProp.style.width = this.props.width;
            }
            var label = this.props.placeholder;
            var value = this.___getValue___();
            for (var i = 0; i < this.props.datasource.length; i++) {
                if (this.props.datasource[i].value + '' === value + '') {
                    label = this.props.datasource[i].label;
                    break;
                }
            }
            return (
                <div {...containerProp}>
                    <div className="icon-right font-icon font-icon-largeable-caret-down"></div>
                    <div className="label-container">{label}</div>
                    <Layer isOpen={this.state.layerOpen && this.props.datasource.length} anchor={this.refs.container}>
                        <List {...listProp}/>
                    </Layer>
                </div>
            );
        }
    });
});
