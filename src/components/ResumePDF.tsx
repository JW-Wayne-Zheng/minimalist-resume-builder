import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { ResumeData } from "../types/resume";
import { ReactNode } from "react";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 12,
    color: "#1a1a1a",
  },
  h2: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 10,
    color: "#2d2d2d",
    borderBottom: "1 solid #e0e0e0",
    paddingBottom: 4,
  },
  h3: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 8,
    color: "#404040",
  },
  paragraph: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 6,
    color: "#444",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  listItem: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 4,
    marginLeft: 16,
    color: "#444",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  codeBlock: {
    fontSize: 10,
    fontFamily: "Courier",
    backgroundColor: "#f5f5f5",
    padding: 8,
    marginVertical: 6,
    borderRadius: 4,
  },
  horizontalRule: {
    borderBottom: "1 solid #ccc",
    marginVertical: 10,
  },
});

interface ResumePDFProps {
  resumeData: ResumeData;
}

// Helper function to parse HTML and convert to PDF elements
const parseHTMLToElements = (html: string): ReactNode[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const elements: ReactNode[] = [];
  let key = 0;

  const processNode = (node: ChildNode): ReactNode | null => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      return text ? <Text key={key++}>{text}</Text> : null;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();
      const children: ReactNode[] = [];

      // Process child nodes
      element.childNodes.forEach(child => {
        const processed = processNode(child);
        if (processed) children.push(processed);
      });

      switch (tagName) {
        case 'h1':
          return <Text key={key++} style={styles.h1}>{element.textContent}</Text>;
        case 'h2':
          return <Text key={key++} style={styles.h2}>{element.textContent}</Text>;
        case 'h3':
          return <Text key={key++} style={styles.h3}>{element.textContent}</Text>;
        case 'p':
          return <Text key={key++} style={styles.paragraph}>{element.textContent}</Text>;
        case 'strong':
        case 'b':
          return <Text key={key++} style={styles.bold}>{element.textContent}</Text>;
        case 'em':
        case 'i':
          return <Text key={key++} style={styles.italic}>{element.textContent}</Text>;
        case 'ul':
        case 'ol':
          return (
            <View key={key++}>
              {Array.from(element.children).map((li, idx) => (
                <Text key={idx} style={styles.listItem}>
                  • {li.textContent}
                </Text>
              ))}
            </View>
          );
        case 'li':
          return <Text key={key++} style={styles.listItem}>• {element.textContent}</Text>;
        case 'code':
        case 'pre':
          return <Text key={key++} style={styles.codeBlock}>{element.textContent}</Text>;
        case 'hr':
          return <View key={key++} style={styles.horizontalRule} />;
        case 'br':
          return <Text key={key++}>{'\n'}</Text>;
        default:
          // For unknown tags, just render the text content
          if (element.textContent?.trim()) {
            return <Text key={key++} style={styles.paragraph}>{element.textContent}</Text>;
          }
          return null;
      }
    }

    return null;
  };

  // Process all body children
  doc.body.childNodes.forEach(node => {
    const processed = processNode(node);
    if (processed) elements.push(processed);
  });

  return elements;
};

const ResumePDF = ({ resumeData }: ResumePDFProps) => {
  const htmlContent = resumeData.htmlContent || '';
  const contentElements = htmlContent ? parseHTMLToElements(htmlContent) : null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {resumeData.profilePicture && (
          <Image
            src={resumeData.profilePicture}
            style={styles.profilePicture}
          />
        )}

        {/* Render parsed HTML content if available */}
        {contentElements ? (
          <View>{contentElements}</View>
        ) : (
          // Fallback to legacy format if no HTML content
          <>
            <Text style={styles.h1}>{resumeData.name}</Text>
            {resumeData.email && <Text style={styles.paragraph}>{resumeData.email}</Text>}
            {resumeData.phone && <Text style={styles.paragraph}>{resumeData.phone}</Text>}

            {resumeData.education && (
              <View>
                <Text style={styles.h2}>Education</Text>
                <Text style={styles.paragraph}>{resumeData.education}</Text>
              </View>
            )}

            {resumeData.experience && (
              <View>
                <Text style={styles.h2}>Experience</Text>
                <Text style={styles.paragraph}>{resumeData.experience}</Text>
              </View>
            )}

            {resumeData.skills && (
              <View>
                <Text style={styles.h2}>Skills</Text>
                <Text style={styles.paragraph}>{resumeData.skills}</Text>
              </View>
            )}
          </>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;
