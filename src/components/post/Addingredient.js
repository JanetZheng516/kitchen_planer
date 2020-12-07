import React, { Component } from 'react'
import Alert from '../show/Alert'

class Addingredient extends Component {
    componentDidMount() {
        this.ingredientInput.focus();
        this.hasUnmounted = false;
    }

    constructor(props) {
        super(props)

        this.state = {
            ingredient: '',
            alertText: ''
        }

        this.alertTimeout = null;
    }

    componentWillUnmount() {
        this.hasUnmounted = true;
    }
    
    onAddClick = () => {
        this.props.postIngredient(this.state.ingredient);
        this.setState({ingredient:''}, () => {
            this.ingredientInput.focus();
        });

        const alertText = this.capitalizeSentence(`${this.state.ingredient} added to ${this.props.item.meal}`);
        this.setState({ alertText }, () => {
            clearTimeout(this.alertTimeout);
            this.alertTimeout = setTimeout(() => {
                if (!this.hasUnmounted) {
                    this.setState({ alertText: ''});
                }
            }, 3000);
        });
    }

    capitalizeSentence = str => str.charAt(0).toUpperCase() + str.slice(1);

    onIngredientChange = evt => this.setState({ingredient: evt.target.value});

    render() {
        return (
        <div className="postsContainer">
         
            <div id="myModalIngredient" className="modal">
                <div className="modal-content">
                    <span className="close"  onClick={() => this.props.closeIngredientModal()}>&times;</span>
                        {this.state.alertText ? <Alert alertText={this.state.alertText}/> : null}
                        <div className="add">
                            <input 
                                type="text" 
                                className="form-control ingredient" 
                                placeholder="Add new ingredient here" 
                                onChange={this.onIngredientChange} 
                                value={this.state.ingredient}
                                ref={(input) => {this.ingredientInput = input}} />
                            <button className="btn adding" onClick={this.onAddClick}>Add</button>
                        </div>
                </div>
            </div>
         
        </div>
        )
    }
}

export default Addingredient
