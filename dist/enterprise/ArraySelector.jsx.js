var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 企业级数组选择器
 * @author Brian Li
 * @email lbxxlht@163.com
 * @version 0.0.2.1
 */
define(function (require) {

    var React = require('react');
    var Button = require('../Button.jsx');
    var Layer = require('../Layer.jsx');
    var Tip = require('../Tip.jsx');
    var InputWidget = require('../mixins/InputWidget');
    var cTools = require('../core/componentTools');
    var util = require('../core/util');
    var language = require('../core/language').arraySelector;
    var defaultLabels = {
        dropdownLabel: 'please select',
        selectedLabel: 'Selected Items',
        unselectedLabel: 'Unselected Items',
        tip: {
            title: '',
            content: 'tip content'
        }
    };

    return React.createClass({
        // @override
        contextTypes: {
            appSkin: React.PropTypes.string
        },
        // @override
        mixins: [InputWidget],
        // @override
        /**
         * @properties
         * @param {Import|Properties} src\core\componentTools.js skin className style disabled
         * @param {Object} labels 话术配置
         * @param {String} labels.dropdownLabel 下拉模式下，下拉按钮话术
         * @param {String} labels.selectedLabel 已选panel的标题
         * @param {String} labels.unselectedLabel 未选panel的标题
         * @param {Object} labels.tip 右侧tip配置
         * @param {Import|Properties} src\enterprise\DualTreeSelector.jsx.js clearTemporaryAfterLayerClose isDropDown onBeforeLayerClose onLayerClose
         * @param {Import|Properties} src\mixins\InputWidget.js value onChange name validations customErrorTemplates valueTemplate
         */
        /**
         * @structure ArraySelectorValue
         * @example
         *  '{
         *      selected: <required>,
         *      unselected: <required>
         *  }'
         * @param {Array.<ListItemObject>} selected 选中的项目
         * @param {Array.<ListItemObject>} unselected 未选中的项目
         */
        getDefaultProps: function getDefaultProps() {
            return {
                // base
                skin: '',
                className: '',
                style: {},
                disabled: false,
                // self
                labels: defaultLabels,
                clearTemporaryAfterLayerClose: true,
                isDropDown: false,
                onBeforeLayerClose: cTools.noop,
                onLayerClose: cTools.noop,
                // mixin
                valueTemplate: JSON.stringify({
                    selected: [],
                    unselected: []
                })
            };
        },
        // @override
        getInitialState: function getInitialState() {
            return {
                layerOpen: false,
                dropdownValue: this.___getValue___()
            };
        },
        // @override
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            if (nextProps.isDropDown && nextProps.clearTemporaryAfterLayerClose) {
                this.setState({ dropdownValue: nextProps.value });
            }
        },
        onMoveForward: function onMoveForward(e) {
            var index = +util.getDataset(e.target).uiCmd;
            var value = getValue(this);
            var selected = value.selected;
            var tmp = selected[index - 1];
            selected[index - 1] = selected[index];
            selected[index] = tmp;
            setValue(e, this, value);
        },
        onMoveBackward: function onMoveBackward(e) {
            var index = +util.getDataset(e.target).uiCmd;
            var value = getValue(this);
            var selected = value.selected;
            var tmp = selected[index + 1];
            selected[index + 1] = selected[index];
            selected[index] = tmp;
            setValue(e, this, value);
        },
        onRemove: function onRemove(e) {
            var index = +util.getDataset(e.target).uiCmd;
            var value = getValue(this);
            var selected = value.selected;
            var unselected = value.unselected;
            unselected.push(selected[index]);
            selected.splice(index, 1);
            setValue(e, this, value);
        },
        onAdd: function onAdd(e) {
            var index = +util.getDataset(e.target).uiCmd;
            var value = getValue(this);
            var selected = value.selected;
            var unselected = value.unselected;
            selected.push(unselected[index]);
            unselected.splice(index, 1);
            setValue(e, this, value);
        },
        onDefaultClick: function onDefaultClick(e) {
            setValue(e, this, getValue(this, this.props.valueTemplate));
        },
        onSelectAllClick: function onSelectAllClick(e) {
            var value = getValue(this);
            value.selected = value.selected.concat(value.unselected);
            value.unselected = [];
            setValue(e, this, value);
        },
        onLayerEnter: function onLayerEnter(e) {
            e.target.value = this.state.dropdownValue;
            this.___dispatchChange___(e);
            var tmpValue = this.state.dropdownValue;
            if (this.props.clearTemporaryAfterLayerClose) {
                tmpValue = this.props.value ? this.props.value : '';
            }
            this.setState({ ___beOperated___: false });
            e = {};
            this.onBeforeLayerClose(e);
            if (e.returnValue) {
                typeof this.props.onLayerClose === 'function' && this.props.onLayerClose();
                this.setState({
                    layerOpen: false,
                    dropdownValue: tmpValue
                });
            }
        },
        onLayerClose: function onLayerClose(e) {
            var tmpValue = this.state.dropdownValue;
            var beOperated = this.state.___beOperated___;
            if (this.props.clearTemporaryAfterLayerClose) {
                tmpValue = this.props.value ? this.props.value : '';
                beOperated = false;
            }
            typeof this.props.onLayerClose === 'function' && this.props.onLayerClose();
            this.setState({
                layerOpen: false,
                dropdownValue: tmpValue,
                ___beOperated___: beOperated
            });
        },
        onBeforeLayerClose: function onBeforeLayerClose(e) {
            e.returnValue = true;
            typeof this.props.onBeforeLayerClose === 'function' && this.props.onBeforeLayerClose(e);
        },
        render: function render() {
            if (!this.props.isDropDown) return mainContentFactory(this);
            var containerProp = cTools.containerBaseProps('dropdownlist', this, {
                merge: {
                    onClick: cTools.openLayerHandlerFactory(this, 'layerOpen')
                },
                widthCorrect: -12
            });
            var labels = util.extend({}, defaultLabels, this.props.labels);
            var layerProp = {
                ref: 'layer',
                style: {
                    width: '590px'
                },
                isOpen: this.state.layerOpen,
                anchor: this.refs.dropdownContainer,
                location: 'bottom',
                closeWithBodyClick: true,
                onCloseByWindow: this.onLayerClose,
                skin: this.context.appSkin ? this.context.appSkin + '-normal' : 'normal'
            };
            var enterButtonProp = {
                disabled: !this.state.___beOperated___,
                label: language.enter,
                skin: 'important',
                onClick: this.onLayerEnter
            };
            containerProp.ref = 'dropdownContainer';
            var skin = this.props.skin ? this.props.skin : 'normal';
            skin = this.context.appSkin ? this.context.appSkin + '-' + skin : skin;
            containerProp.className += layerProp.isOpen ? ' fcui2-dropdownlist-' + skin + '-hover' : '';
            return React.createElement(
                'div',
                containerProp,
                React.createElement('div', { className: 'icon-right fcui2-icon fcui2-icon-arrow-down' }),
                React.createElement(
                    'span',
                    { className: 'label-container' },
                    labels.dropdownLabel ? labels.dropdownLabel : ''
                ),
                React.createElement(
                    Layer,
                    layerProp,
                    React.createElement(
                        'div',
                        { style: { padding: 10, width: 555 } },
                        mainContentFactory(this),
                        React.createElement(Button, enterButtonProp),
                        React.createElement(Button, { label: language.cancel, onClick: this.onLayerClose, style: { marginLeft: 10 } })
                    )
                )
            );
        }
    });

    function mainContentFactory(me) {
        var value = me.props.isDropDown ? me.state.dropdownValue : me.___getValue___();
        var labels = util.extend({}, defaultLabels, me.props.labels);
        var containerProp = me.props.isDropDown ? {
            ref: 'container',
            className: 'fcui2-arrayselector-enterprise fcui2-arrayselector-enterprise-' + (me.props.skin ? me.props.skin : 'normal') + ' ' + (me.props.className ? me.props.className : '')
        } : cTools.containerBaseProps('arrayselector-enterprise', me);
        try {
            value = JSON.parse(value);
        } catch (e) {
            value = {};
        }
        value.selected = value.selected instanceof Array ? value.selected : [];
        value.unselected = value.unselected instanceof Array ? value.unselected : [];
        return React.createElement(
            'div',
            containerProp,
            React.createElement(
                'div',
                { className: 'shortcut-bar' },
                React.createElement(Tip, _extends({}, labels.tip, { layerLocation: 'left bottom' })),
                React.createElement(
                    'span',
                    { onClick: me.onDefaultClick },
                    language.default
                ),
                ' | ',
                React.createElement(
                    'span',
                    { onClick: me.onSelectAllClick },
                    language.addAll
                )
            ),
            React.createElement(
                'div',
                { className: 'selected-option-title' },
                labels.selectedLabel,
                React.createElement(
                    'span',
                    { className: 'selected-option-title-info' },
                    '(' + language.click,
                    React.createElement('span', { className: 'fcui2-icon fcui2-icon-remove' }),
                    language.delete + ')'
                )
            ),
            React.createElement(
                'div',
                { className: 'selected-option-container' },
                selectedFactory(value.selected, me)
            ),
            React.createElement(
                'div',
                { className: 'unselected-option-title' },
                labels.unselectedLabel,
                React.createElement(
                    'span',
                    { className: 'selected-option-title-info' },
                    '(' + language.click,
                    React.createElement('span', { className: 'fcui2-icon fcui2-icon-plus' }),
                    language.add + ')'
                )
            ),
            React.createElement(
                'div',
                { className: 'unselected-option-container' },
                unselectedFactory(value.unselected, me)
            )
        );
    }

    function selectedFactory(arr, me) {
        var doms = [];
        for (var i = 0; i < arr.length; i++) {
            var disabled = me.props.disabled || arr[i].disabled;
            var leftProp = {
                className: 'fcui2-icon fcui2-icon-arrow-left' + (i === 0 || disabled ? ' icon-disabled' : ''),
                onClick: i === 0 || disabled ? undefined : me.onMoveForward,
                'data-ui-cmd': i + ''
            };
            var rightProp = {
                className: 'fcui2-icon fcui2-icon-arrow-right' + (i === arr.length - 1 || disabled ? ' icon-disabled' : ''),
                onClick: i === arr.length - 1 || disabled ? undefined : me.onMoveBackward,
                'data-ui-cmd': i + ''
            };
            var deleteProp = {
                className: 'fcui2-icon fcui2-icon-remove' + (disabled ? ' icon-disabled' : ''),
                onClick: me.props.disabled || disabled ? undefined : me.onRemove,
                'data-ui-cmd': i + ''
            };
            doms.push(React.createElement(
                'div',
                { key: 'selected-' + i, className: 'selected-option' },
                React.createElement(
                    'span',
                    { className: 'option-index-label' },
                    i + 1
                ),
                React.createElement(
                    'span',
                    { className: 'option-label' },
                    arr[i].label
                ),
                React.createElement('span', leftProp),
                React.createElement('span', rightProp),
                React.createElement('span', deleteProp)
            ));
        }
        return doms;
    }

    function unselectedFactory(arr, me) {
        var doms = [];
        for (var i = 0; i < arr.length; i++) {
            var disabled = me.props.disabled || arr[i].disabled;
            var addBtn = {
                className: 'fcui2-icon fcui2-icon-plus' + (disabled ? ' icon-disabled' : ''),
                onClick: disabled ? undefined : me.onAdd,
                'data-ui-cmd': i + ''
            };
            doms.push(React.createElement(
                'div',
                { key: 'unselected-' + i, className: 'selected-option' },
                React.createElement(
                    'span',
                    { className: 'option-label' },
                    arr[i].label
                ),
                React.createElement('span', addBtn)
            ));
        }
        return doms;
    }

    function getValue(me, value) {
        value = typeof value === 'string' ? value : me.props.isDropDown ? me.state.dropdownValue : me.___getValue___();
        try {
            value = JSON.parse(value);
        } catch (e) {
            value = {
                selected: [],
                unselected: []
            };
        }
        value.selected = value.selected instanceof Array ? value.selected : [];
        value.unselected = value.unselected instanceof Array ? value.unselected : [];
        return value;
    }

    function setValue(e, me, value) {
        e = { target: me.refs.container };
        e.target.value = JSON.stringify(value);
        if (me.props.isDropDown) {
            me.setState({
                ___beOperated___: true,
                dropdownValue: e.target.value
            });
        } else {
            me.___dispatchChange___(e);
        }
    }
});