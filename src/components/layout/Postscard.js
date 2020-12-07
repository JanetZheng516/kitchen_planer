import React, { Component } from 'react';

class Postscard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            day: '',
            meal: '',
            ingredients: [],
            recipe: ''
        };
    }

    onDayChange = evt => this.setState({day: evt.target.value});

    onMealChange = evt => this.setState({meal: evt.target.value});

    onPostClick = () => {
        this.props.postItem({...this.state});
        this.clearState();
    }

    onUpdateClick = () => {
        this.props.updateItem({...this.state});
        this.clearState();
    }

    clearState = () => this.setState({day: '', meal: '', ingredients: [], recipe: ''});

    componentDidUpdate(prevProps) {
        if (prevProps.currentEditItem !== this.props.currentEditItem && this.props.currentEditItem) {
            this.setState({...this.props.currentEditItem});
        }
    }

    render() {
        return (
            <div className="postsContainer">
                <div className="card">
                    <span className="card-title">What are we going to eat today?</span>

                    <div className="row">
                        <div className="post">
                            <label className="item-name">Day</label>
                            <select id="date" className="form-control" value={this.state.day} onChange={this.onDayChange}>
                                <option value=""></option>
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                                <option value="saturday">Saturday</option>
                                <option value="sunday">Sunday</option>
                            </select> 
                        </div>

                        <div className="post">
                            <label className="item-name">Meal</label>
                            <input type="text" id="meal" className="form-control" value={this.state.meal} onChange={this.onMealChange} />
                        </div>
                    </div>

                    {this.props.currentEditItem ? (
                        <button className="btn" onClick={this.onUpdateClick}>Update</button>
                    ) : (
                        <button className="btn" onClick={this.onPostClick}>Post</button>
                    )}
                </div>
                
            </div>   
        )
    }
}

export default Postscard
