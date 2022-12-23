import React, {Component} from 'react';
import {View} from 'native-base';
import {times} from 'lodash';
import PropTypes from 'prop-types';
import StepIcon from './StepIcon';

class ProgressSteps extends Component {
  state = {
    stepCount: 0,
    activeStep: this.props.activeStep,
  };

  componentDidMount() {
    this.setState({stepCount: React.Children.count(this.props.children)});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeStep !== this.props.activeStep) {
      this.setActiveStep(this.props.activeStep);
    }
  }

  getChildProps() {
    return {...this.props, ...this.state};
  }

  renderStepIcons = () => {
    let step = [];

    times(this.state.stepCount, i => {
      const isCompletedStep = this.props.isComplete
        ? true
        : i < this.state.activeStep;

      const isActiveStep = this.props.isComplete
        ? false
        : i === this.state.activeStep;

      step.push(
        <View key={i}>
          <View>
            <StepIcon
              {...this.getChildProps()}
              stepNum={i + 1}
              label={this.props.children[i].props.label}
              isFirstStep={i === 0}
              isLastStep={i === this.state.stepCount - 1}
              isCompletedStep={isCompletedStep}
              isActiveStep={isActiveStep}
            />
          </View>
        </View>,
      );
    });

    return step;
  };

  // Callback function from ProgressStep that passes current step.
  setActiveStep = step => {
    // If step is out of bound, set to 0
    if (step > this.state.stepCount - 1) {
      this.setState({activeStep: 0});
    } else {
      this.setState({activeStep: step});
    }
  };

  render() {
    const styles = {
      stepIcons: {
        position: 'relative',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        flexDirection: 'row',
        top: this.props.topOffset,
        // marginBottom: this.props.marginBottom,
      },
    };

    return (
      <>
        <View style={styles.stepIcons}>{this.renderStepIcons()}</View>
        {React.cloneElement(this.props.children[this.state.activeStep], {
          setActiveStep: this.setActiveStep,
          activeStep: this.state.activeStep,
          stepCount: this.state.stepCount,
        })}
      </>
    );
  }
}

ProgressSteps.propTypes = {
  isComplete: PropTypes.bool,
  activeStep: PropTypes.number,
  topOffset: PropTypes.number,
  marginBottom: PropTypes.number,
};

ProgressSteps.defaultProps = {
  isComplete: false,
  activeStep: 0,
  topOffset: 20,
  // marginBottom: 20,
};

export default ProgressSteps;
