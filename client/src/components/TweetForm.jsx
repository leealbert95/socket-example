import React from 'react';

class TweetForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(e) {
    if (e.target.value.length > 140) {
      return;
    }
    this.setState({value: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.state.value) {
      alert('Jeez write something!');
      return;
    }
    this.props.onSubmit(this.state.value);
  }

  render() {
    return (
      <form id="tweet-form" onSubmit={this.onSubmit} className="tweet-form">
        <span><textarea placeholder="Enter tweet here (140 characters max)" value={this.state.value} 
            onChange={this.onInputChange} className="tweet-text-field"/></span>
        <span><input className="tweet-button" type="submit" value="Post"/></span>
      </form>
    )
  }
}

export default TweetForm;