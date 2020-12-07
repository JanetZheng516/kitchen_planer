import React, { Component } from 'react'

class IngredientList extends Component {
    render() {
        if (!this.props.ingredients.length) {
            return '';
        }
        return (
           <ul className="list-group">
              {this.props.ingredients.map((ingredient, index) => (
                  <li key={index} className='item-list'>
                      {ingredient} 
                      <a href="#" className="secondary-content remove" onClick={() => this.props.removeIngredient(this.props.item, index)} ><i className="fas fa-minus-circle"></i></a> 
                  </li>
              ))}
           </ul>
        )
    }
}

export default IngredientList
