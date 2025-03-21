import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ShippingDetails } from './CheckoutPage';

interface ShippingFormProps {
  onSubmit: (values: ShippingDetails) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      address: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      zipCode: Yup.string().required('Required'),
      phone: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
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
            type="text"
            id="lastName"
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
          type="email"
          id="email"
          {...formik.getFieldProps('email')}
          className="input-field"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          {...formik.getFieldProps('phone')}
          className="input-field"
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
        )}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          {...formik.getFieldProps('address')}
          className="input-field"
        />
        {formik.touched.address && formik.errors.address && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            {...formik.getFieldProps('city')}
            className="input-field"
          />
          {formik.touched.city && formik.errors.city && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.city}</div>
          )}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            id="state"
            {...formik.getFieldProps('state')}
            className="input-field"
          />
          {formik.touched.state && formik.errors.state && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.state}</div>
          )}
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <input
            type="text"
            id="zipCode"
            {...formik.getFieldProps('zipCode')}
            className="input-field"
          />
          {formik.touched.zipCode && formik.errors.zipCode && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.zipCode}</div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary w-full mt-6"
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default ShippingForm;
