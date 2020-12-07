import React, { Component } from 'react'

export class Navbar extends Component {
    render() {
        return (
    <nav>
        <div className="container">
            <a href="http://localhost:3000" className="logo">Kitchen Planner</a>
        </div>
    </nav>
        )
    }
}

export default Navbar
