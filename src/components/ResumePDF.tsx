import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { ResumeData } from "../types/resume";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    marginBottom: 3,
    color: "#666",
  },
  section: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    borderBottom: "1 solid #eee",
    paddingBottom: 3,
  },
  content: {
    fontSize: 11,
    lineHeight: 1.5,
    color: "#444",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerText: {
    flex: 1,
  },
});

interface ResumePDFProps {
  resumeData: ResumeData;
}

const ResumePDF = ({ resumeData }: ResumePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <View style={styles.headerText}>
          <Text style={styles.name}>{resumeData.name}</Text>
          <Text style={styles.contact}>{resumeData.email}</Text>
          <Text style={styles.contact}>{resumeData.phone}</Text>
        </View>
        {resumeData.profilePicture && (
          <Image
            src={resumeData.profilePicture}
            style={styles.profilePicture}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        <Text style={styles.content}>{resumeData.education}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        <Text style={styles.content}>{resumeData.experience}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.content}>{resumeData.skills}</Text>
      </View>
    </Page>
  </Document>
);

export default ResumePDF;
