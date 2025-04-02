import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Row, Col, ListGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders, getOrderDetails } from '../actions/orderActions'

const OrderListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // State for modal
  const [showModal, setShowModal] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(null)

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders = [] } = orderList || {}

  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading: loadingDetails, error: errorDetails, order } = orderDetails || {}

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin || {}

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])

  const viewOrderDetailsHandler = (orderId) => {
    setSelectedOrderId(orderId)
    dispatch(getOrderDetails(orderId))
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedOrderId(null)
  }

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Button 
                    variant='light' 
                    className='btn-sm'
                    onClick={() => viewOrderDetailsHandler(order._id)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Order Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details {selectedOrderId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingDetails ? (
            <Loader />
          ) : errorDetails ? (
            <Message variant='danger'>{errorDetails}</Message>
          ) : order ? (
            <>
              <Row>
                <Col md={6}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h4>Shipping</h4>
                      <p>
                        <strong>Name: </strong> {order.user?.name}
                      </p>
                      <p>
                        <strong>Email: </strong> {order.user?.email}
                      </p>
                      <p>
                        <strong>Address: </strong>
                        {order.shippingAddress?.address}, {order.shippingAddress?.city}{' '}
                        {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
                      </p>
                      {order.isDelivered ? (
                        <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                      ) : (
                        <Message variant='danger'>Not Delivered</Message>
                      )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <h4>Payment Method</h4>
                      <p>
                        <strong>Method: </strong> {order.paymentMethod}
                      </p>
                      {order.isPaid ? (
                        <Message variant='success'>Paid on {order.paidAt}</Message>
                      ) : (
                        <Message variant='danger'>Not Paid</Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                <Col md={6}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h4>Order Summary</h4>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Items:</Col>
                        <Col>${order.itemsPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping:</Col>
                        <Col>${order.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax:</Col>
                        <Col>${order.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total:</Col>
                        <Col>${order.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>

              <ListGroup variant='flush' className='mt-3'>
                <ListGroup.Item>
                  <h4>Order Items</h4>
                </ListGroup.Item>
                {order.orderItems?.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems?.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>
                          <Col md={7}>
                            {item.name}
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = ${item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup>
            </>
          ) : (
            <Message>No order details found</Message>
          )}
        </Modal.Body>
        <Modal.Footer>
          {userInfo && userInfo.isAdmin && order && !order.isDelivered && (
            <Button variant='success' onClick={() => alert('Mark as delivered feature will be implemented')}>
              Mark As Delivered
            </Button>
          )}
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default OrderListScreen
