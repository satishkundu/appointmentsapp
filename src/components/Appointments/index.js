// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilterdAppointmensList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilterdAppointmensList()

    return (
      <div className="app-container">
        <div className="appointments-container">
          <form className="form" onSubmit={this.onAddAppointment}>
            <h1 className="add-appointment-heading">Add Appointment</h1>
            <label htmlFor="title" className="label">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={titleInput}
              onChange={this.onChangeInputTitleInput}
              className="input"
              placeholder="Title"
            />
            <label htmlFor="date" className="label">
              DATE
            </label>
            <input
              type="date"
              id="date"
              value={dateInput}
              onChange={this.onChangeDateInput}
            />
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
            alt="appointments"
          />
        </div>
        <hr />
        <div className="appointemnts-filter-container">
          <h1 className="appointment-heading">Appointments</h1>
          <button
            type="button"
            onClick={this.onFilter}
            className={filterClassName}
          >
            Starred
          </button>
        </div>
        <ul className="appointments-list">
          {filteredAppointmentsList.map(eachAppointment => (
            <AppointmentItem
              key={eachAppointment.id}
              appointmentDetails={eachAppointment}
              toggleIsstarred={this.toggleIsStarred}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Appointments
