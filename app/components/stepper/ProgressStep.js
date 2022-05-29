import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import ProgressButtons from './ProgressButtons';
import {CustomButton} from '../CustomButton';

class ProgressStep extends Component {
  onNextStep = async () => {
    this.props.onNext && (await this.props.onNext());

    // Return out of method before moving to next step if errors exist.
    if (this.props.errors) {
      return;
    }

    this.props.setActiveStep(this.props.activeStep + 1);
  };

  onPreviousStep = () => {
    // Changes active index and calls previous function passed by parent
    this.props.onPrevious && this.props.onPrevious();

    // Return out of method before moving to next step if errors exist.
    if (this.props.errors) {
      return;
    }

    this.props.setActiveStep(this.props.activeStep - 1);
  };

  onSubmit = () => {
    this.props.setActiveStep(this.props.activeStep + 1);
    this.props.onSubmit && this.props.onSubmit();
  };

  renderNextButton = () => {
    return (
      <CustomButton
        onPress={
          this.props.activeStep === this.props.stepCount - 1
            ? this.onSubmit
            : this.onNextStep
        }
        style={{
          width: 100,
          marginLeft: 10,
          marginRight: 10,
        }}
        colorScheme="blue">
        {this.props.activeStep === this.props.stepCount - 1
          ? this.props.finishBtnText
          : this.props.nextBtnText}
      </CustomButton>
    );
  };

  renderPreviousButton = () => {
    if (this.props.activeStep === 0) return <></>;

    return (
      <CustomButton
        onPress={this.onPreviousStep}
        colorScheme="orange"
        style={{
          width: 100,
          marginLeft: 10,
          marginRight: 10,
        }}>
        {this.props.previousBtnText}
      </CustomButton>
    );
  };

  render() {
    const scrollViewProps = this.props.scrollViewProps || {};
    const viewProps = this.props.viewProps || {};
    const isScrollable = this.props.scrollable;
    const buttonRow = this.props.removeBtnRow ? null : (
      <ProgressButtons
        renderNextButton={this.renderNextButton}
        renderPreviousButton={this.renderPreviousButton}
      />
    );

    return (
      <>
        {isScrollable ? (
          <ScrollView {...scrollViewProps}>
            {this.props.children}
            {buttonRow}
          </ScrollView>
        ) : (
          <View {...viewProps}>
            {this.props.children}
            {buttonRow}
          </View>
        )}
      </>
    );
  }
}

ProgressStep.propTypes = {
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  onSubmit: PropTypes.func,
  setActiveStep: PropTypes.func,
  nextBtnText: PropTypes.string,
  previousBtnText: PropTypes.string,
  finishBtnText: PropTypes.string,
  stepCount: PropTypes.number,
  scrollViewProps: PropTypes.object,
  viewProps: PropTypes.object,
  errors: PropTypes.bool,
  removeBtnRow: PropTypes.bool,
  scrollable: PropTypes.bool,
};

ProgressStep.defaultProps = {
  nextBtnText: 'Next',
  previousBtnText: 'Previous',
  finishBtnText: 'Finish',
  errors: false,
  removeBtnRow: false,
  scrollable: true,
};

export default ProgressStep;
