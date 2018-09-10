/* eslint-disable max-len */
import React, { Component } from "react";
import dateFns from "date-fns";

/* this is used for the random data generator */
// import randomJSONData from '../randomJSONData';
// const randomData = randomJSONData();
/* END this is used for the random data generator */

// import { FETCHUSERS } from "../CONSTANTS/constants";

const API = 'https://jsonplaceholder.typicode.com/';
const USER_QUERY = ['users', 'posts', 'comments', 'albums', 'photos', 'todos' ];

class Calendar extends Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        users: [],
        isLoading: false,
        error: null
    };

/* The below renderDays() function is for mapping hard coded days instead of using dateFns */
    // renderDays = () => {
    //     const days = [
    //         'Monday',
    //         'Tuesday',
    //         'Wednesday',
    //         'Thursday',
    //         'Friday',
    //         'Saturday',
    //         'Sunday'
    //     ];
    //
    //     const allDays = days.map((day) => {
    //         return (
    //             <div className="col col-center" key={ day }>
    //                 { day }
    //             </div>
    //         );
    //     });
    //     return <div className="days row">{ allDays }</div>;
    // };
/* end of the above renderDays() function that uses hardcoded day values */

    componentDidMount = () => {
        this.setState({ isLoading: true});

        fetch(API + USER_QUERY[0]) // selects value in '0' position in the array
            .then(response => response.json())
            .then(data => this.setState({ users: data, isLoading: false })) // sets the state of users to be that of the users in the api data scheme
        .then(json => console.log(json)) // use this to check to see if the data is being passed
    };

    renderDays = () => {
        const dateFormat = "ddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);
        for (let i=0; i<7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            )
        }
        return <div className="days row">{days}</div>;
    };

    renderCells = () => {
        const { currentMonth, selectedDate, users, isLoading } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;

                days.push(
                    <div
                        className={`col cell ${!dateFns.isSameMonth(day, monthStart) ? "disabled" : dateFns.isSameDay(day, selectedDate) ? "selected" : " "}`}
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        <span className="number">{formattedDate}</span>
                        {users.map(user => <p className="user-info" key={user.id}>{user.name}</p>)}
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        if(isLoading){
            return <p className="isLoading">Loading...</p>
        }
        return <div className="body">{rows}</div>
    };

    renderHeader = () => {
        const dateFormat = "MMMM YYYY";

        return (
            <div className="header row">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                        <span>
                          {dateFns.format(this.state.currentMonth, dateFormat)}
                        </span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    };

    onDateClick = ( day ) => {
        this.setState({
            selectedDate: day
        });
    };

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        })
    };

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        })
    };

    render () {
        return (
            <div className='Calendar-container'>
                <div className='calendar'>
                    { this.renderHeader() }
                    { this.renderDays() }
                    { this.renderCells() }
                </div>
            </div>
        );
    }
};

export default Calendar;