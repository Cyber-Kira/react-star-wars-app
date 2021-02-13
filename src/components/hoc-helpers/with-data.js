import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

const withData = (View, getData) => {
  return class extends Component {

    state = { 
      data: null,
      error: false
    }
  
    componentDidMount() {
      getData()
        .then(this.onListLoaded)
        .catch(this.onError);
    }
  
    onListLoaded = (data) => {
      this.setState({
        data,
        error: false
      })
    }

    onError = (error) => {
      this.setState({ 
        error: true
      });
    };

    render() {
      const { data, error } = this.state;

      if (!data) {
        return <Spinner />
      }

      if (error) {
        return <ErrorIndicator />
      }

      return (
        <View {...this.props} data={data} />
      )
    }
  };
};

export default withData;