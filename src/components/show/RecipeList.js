import React, { Component } from 'react'

class RecipeList extends Component {
    render() {
        if (!this.props.recipe) {
            return '';
        }
        return (
           <div className="box">
              {this.props.recipe}
           </div>
        )
    }
}

export default RecipeList
