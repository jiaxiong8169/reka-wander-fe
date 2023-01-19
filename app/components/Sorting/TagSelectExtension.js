import {TagSelect} from 'react-native-tag-select';

class TagSelectExtension extends TagSelect {
  handleSelectItem = item => {
    const key = item[this.props.keyAttr] || item;

    const value = [];
    const found = this.state.value[key];

    value[key] = item;
    return this.setState({value}, () => {
      if (this.props.onItemPress) {
        this.props.onItemPress(item);
      }
    });
  };
}

export default TagSelectExtension;
