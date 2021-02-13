import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

const withDetails = (View, getData, getImageUrl) => {
  return class extends Component {

    state = {
      data: null,
      image: null,
      error: false
    }

    onItemLoaded = (data) => {
      this.setState({
        data,
        image: getImageUrl(data)
      });
    };

    onError = (error) => {
      this.setState({ 
        error: true,
        loading: false
      });
    };

    updateItem() {
      const { itemId } = this.props;
      if (!itemId) {
        return;
      }

      getData(itemId)
        .then(this.onItemLoaded)
        .catch(this.onError);
    }

    componentDidMount() {
      this.updateItem();
    }

    componentDidUpdate(prevProps) {
      if (this.props.itemId !== prevProps.itemId) {
        this.updateItem();
      };
    }

    render() {
      const { data, error, image } = this.state;
      if (!data) {
        return <Spinner />;
      }

      if (error) {
        return <ErrorIndicator />;
      }

      return (
        <View {...this.props} data={data} image={image} />
      );
    };
  };
};

export default withDetails;