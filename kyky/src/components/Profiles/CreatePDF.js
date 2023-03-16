import React from 'react';
import { PDFViewer, Document, Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer';
import kykylogo from '../../image/kykylogo.png';

const CreatePDF = ({ order }) => {
  const styles = StyleSheet.create({
    pdf: {
      width: '500px',
      height: '700px'
    },
    page: {
      flexDirection: 'column',
      backgroundColor: 'white'
    },
    logo: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px 30px 30px',
      fontWeight: '20',
      fontSize: '5px',
      letterSpacing: '2px'
    },
    rows: {
      flexDirection: 'column',
      padding: '15px 30px 0',
      gap: '8px'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontWeight: '20',
      fontSize: '5px',
      letterSpacing: '2px'
    },
    total: {
      fontWeight: '80',
      fontSize: '7px',
      letterSpacing: '2px'
    }
  });

  const duration =
    parseInt(order.time.end.split(':')[0]) - parseInt(order.time.start.split(':')[0]);

  const MyDocument = () => (
    <Document>
      <Page size="A6" style={styles.page}>
        <View style={styles.logo}>
          <Image src={kykylogo} style={{ width: '33%' }} />
          <Text>{new Date().toLocaleString('fi-FI')}</Text>
        </View>
        <View style={styles.rows}>
          <View style={styles.row}>
            <Text>Order Id</Text>
            <Text>{order.orderId}</Text>
          </View>
        </View>
        <View style={styles.rows}>
          <View style={styles.row}>
            <Text>Buyer name</Text>
            <Text>{order.buyerName}</Text>
          </View>
          <View style={styles.row}>
            <Text>Buyer email</Text>
            <Text>{order.buyerMail}</Text>
          </View>
        </View>
        <View style={styles.rows}>
          <View style={styles.row}>
            <Text>Seller name</Text>
            <Text>{order.sellerName}</Text>
          </View>
          <View style={styles.row}>
            <Text>Seller title</Text>
            <Text>{order.jobTitle}</Text>
          </View>
        </View>
        <View style={styles.rows}>
          <View style={styles.row}>
            <Text>Date ordered</Text>
            <Text>{new Date(order.created.seconds * 1000).toLocaleDateString()}</Text>
          </View>
          <View style={styles.row}>
            <Text>Date completed</Text>
            <Text>{new Date(order.activityTime.seconds * 1000).toLocaleDateString()}</Text>
          </View>
          <View style={styles.row}>
            <Text>Order start time</Text>
            <Text>{order.time.start}</Text>
          </View>
          <View style={styles.row}>
            <Text>Order end time</Text>
            <Text>{order.time.end}</Text>
          </View>
        </View>
        <View style={styles.rows}>
          <View style={styles.row}>
            <Text>Duration</Text>
            <Text>{duration}</Text>
          </View>
          <View style={styles.row}>
            <Text>Price</Text>
            <Text>{order.price} €/h</Text>
          </View>
          <View style={styles.row}>
            <Text>-----------------------------------------------------------------</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.total}>{duration * parseInt(order.price)} €</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <PDFViewer style={styles.pdf}>
      <MyDocument />
    </PDFViewer>
  );
};

export default CreatePDF;
