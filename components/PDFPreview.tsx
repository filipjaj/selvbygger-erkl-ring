"use client";

import {
  Document,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: { flexDirection: "column" },
  section: { margin: 10, padding: 10 },
  title: { fontSize: 18, textAlign: "center" },
  subtitle: { fontSize: 15, marginTop: 10 },
  text: { fontSize: 12, marginTop: 5 },
  // Add more styles as required
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Title Section */}
      <View style={styles.section}>
        <Text style={styles.title}></Text>
      </View>

      {/* Each subsequent section of the form goes here */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>[Section Heading]</Text>
        {/* Add Text components for each line/item in this section */}
        <Text style={styles.text}>[Item Description]</Text>
        {/* Repeat for each item */}
      </View>

      {/* Repeat View for each section of the form */}
      {/* ... */}

      {/* Signature Section */}
      <View style={styles.section}>
        <Text style={styles.text}>[Signature Field Description]</Text>
        {/* Add lines or space for signature */}
      </View>
    </Page>
  </Document>
);

// Component to render and download the PDF
const App = () => (
  <PDFViewer>
    <MyDocument />
  </PDFViewer>
);

export default App;
