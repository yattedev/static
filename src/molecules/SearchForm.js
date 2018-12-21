import React, { Component } from 'react';

class SearchForm extends Component{
  render(){
    return(
      <form onSubmit={e => this.props.submitfunc(e)}>
        <input type='text' value={this.props.value} onChange={e => this.props.updatefunc(e)} />
        <input type='submit' value='send'/>
      </form>
    )
  }
}

export default SearchForm;
