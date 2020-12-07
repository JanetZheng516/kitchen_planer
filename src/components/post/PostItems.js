import React, { Component, Fragment } from 'react';
import IngredientList from '../show/IngredientList';
import RecipeList from '../show/RecipeList';




class PostItems extends Component {
    days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

    constructor(props) {
        super(props);
        this.state = {
            itemsToShow: []
        };

        const date = new Date();
        const weekday = date.getDay();
        this.day = weekday > 0 ? weekday - 1 : 6;
    }

    toggleItemComponents = (itemToToggle, dontHide) => {
        const itemsToShow = [...this.state.itemsToShow];
        const itemIsShown = itemsToShow.find(item => item === itemToToggle);
        if (itemIsShown && !dontHide) {
            // hide
            this.setState({ itemsToShow: itemsToShow.filter(item => item !== itemToToggle) });
        } else {
            // show
            itemsToShow.push(itemToToggle);
            this.setState({ itemsToShow });
        }
    }

    componentDidUpdate(prevProps) {
        // First time itemAdded to is different from empty/last time item
        if (prevProps.itemAddedTo !== this.props.itemAddedTo) {
            this.toggleItemComponents(this.props.itemAddedTo, true);
        }
    }

    render() {
        return (

            <div className="postsContainer">
                {this.props.items.length ? <span className="card-title">My weekly menu</span> : null}
                {this.days.map((day, index) => {
                    const dayItems = this.props.items.filter(item => item.day === day);
                    if (!dayItems.length) {
                        return '';
                    }
                    const dayColor = this.day === index ? 'pink' : 'inherit'; 
                    return (
                        <div key={day} className="menu">
                            <ul>
                                <strong id="weekday" className="list-title" style={{textTransform: 'capitalize', color: dayColor}}>{day}</strong>
                                    {dayItems.map((item, index) => {
                                        if (item.day === day) {
                                            const showList = this.state.itemsToShow.find(itemToShow => itemToShow === item);
                                            const isListEmpty = (!item.ingredients || !item.ingredients.length) && !item.recipe;
                                            return (
                                                <li className="collection-item" key={`${day}-${index}`}>
                                                    <div className="input">
                                                        {!isListEmpty && <a className="toggle" onClick={() => this.toggleItemComponents(item)}><i className={`fas fa-chevron-${!showList ? 'down' : 'up'}`}></i></a>}
                                                        <p> {item.meal} </p> 
                                                    </div>
                                                    <div>
                                                        <a className="secondary-content delete" onClick={() => this.props.deleteItem(item)} ><i className="fas fa-trash-alt"></i></a>
                                                        <a className="secondary-content edit" onClick={() => this.props.editItem(item)}><i className="edit-item fa fa-pencil"></i></a>
                                                        <a className="secondary-content add-recipe" id="myBtnAddrecipe" onClick={() => this.props.openRecipeModal(item)}><i className="fas fa-book-medical"></i></a>
                                                        <a className="secondary-content add-item" id="myBtnAddIngredient" onClick={() => this.props.openIngredientModal(item)}><i className="fas fa-cart-plus"></i></a>
                                                    </div>

                                                    {showList && <IngredientList item={item} ingredients={item.ingredients} removeIngredient={this.props.removeIngredient} />}

                                                    {showList && <RecipeList item={item} recipe={item.recipe}/> }
                                                </li>

                                            )
                                        }
                                        return '';
                                    })}
                            </ul>
                        </div>
                    )
                })}
            </div>

        )
    }
}

export default PostItems
