define(function (require) {


    var React = require('react');
    var ButtonDemo = require('./demos/Button.jsx'); 
    var TextBoxDemo = require('./demos/TextBox.jsx');
    var NumberBoxDemo = require('./demos/NumberBox.jsx');
    var SelectDemo = require('./demos/Select.jsx');
    var ListDemo = require('./demos/List.jsx');
    var TextAreaDemo = require('./demos/TextArea.jsx');
    var PagerDemo = require('./demos/Pager.jsx');
    var TipDemo = require('./demos/Tip.jsx');
    var DropDownListDemo = require('./demos/DropDownList.jsx');
    var ComboListDemo = require('./demos/ComboList.jsx');
    var TableDemo = require('./demos/Table.jsx');
    var DialogDemo = require('./demos/Dialog.jsx');
    var FormDemo = require('./demos/Form.jsx');
    var CheckboxDemo = require('./demos/CheckBox.jsx');
    var RadioDemo = require('./demos/Radio.jsx');
    var CalendarDemo = require('./demos/Calendar.jsx');
    var DropDownCalendarDemo = require('./demos/DropDownCalendar.jsx');
    var RangeCalendarDemo = require('./demos/RangeCalendar.jsx');
    var ScheduleDemo = require('./demos/Schedule.jsx');
    var DropDownScheduleDemo = require('./demos/DropDownSchedule.jsx');
    var RegionDemo = require('./demos/Region.jsx');
    var DropDownRegionDemo = require('./demos/DropDownRegion.jsx');
    var TabDemo = require('./demos/Tab.jsx');
    var SearchBoxDemo = require('./demos/SearchBox.jsx');
    var WizardDemo = require('./demos/Wizard.jsx');
    var CrumbDemo = require('./demos/Crumb.jsx');
    var TreeDemo = require('./demos/Tree.jsx');


    var ListItem = React.createClass({
        // @override
        getDefaultProps: function () {
            return {
                demo: '',
                label: 'Item',
                onClick: function () {}
            };
        },
        clickHandler: function () {
            this.props.onClick(this.props.label);
        },
        render: function () {
            var prop = {
                className: 'list-item' + (this.props.demo === this.props.label ? ' list-item-selectd' : ''),
                onClick: this.clickHandler
            };
            return <div {...prop}>{this.props.label}</div>;
        }
    });


    return React.createClass({
        // @override
        getDefaultProps: function () {
            return {
                demo: 'Button',
                title: 'FCUI v2.0.1',
                dispatch: function () {}
            };
        },
        // @override
        getInitialState: function () {
            return {
                message: ''
            };
        },
        changeDemo: function (demo) {
            if (demo === this.props.demo) return;
            this.props.dispatch('changeHash', {
                demo: demo
            });
        },
        changeMessage: function (str) {
            this.setState({message: str})
        },
        render: function () {
            return (
                <div>
                    <div className="logo">{this.props.title}</div>
                    <div className="left-container">
                        <ListItem demo={this.props.demo} label="Tip" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="Button" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="List" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="DropDownList" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="ComboList" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="Pager" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="Tab" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="Crumb" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="Wizard" onClick={this.changeDemo}/>
                        <hr/>
                        <ListItem demo={this.props.demo} label="CheckBox" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="Radio" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="TextBox" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="NumberBox" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="TextArea" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="Select" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="Calendar" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="DropDownCalendar" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="RangeCalendar" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="Schedule" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="DropDownSchedule" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="Region" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="DropDownRegion" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="SearchBox" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="Tree" onClick={this.changeDemo}/>
                        <hr/>
                        <ListItem demo={this.props.demo} label="Table" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="Dialog" onClick={this.changeDemo}/>
                        <ListItem demo={this.props.demo} label="Form" onClick={this.changeDemo}/>
                        <hr/>
                    </div>
                    <div className="right-top-container">{this.state.message}</div>
                    <div className="right-middle-container">
                        <ButtonDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <TextBoxDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <NumberBoxDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <SelectDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <ListDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <TextAreaDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <PagerDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <TipDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <DropDownListDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <ComboListDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <TableDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <DialogDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <FormDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <CheckboxDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <RadioDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <CalendarDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <DropDownCalendarDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <RangeCalendarDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <ScheduleDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <DropDownScheduleDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <RegionDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <DropDownRegionDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <CrumbDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <WizardDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <TabDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <SearchBoxDemo demo={this.props.demo} alert={this.changeMessage}/>
                        <TreeDemo demo={this.props.demo} alert={this.changeMessage} />
                    </div>
                    <div className="right-bottom-container" style={{display: 'none'}}></div>
                </div>
            );
        }
    });
});