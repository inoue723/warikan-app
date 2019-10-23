import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const Categories = (props) => {
  const { categories, showCategories, handleSelectCategory } = props;
  return(
    <div className="category-group">
    { categories && showCategories && categories.map(category => {
      return (
        <button type="button" key={category.id} className="waves-effect waves-light btn" onClick={e => handleSelectCategory(e)}>{category.name}</button>
      )
    })}
  </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: `users/${props.auth.uid}/categories`,
        storeAs: "categories"
      }
  ]}),
  connect((state) => {
    return {
      categories: state.firestore.ordered.categories
    }
  })
)(Categories)
