import React, { useState } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Modal, Form, Col } from 'react-bootstrap';

import MyFormGroup from './MyFormGroup';
import Thump from '../../Common/Thumb';

const { Formik } = formik;

const withoutNumbers = /^([^0-9]*)$/;
const onlyNumbers = /^[0-9]*$/;

const schema = yup.object().shape({
  productName: yup
    .string()
    .required()
    .matches(withoutNumbers, 'Without numbers'),
  price: yup.string().required().matches(onlyNumbers, 'Only numbers!'),
  count: yup.string().required().matches(onlyNumbers, 'Only numbers!'),
  manufactureDate: yup
    .date()
    .required()
    .min(new Date('01-01-1970'), 'Too old')
    .max(new Date(), 'Cannot exist'),
  bestBefore: yup
    .date()
    .required()
    .min(yup.ref('manufactureDate'), 'Incorrect date'),
  productImage: yup
    .mixed()
    .test(
      'fileSize',
      'File size too large, max file size is 160 KB',
      (file) => {
        if (file) {
          return file.size <= FILE_SIZE;
        } else {
          return true;
        }
      }
    )
    .test(
      'fileFormat',
      'Unsupported Format',
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const NewProduct = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding new product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            initialValues={{
              productName: '',
              price: '',
              count: '',
              manufactureDate: '',
              bestBefore: '',
              productImage: null,
            }}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              touched,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                  <MyFormGroup
                    label="Product name"
                    placeholder="Enter product name"
                    type="text"
                    value={values.productName}
                    name="productName"
                    onChange={handleChange}
                    errors={errors.productName}
                    touched={touched.productName}
                  />
                </Form.Row>
                <Form.Row>
                  <MyFormGroup
                    label="Price"
                    placeholder="Enter Price"
                    type="number"
                    value={values.price}
                    name="price"
                    onChange={handleChange}
                    errors={errors.price}
                  />
                  <MyFormGroup
                    label="Count"
                    placeholder="Enter product count"
                    type="number"
                    value={values.count}
                    name="count"
                    onChange={handleChange}
                    errors={errors.count}
                  />
                </Form.Row>
                <Form.Row>
                  <MyFormGroup
                    label="Manufacture date"
                    placeholder="Enter manufacture date"
                    type="date"
                    value={values.manufactureDate}
                    name="manufactureDate"
                    onChange={handleChange}
                    errors={errors.manufactureDate}
                  />
                  <MyFormGroup
                    label="Best before"
                    placeholder="Enter best before date"
                    type="date"
                    value={values.bestBefore}
                    name="bestBefore"
                    onChange={handleChange}
                    errors={errors.bestBefore}
                  />
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.File
                      className="position-relative"
                      required
                      name="productImage"
                      label="productImage"
                      onChange={(event) => {
                        setFieldValue(
                          'productImage',
                          event.currentTarget.files[0]
                        );
                      }}
                      isInvalid={!!errors.productImage}
                      feedback={errors.productImage}
                      feedbackTooltip
                    />
                    <Thump file={values.productImage} />
                  </Form.Group>
                </Form.Row>

                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>

                  <Button
                    type="submit"
                    onClick={() => {
                      if (
                        errors &&
                        Object.keys(errors).length === 0 &&
                        errors.constructor === Object &&
                        values.productImage !== null
                      ) {
                        props.getBase64(values.productImage, (result) => {
                          props.addNewProduct({
                            productName: values.productName,
                            price: values.price,
                            count: values.count,
                            manufactureDate: values.manufactureDate,
                            bestBefore: values.bestBefore,
                            productImage: result,
                          });
                        });
                        handleClose();
                      }
                    }}
                  >
                    Add product
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewProduct;
