import Chart from 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Container, Navbar, Row } from 'react-bootstrap';
import AdminNav from '../layout/AdminNav';
const AdminDashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalSellers, setTotalSellers] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [ordersByMonth, setOrdersByMonth] = useState({});
  const chartRef = useRef(null);
  const URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Fetch total number of orders
        const ordersResponse = await fetch(`${URL}/admin/all-orders`);
        const ordersData = await ordersResponse.json();
        setTotalOrders(ordersData.length);

        // Fetch total number of customers
        const customersResponse = await fetch(`${URL}/admin/all-customers`);
        const customersData = await customersResponse.json();
        setTotalCustomers(customersData.length);

        // Fetch total number of sellers
        const sellersResponse = await fetch(`${URL}/admin/all-sellers`);
        const sellersData = await sellersResponse.json();
        setTotalSellers(sellersData.length);

        // Calculate total sales
        const totalSalesAmount = await calculateTotalSales(ordersData);
        setTotalSales(totalSalesAmount);

        // Calculate orders by month
        const ordersByMonthData = calculateOrdersByMonth(ordersData);
        setOrdersByMonth(ordersByMonthData);

        // Render the chart after fetching data
        renderChart(ordersByMonthData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalSales = async (ordersData) => {
    let totalSalesAmount = 0;

    // Fetch prices for products in each order
    for (const order of ordersData) {
      // Assuming price is a variable in the orderSchema
      totalSalesAmount += order.price;
    }

    return totalSalesAmount;
  };
  const calculateOrdersByMonth = (ordersData) => {
    const ordersByMonthData = {};

    for (const order of ordersData) {
      const orderDate = new Date(order.order_date);
      const month = orderDate.getMonth();
      const year = orderDate.getFullYear();
      const key = `${year}-${month + 1}`; // Adding 1 because getMonth() returns 0-based month

      if (ordersByMonthData[key]) {
        ordersByMonthData[key]++;
      } else {
        ordersByMonthData[key] = 1;
      }
    }

    return ordersByMonthData;
  };
  const renderChart = (ordersByMonthData) => {
    const labels = Object.keys(ordersByMonthData);
    const data = Object.values(ordersByMonthData);

    // Destroy the existing Chart instance if it exists
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');


      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Orders by Month',
            data: data,
            backgroundColor: 'rgba(128,10, 128, 1)', // Adjust the color as needed
            borderColor: 'rgba(75, 192, 192, 1)', // Adjust the color as needed
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            x: {
              barPercentage: 0.1, // Set your desired bar width as a percentage
              categoryPercentage: 0.1,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      chartRef.current.style.width = '500px'; // Set your desired width
      chartRef.current.style.height = '500px';
    }
  };

  return (
    
    <Container className="mt-4" style={{ backgroundColor: '' }} >
      <AdminNav/>
      <Row className="justify-content-md-center">
        {/* Total Customers Card */}
        <Col md={5} lg={5} className="mb-4">
          <Card className="rounded-lg" style={{ borderColor: '', boxShadow: '-5px 8px 6px rgba(0, 0, 128, 0.1)', borderWidth: '3px' }}>
            <Card.Body className="text-center">
              {/* Image for Total Customers */}
              <img src="https://cdn-icons-png.flaticon.com/512/9685/9685001.png" alt="Customer" width="70" height="70" className="mb-2" />
              <h5>Total Customers</h5>
              <h2>{totalCustomers}</h2>
            </Card.Body>
          </Card>
        </Col>

        {/* Total Sellers Card */}
        <Col md={5} lg={5} className="mb-4">
          <Card className="rounded-lg" style={{ borderColor: '', boxShadow: '-5px 8px 6px rgba(0, 0, 128, 0.1)', borderWidth: '3px' }}>
            <Card.Body className="text-center">
              {/* Image for Total Sellers */}
              <img src="https://cdn-icons-png.flaticon.com/512/893/893201.png" alt="Seller" width="70" height="70" className="mb-2" />
              <h5>Total Sellers</h5>
              <h2>{totalSellers}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        {/* Total Orders Card */}
        <Col md={5} lg={5} className="mb-4">
          <Card className="rounded-lg" style={{ borderColor: '', boxShadow: '-5px 8px 6px rgba(0, 0, 128, 0.1)', borderWidth: '3px' }}>
            <Card.Body className="text-center">
              {/* Image for Total Orders */}
              <img src="https://cdn-icons-png.flaticon.com/512/8241/8241590.png" alt="Order" width="70" height="70" className="mb-2" />
              <h5>Total Orders</h5>
              <h2>{totalOrders}</h2>
            </Card.Body>
          </Card>
        </Col>

        {/* Total Sales Card */}
        <Col md={5} lg={5} className="mb-4">
          <Card className="rounded-lg" style={{ borderColor: '', boxShadow: '-5px 8px 6px rgba(0, 0, 128, 0.1)', borderWidth: '3px' }}>
            <Card.Body className="text-center">
              {/* Image for Total Sales */}
              <img src="https://www.freeiconspng.com/uploads/sales-icon-10.png" alt="Sales" width="70" height="70" className="mb-2" />
              <h5>Total Sales</h5>
              <h2>{totalSales} Pkr</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        {/* Chart Card */}
        <Col md={10} className="mb-4">
          <Card className="rounded-lg" style={{ borderColor: '', boxShadow: '-5px 8px 6px rgba(0, 0, 0, 0.1)', borderWidth: '3px', justifyContent: 'center', alignItems: 'center' }}>
            <Card.Body>
              {
                /*clear the canvas before rendering the chart*/
              }
              <canvas ref={chartRef} />

            </Card.Body>
          </Card>
        </Col>
      </Row>



      {/* Other components or sections */}
    </Container>
  );
};

export default AdminDashboard;
