import { useState } from 'react';
import MainLayout from 'layouts/MainLayout';
import FormThemeWrapper from 'wrappers/FormThemeWrapper';
import { Form, Button, Breadcrumb } from 'react-bootstrap';
import RecaptchaThemeWrapper from 'wrappers/RecaptchaThemeWrapper';
import { useForm, ValidationError } from '@formspree/react';

const ContactPage = (): JSX.Element => {
  const [human, setHuman] = useState(false);
  const [state, handleSubmit] = useForm('mrgdpogd');

  const handleCaptcha = (value: boolean) => {
    value ? setHuman(true) : setHuman(false);
  };

  const handleSubmitButton = (data: any) => {
    if (human) {
      handleSubmit(data);
    } else {
      console.log('handleSubmit error');
    }
  };

  return (
    <MainLayout>
      <div className="homemade-container-sm mx-auto d-flex flex-column align-items-center">
        <div className="inner-container">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Contact</Breadcrumb.Item>
          </Breadcrumb>
          <hr className="m-0" />
          <h1 className="pt-4">Contact Me</h1>

          {!state.succeeded ? (
            <div className="w-100">
              I am always glad to hear from everyone!
              <FormThemeWrapper
                className="d-block"
                onSubmit={handleSubmitButton}
              >
                <Form.Group className="formGroup">
                  <Form.Label>Your name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter first/last name"
                    name="yourName"
                    required
                  />
                  <ValidationError
                    prefix="Name"
                    field="yourName"
                    errors={state.errors}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="formGroup">
                  <Form.Label>Email address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="_replyto"
                    placeholder="Enter email"
                    required
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 formGroup"
                  controlId="ControlTextarea1"
                >
                  <Form.Label className="formLabel">Message *</Form.Label>
                  <Form.Control
                    className="formControl"
                    as="textarea"
                    rows={3}
                    name="message"
                    required
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                </Form.Group>

                <div className="captchaCont d-flex">
                  <RecaptchaThemeWrapper
                    id="google-recaptcha"
                    className="mb-3 g-recaptcha"
                    sitekey="6Ldt17shAAAAAD8m4xqV0VA8qSRzJye0JQoo82NI"
                    onChange={handleCaptcha}
                  />
                </div>

                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
                <div className="w-100 d-flex justify-content-end">
                  <Button
                    className="sendButton"
                    type="submit"
                    disabled={state.submitting || !human}
                  >
                    Send
                  </Button>
                </div>
                <ValidationError errors={state.errors} />
              </FormThemeWrapper>
            </div>
          ) : (
            <p className="mt-4">
              Thanks for your message! You will receive a response in less than
              24 hours.
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;

export { Head } from 'components/Head';
