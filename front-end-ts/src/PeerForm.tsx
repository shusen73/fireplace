import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import { Button } from "@zendeskgarden/react-buttons";
import {
  Field,
  Label,
  Hint,
  Input,
  Message,
  InputGroup,
} from "@zendeskgarden/react-forms";

import { StyledPeerForm } from "./PeerForm.styled";

interface Props {
  localPeerId: string;
  onSubmit: (id: string) => void;
}
const PeerForm = ({ localPeerId, onSubmit }: Props) => {
  return (
    <StyledPeerForm>
      <Grid>
        <Formik
          initialValues={{
            localPeerId: localPeerId,
            remotePeerId: "",
          }}
          validationSchema={yup.object({
            remotePeerId: yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values.remotePeerId);
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col lg={6} offsetLg={3}>
                  <Field>
                    <Label>Your ID is:</Label>
                    <InputGroup>
                      <Input readOnly value={values.localPeerId} />
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(values.localPeerId);
                        }}
                      >
                        Copy
                      </Button>
                    </InputGroup>
                  </Field>{" "}
                </Col>
              </Row>
              <br />

              <Row>
                <Col lg={6} offsetLg={3}>
                  <Field>
                    <Label>Enter target peer's id:</Label>
                    <Input
                      name="remotePeerId"
                      onChange={handleChange}
                      value={values.remotePeerId}
                    />
                  </Field>{" "}
                </Col>
              </Row>
              <br />
              <Row>
                <Col textAlign="center">
                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </form>
          )}
        </Formik>
      </Grid>
    </StyledPeerForm>
  );
};

export default PeerForm;
