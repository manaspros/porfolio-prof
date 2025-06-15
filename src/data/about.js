// NOTE: This content is now managed via about.md file for easy editing by non-programmers
// To update content: Edit /src/data/about.md through GitHub's web interface
// This file serves as the data structure for the React component

export const aboutData = {
  title: "About", // Edit this in about.md under "Page Title"
  subtitle: "Assistant Professor, Next-Gen BIRD Lab", // Edit this in about.md under "Subtitle"
  paragraphs: [
    // Edit these in about.md under "Main Content Paragraphs"
    "Dr. Suthar is working as an Assistant Professor at the School of Artificial Intelligence and Data Science at IIT Jodhpur, India. He is also associated with the Next-Gen BIRD Lab, focusing on Bio-inspired Robotics and Artificial Intelligence research.",
    "With a Ph.D. in Wearable Robotics from Korea University of Technology and Education, Dr. Suthar has over 5 years of experience in Academia and Industrial Research across South Korea, UAE, and India. Before joining IIT Jodhpur, he was a Postdoctoral research fellow at the Robotic Centre at Khalifa University (UAE) and Korea Advanced Institute of Science and Technology (KAIST).",
    "Dr. Suthar's journey is encapsulated in the phrase \"Robot artist to Roboticist.\" His passion for robotics ignited during childhood, leading to a remarkable career with over 15 innovative robots developed in-house and 7 patents. He has received the prestigious Prime Minister Early Career Research Grant Award and has secured research funding of more than 2 crore INR."
  ],
  stats: {
    experience: {
      value: "5+", // Edit this in about.md under "Statistics > Years of Experience"
      label: "Years Research Experience"
    },
    international: {
      heading: "International Experience", // Edit this in about.md under "International Experience Heading"
      countries: [
        // Edit these in about.md under "Countries" - keep the flagClass codes the same
        { name: "South Korea", flagClass: "south-korea" },
        { name: "Singapore", flagClass: "singapore" },
        { name: "UAE", flagClass: "uae" },
        { name: "USA", flagClass: "usa" }
      ]
    }
  },
  links: [
    // Edit these in about.md under "Quick Links"
    { text: "Research Interests", href: "#research" },
    { text: "Key Publications", href: "#publications" },
    { text: "Collaboration Opportunities", href: "#contact" }
  ]
};

// TODO: In the future, consider implementing a markdown parser to automatically
// sync this data with the about.md file content
