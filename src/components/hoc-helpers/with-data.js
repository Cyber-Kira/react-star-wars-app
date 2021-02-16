import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

const withData = (View) => {
  return class extends Component {

    state = { 
      data: null,
      loading: true,
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
      this.setState({
        loading: true,
        error: false
      });

      this.props.getData()
        .then(this.onListLoaded)
        .catch(this.onError);
    }
  
    onListLoaded = (data) => {
      this.setState({
        data,
        loading: false
      })
    }

    onError = (error) => {
      this.setState({
        loading:false, 
        error: true
      });
    };

    render() {
      const { data, loading, error } = this.state;

      if (loading) {
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