import React, { useState } from 'react';

const AddVoucherForm = () => {
  const [voucherData, setVoucherData] = useState({
    voucher_code: '',
    is_used: false,
    discount: 0,
    expiry_date: '',
  });

  const apiUrl = 'http://localhost:3001/superadmin/addVoucher'; // Replace with your actual server URL

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVoucherData({
      ...voucherData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voucherData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Handle the success message
        // Optionally, you can reset the form or perform other actions after a successful submission.
      } else {
        console.error('Failed to add voucher');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Voucher Code:
        <input
          type="text"
          name="voucher_code"
          value={voucherData.voucher_code}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Is Used:
        <input
          type="checkbox"
          name="is_used"
          checked={voucherData.is_used}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Discount:
        <input
          type="number"
          name="discount"
          value={voucherData.discount}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Expiry Date:
        <input
          type="text" // You may want to use a date picker library for a better user experience
          name="expiry_date"
          value={voucherData.expiry_date}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <button type="submit">Add Voucher</button>
    </form>
  );
};

export default AddVoucherForm;