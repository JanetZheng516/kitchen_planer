import React, { Component } from 'react'

export class Alert extends Component {
    render() {
        return (
            <div className="alert">
                {this.props.alertText}
            </div>
        )
    }
}

export default Alert
