import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainImg from "../Assets/mainpage.jpg";

function OrderTracking() {
  const [orders, setOrders] = useState(
    (JSON.parse(localStorage.getItem("orders")) || []).sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )
  );

  const navigate = useNavigate();

  useEffect(() => {
    const updateOrderStatus = () => {
      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) => {
          let updatedStatus = order.status;
          let updatedTracking = {
            ...order,
            readyForPacking: order.readyForPacking,
            shipped: order.shipped,
            outForDelivery: order.outForDelivery,
            delivered: order.delivered,
          };

          if (updatedStatus === "Order Placed") {
            updatedTracking.status = "Shipped";
            updatedTracking.shipped = true; 
          } else if (updatedStatus === "Shipped") {
            updatedTracking.status = "Out for Delivery";
            updatedTracking.outForDelivery = true; 
          } else if (updatedStatus === "Out for Delivery") {
            updatedTracking.status = "Delivered";
            updatedTracking.delivered = true; 
          }

          return {
            ...updatedTracking,
            date: new Date().toLocaleString(),
          };
        });

        const sortedUpdatedOrders = [...updatedOrders].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        localStorage.setItem("orders", JSON.stringify(sortedUpdatedOrders));
        return sortedUpdatedOrders;
      });
    };

    const timer = setInterval(updateOrderStatus, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleReorder = (order) => {
    const newOrder = {
      ...order,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Order Placed',
      date: new Date().toLocaleString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      readyForPacking: false,
      shipped: false,
      outForDelivery: false,
      delivered: false,
      location: 'Warehouse',
    };
    const newOrdersList = [newOrder, ...orders];
    setOrders(newOrdersList);
    localStorage.setItem('orders', JSON.stringify(newOrdersList));
  };

  const handleResetOrders = () => {
    setOrders([]);
    localStorage.setItem("orders", JSON.stringify([]));
  };

  const handleContinueShopping = () => {
    navigate('/slicethefruits')
  }

  const handleViewOrderDetails = (order) => {
    navigate("/order-summary", { state: { order } });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h4" gutterBottom align="center">
          Orders
        </Typography>
        {orders.length === 0 ? (
          <Typography variant="body1" align="center">
            No orders placed yet.
          </Typography>
        ) : (
          <List>
            <Typography variant="h5" align="center" color="#ff0606cf">Congrats! Your Order Placed successfully</Typography>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <ListItem
                  alignItems="flex-start"
                  onClick={() => handleViewOrderDetails(order)}
                  style={{ cursor: "pointer" }}
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={order.image || MainImg}
                      alt="Order Item"
                      sx={{ width: 80, height: 80, marginRight: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Order ID: ${order.id}`}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Status: {order.status}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="text.secondary">
                          Ordered on: {order.date || "Date not available"}
                        </Typography>
                      </>
                    }
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleReorder(order);
                    }}
                  >
                    Reorder
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
        <Box justifyContent="space-between" display="flex">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleResetOrders}
          sx={{ marginTop: 2 }}
        >
          Reset Orders
        </Button>
        <Button
              onClick={handleContinueShopping}
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ marginTop: 2 }}
            >
              Continue Shopping
            </Button>
            </Box>
      </Paper>
    </Container>
  );
}

export default OrderTracking;
