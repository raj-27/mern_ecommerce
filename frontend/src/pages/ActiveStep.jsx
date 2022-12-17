import { Container, Step, StepLabel, Stepper } from "@material-ui/core";
import React from "react";
import "./ActiveStep.scss";
const ActiveStep = ({ activeStep }) => {
  let steps = ["Shipping", "Confirm"];
  return (
    <div className="active-step">
      <Container maxWidth="lg">
        <Stepper activeStep={activeStep}>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
    </div>
  );
};

export default ActiveStep;
