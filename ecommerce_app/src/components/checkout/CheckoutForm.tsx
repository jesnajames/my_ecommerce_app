import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface CheckoutFormProps {
  onSubmit: (values: CheckoutFormValues) => void;
}

export interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      address: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      zipCode: Yup.string().required('Required'),
      cardNumber: Yup.string()
        .matches(/^\d{16}$/, 'Must be 16 digits')
        .required('Required'),
      expiryDate: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Must be MM/YY')
        .required('Required'),
      cvv: Yup.string()
        .matches(/^\d{3,4}$/, 'Must be 3 or 4 digits')
        .required('Required')
    }),
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            {...formik.getFieldProps('firstName')}
            className="input-field"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.firstName}</div>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            {...formik.getFieldProps('lastName')}
            className="input-field"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.lastName}</div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
          className="input-field"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        )}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          id="address"
          type="text"
          {...formik.getFieldProps('address')}
          className="input-field"
        />
        {formik.touched.address && formik.errors.address && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            id="city"
            type="text"
            {...formik.getFieldProps('city')}
            className="input-field"
          />
          {formik.touched.city && formik.errors.city && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.city}</div>
          )}
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <input
            id="zipCode"
            type="text"
            {...formik.getFieldProps('zipCode')}
            className="input-field"
          />
          {formik.touched.zipCode && formik.errors.zipCode && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.zipCode}</div>
          )}
        </div>
      </div>

      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              {...formik.getFieldProps('cardNumber')}
              className="input-field"
            />
            {formik.touched.cardNumber && formik.errors.cardNumber && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.cardNumber}</div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date (MM/YY)
              </label>
              <input
                id="expiryDate"
                type="text"
                {...formik.getFieldProps('expiryDate')}
                className="input-field"
              />
              {formik.touched.expiryDate && formik.errors.expiryDate && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.expiryDate}</div>
              )}
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                {...formik.getFieldProps('cvv')}
                className="input-field"
              />
              {formik.touched.cvv && formik.errors.cvv && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.cvv}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary w-full"
      >
        Place Order
      </button>
    </form>
  );
};

export default CheckoutForm;
