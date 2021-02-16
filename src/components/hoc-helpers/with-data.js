import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

const withData = (View) => {
  return class extends Component {

    state = { 
      data: null,
      error: false
    };

    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.update();
      }
    }
  
    componentDidMount() {
      this.update();
    }

    update() {
      this.props.getData()
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