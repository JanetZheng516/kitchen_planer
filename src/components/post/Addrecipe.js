import React, { Component } from 'react'

class Addrecipe extends Component {
    constructor(props) {
        super(props)

        this.state = {
           recipe: ''
        }

    }


    onSaveClick = () => {
        this.props.postRecipe(this.state.recipe);
        this.setState({recipe: ''})
    }

    onRecipeChange = evt => this.setState({recipe: evt.target.value});

    componentDidMount () {
        this.setState({recipe: this.props.item.recipe})
    }

    render() {
        return (
            <div className="postsContainer">
                <div id="myModalRecipe" className="modal"> 
                    <div className="modal-content">
                                <span className="close" onClick={() => this.props.closeRecipeModal()}>&times;</span>
                                <textarea placeholder="Add your recipe..." onChange={this.onRecipeChange} value={this.state.recipe}></textarea>
                                <div className="modalControl">
                                    <button className="btn save" onClick={this.onSaveClick}>Save</button>
                                    <button className="btn clear" onClick={this.props.clearRecipe}>Clear</button>
                                </div>  
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Addrecipe
