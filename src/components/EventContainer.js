import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createEvent } from "../actions/createEventAction";
import { getEvents } from "../actions/allEventsAction";
import EventForm from "./EventForm";

//filter by date, if date has passed DELETE event, just use a number to show a delete route
//max 9 per page .next button, if events.length > 9 show next button.

class CreateEventContainer extends React.Component {
  state = {
    name: "",
    pictureurl: "",
    description: "",
    enddate: ""
  };

  componentDidMount = () => {
    this.props.getEvents();
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.createEvent({
      name: this.state.name,
      pictureurl: this.state.pictureurl,
      description: this.state.description,
      enddate: this.state.enddate
    });

    this.setState({
      name: "",
      pictureurl: "",
      description: "",
      enddate: ""
    });
  };

  render() {
    // const today = 10; //should be the real today.
    // const eventListFuture = this.props.events.filter(event => {
    //   return event.enddate > today;
    // });

    // const eventListPast = this.props.events.filter(event => {
    //   return event.enddate < today;
    // });

    const eventList = this.props.events.map(event => {
      return (
        <div key={event.id}>
          <Link to={`/event/${event.id}`}>
            <img
              style={{ width: "200px", height: "200px" }}
              src={event.pictureurl}
              alt="not found"
            />
          </Link>
          <h3>{event.name}</h3>
        </div>
      );
    });

    // eventListPast.map(event => {
    //   deleteEvent();
    // });

    //console.log("events future", eventListFuture);
    if (this.props.loggedInUser) {
      return (
        <main>
          <h3>create a new event here</h3>
          <EventForm
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            values={this.state}
          />
          <h4>these are the events for the coming time</h4>
          {eventList}
        </main>
      );
    } else {
      return (
        <main>
          <h3>
            These are the current events, browse. If you want to create an
            event, log in.
          </h3>
          {eventList}
        </main>
      );
    }
  }
}

const mapDispatchToProps = { createEvent, getEvents };

function mapStateToProps(state) {
  return {
    comments: state.comments,
    tickets: state.tickets,
    events: state.events,
    signedUpUsers: state.signedUpUsers,
    loggedInUser: state.loggedInUser
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEventContainer);
