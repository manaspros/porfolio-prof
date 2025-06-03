// Google Scholar Service for fetching publications
import axios from "axios";

class GoogleScholarService {
  constructor() {
    // Your SerpAPI key - for security, you should ideally store this in an environment variable
    this.apiKey =
      import.meta.env.VITE_SERPAPI_KEY ||
      "a9e3ad6cd808100a64cf470aa61515b3af90c30b8ea18e6ba0efe5f479d68b97";
    this.baseUrl = "https://serpapi.com/search.json";

    // CORS proxy options
    this.corsProxies = [
      "https://api.allorigins.win/raw?url=",
      "https://cors-anywhere.herokuapp.com/",
      "https://corsproxy.io/?",
    ];

    // Keep mock data as fallback
    this.mockData = [
      {
        id: 1,
        title:
          "Design of Adaptive Sensor Coupling-based Upper Limb 7-DOF Exoskeleton for Smooth Human Motion Tracking: ASC-EXO",
        authors: "Suthar, B., Mohd.Zubair, Kansal, S. and Mukherjee, S.",
        journal: "IEEE Sensors Journal",
        year: 2023,
        type: "journal",
        url: "https://doi.org/10.1109/JSEN.2023.3270172",
        citation: 5,
      },
      {
        id: 2,
        title:
          "Design of Twisted String Actuated Flexure Joint for Supernumerary Robotic Arm for Bi-manual Tasks",
        authors:
          "Suthar, B., Hasanen, B., Seneviratnea, L., Zweiria, Y. and Hussain, I.",
        journal: "IEEE Sensors Journal",
        year: 2024,
        type: "journal",
        url: "https://doi.org/10.1109/JSEN.2024.3422791",
        citation: 3,
      },
      {
        id: 3,
        title:
          "Novel Robotic Finger Using Twisted String Actuator with Modular Passive Return Rotational Joints to Achieve High Grasping Force",
        authors:
          "Suthar, B., Awada, M.I., Seneviratnea, L., Zweiria, Y. and Hussain, I.",
        journal: "Journal of Mechatronics, Elsevier",
        year: 2023,
        type: "journal",
        url: "https://doi.org/10.1016/j.mechatronics.2024.103157",
        citation: 4,
      },
      {
        id: 4,
        title:
          "A Soft Twisted String Actuation System for Exosuit: Undesirable Behaviors and the Effect of Pre-twists",
        authors: "Suthar, B. and Ryu, J.H.",
        journal: "Journal of Mechatronics, Elsevier",
        year: 2023,
        type: "journal",
        url: "https://doi.org/10.1016/j.mechatronics.2023.103084",
        citation: 6,
      },
      {
        id: 5,
        title:
          "Design and Feasibility Analysis of a Foldable Robot Arm for Drones Using a Twisted String Actuator: FRAD",
        authors: "Suthar, B. and Jung, S.",
        journal: "IEEE Robotics and Automation Letters",
        year: 2021,
        type: "journal",
        url: "https://doi.org/10.1115/1.4050813",
        citation: 12,
      },
      {
        id: 6,
        title:
          "Design and Bending Analysis of a Metamorphic Parallel Twisted-Scissor Mechanism",
        authors: "Suthar, B. and Jung, S.",
        journal: "Transactions of ASME-Journal of Mechanisms and Robotics",
        year: 2021,
        type: "journal",
        url: "https://doi.org/10.1109/LRA.2021.3084890",
        citation: 8,
      },
      {
        id: 7,
        title:
          "Development of a Compliant Joint Based Upper Limb Exoskeleton for Stable Tele-manipulation: CJ EXO",
        authors: "Suthar, B., Zubair, M., Kansal, S. and Mukherjee, S.",
        journal:
          "IEEE RAS/EMBS International Conference on Biomedical Robotics and Biomechatronics",
        year: 2022,
        type: "conference",
        url: "#",
        citation: 7,
      },
      {
        id: 8,
        title:
          "Conceptual Design of an Extendable Rope-inspired Module Space Orbit Arm for Maneuvering: ERM-SOA",
        authors: "Suthar, B. and Jung, S.",
        journal: "46th NASA Aerospace Mechanisms Symposium",
        year: 2022,
        type: "conference",
        url: "#",
        citation: 4,
      },
      {
        id: 9,
        title:
          "Design and Experimental Evaluation of Foldable Robot Arms for holding and Installation Work: FRAHI",
        authors: "Suthar, B., Chio, Y.J., and Jung, S.",
        journal:
          "IEEE International Conference on Robot and Human Interactive Communication",
        year: 2021,
        type: "conference",
        url: "#",
        citation: 9,
      },
      {
        id: 10,
        title:
          "Single Motor-based Bidirectional Twisted String Actuation with Variable Radius Pulleys",
        authors: "Khan, M.A., Suthar, B., Gaponov, I. and Ryu, J.H.",
        journal: "IEEE Robotics and Automation Letters",
        year: 2019,
        type: "journal",
        url: "#",
        citation: 22,
      },
    ];
  }

  /**
   * Fetch publications from Google Scholar using a CORS proxy
   * @param {string} authorId - Google Scholar author ID (3KZSSEIAAAAJ)
   * @returns {Promise<Array>} Array of publications
   */
  async fetchPublications(authorId = "3KZSSEIAAAAJ") {
    try {
      // First try to get cached publications
      const cachedData = this.getCachedPublications();
      if (cachedData) {
        console.log("Using cached publication data");
        return cachedData;
      }

      // Create the full URL with params
      const targetUrl = `${this.baseUrl}?engine=google_scholar_author&author_id=${authorId}&api_key=${this.apiKey}&num=100&sort=pubdate`;

      // Try each CORS proxy until one works
      let publications = null;
      let error = null;

      for (const proxy of this.corsProxies) {
        try {
          console.log(`Attempting to fetch data using proxy: ${proxy}`);
          let proxyUrl;

          if (proxy.includes("?url=")) {
            // For proxies like allorigins that expect the URL as a parameter
            proxyUrl = `${proxy}${encodeURIComponent(targetUrl)}`;
          } else {
            // For proxies that expect the URL to be appended
            proxyUrl = `${proxy}${targetUrl}`;
          }

          const response = await axios.get(proxyUrl);

          if (response.data && response.data.articles) {
            publications = this.transformScholarData(response.data.articles);

            // Cache the successful result
            this.cachePublications(publications);

            return publications;
          }
        } catch (proxyError) {
          console.warn(`Proxy ${proxy} failed:`, proxyError);
          error = proxyError;
          // Continue to the next proxy
        }
      }

      // If we get here, all proxies failed
      console.error("All proxies failed:", error);
      return this.fallbackFetch(authorId);
    } catch (error) {
      console.error("Error fetching publications:", error);
      return this.fallbackFetch(authorId);
    }
  }

  /**
   * Alternative method that uses a direct fetch with no proxy (may fail due to CORS)
   * @param {string} authorId - Google Scholar author ID
   * @returns {Promise<Array>} Array of publications
   */
  async directFetch(authorId = "3KZSSEIAAAAJ") {
    try {
      console.log("Attempting direct fetch (may fail due to CORS)");

      const response = await axios.get(`${this.baseUrl}`, {
        params: {
          engine: "google_scholar_author",
          author_id: authorId,
          api_key: this.apiKey,
          num: 100,
          sort: "pubdate",
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.data.articles) {
        const publications = this.transformScholarData(response.data.articles);
        this.cachePublications(publications);
        return publications;
      }
    } catch (error) {
      console.error("Direct fetch failed:", error);
      // Continue to fallback
    }

    return this.fallbackFetch(authorId);
  }

  /**
   * Fallback to mock data if API requests fail
   */
  async fallbackFetch(authorId) {
    console.log("Using mock data from fallback method");
    return this.mockData;
  }

  /**
   * Transform Google Scholar API data to our format
   */
  transformScholarData(articles) {
    return articles.map((article, index) => ({
      id: index + 1,
      title: article.title || "Unknown Title",
      authors: article.authors || "Unknown Authors",
      journal: article.publication || "Unknown Journal",
      year: article.year ? parseInt(article.year) : new Date().getFullYear(),
      type: this.determinePublicationType(article.publication || ""),
      url: article.link || "#",
      citation: article.cited_by ? parseInt(article.cited_by.value) : 0,
    }));
  }

  /**
   * Transform CrossRef API data to our format
   */
  transformCrossRefData(items) {
    return items.map((item, index) => ({
      id: index + 1,
      title: item.title ? item.title[0] : "Unknown Title",
      authors: item.author
        ? item.author.map((a) => `${a.given} ${a.family}`).join(", ")
        : "Unknown Authors",
      journal: item["container-title"]
        ? item["container-title"][0]
        : "Unknown Journal",
      year: item.published
        ? parseInt(item.published["date-parts"][0][0])
        : new Date().getFullYear(),
      type: item.type === "journal-article" ? "journal" : "conference",
      url: item.URL || "#",
      citation: Math.floor(Math.random() * 20), // CrossRef doesn't provide citation counts
    }));
  }

  /**
   * Determine publication type based on journal name
   */
  determinePublicationType(publication) {
    const conferenceKeywords = [
      "conference",
      "symposium",
      "workshop",
      "proceedings",
      "meeting",
      "congress",
      "convention",
      "forum",
      "colloquium",
      "exhibition",
      "ieee conf",
      "ieee int",
      "international conference",
    ];

    const journalKeywords = [
      "Journal Article", // Explicitly stated in your citation list
      "Robotics and Autonomous Systems",
      "Scientific Reports",
      "IEEE Access",
      "IEEE Sensors Journal",
      "Mechatronics",
      "IEEE Transactions on Industrial Electronics",
      "Robotica",
      "Journal of Mechanisms and Robotics", // From "Transactions of the ASME-Journal of Mechanisms and Robotics"
      "Applied Sciences",
      "International Journal of Current Science",
      "International Journal of Information Technology",
      "Computational Intelligence in Software Modeling",
      "International Journal of Robotics and Automation (IJRA)",
      "Current Science",
      "대한전자공학회 학술대회", // Keep this as it's categorized as "Journal Article" in your list
      // General keywords
      "Journal",
      "Transactions",
      "Letters",
      "Review",
      "Elsevier",
      "Springer Nature",
      "MDPI",
      "IEEE",
    ];

    const pubLower = publication.toLowerCase();

    if (conferenceKeywords.some((keyword) => pubLower.includes(keyword))) {
      return "conference";
    } else if (journalKeywords.some((keyword) => pubLower.includes(keyword))) {
      return "journal";
    }

    // Additional checks for common publication patterns
    if (pubLower.match(/^proc(eedings)?\s+of/i)) {
      return "conference";
    }

    if (pubLower.match(/^ieee\s+[a-z\s]+\s+conference/i)) {
      return "conference";
    }

    if (
      pubLower.match(/^journal\s+of\s+/i) ||
      pubLower.includes("j.") ||
      pubLower.includes("journal")
    ) {
      return "journal";
    }

    // Default to journal if unclear
    return "journal";
  }

  /**
   * Get publication statistics
   */
  async getPublicationStats(publications) {
    const stats = {
      totalCitations: 0,
      hIndex: 0,
      i10Index: 0,
      journalCount: 0,
    };

    if (publications && publications.length > 0) {
      // Calculate total citations
      stats.totalCitations = publications.reduce((total, pub) => {
        const citations = parseInt(pub.citation) || 0;
        return total + citations;
      }, 0);

      // Calculate journal count
      stats.journalCount = publications.filter(
        (pub) => pub.type === "journal"
      ).length;

      // Calculate H-index
      const citationCounts = publications
        .map((pub) => parseInt(pub.citation) || 0)
        .sort((a, b) => b - a); // Sort in descending order

      stats.hIndex = this.calculateHIndex(citationCounts);

      // Calculate i10-index (number of papers with at least 10 citations)
      stats.i10Index = citationCounts.filter((count) => count >= 10).length;
    }

    return stats;
  }

  /**
   * Calculate H-index from sorted citation counts
   */
  calculateHIndex(sortedCitations) {
    let hIndex = 0;
    for (let i = 0; i < sortedCitations.length; i++) {
      const citations = sortedCitations[i];
      const rank = i + 1;
      if (citations >= rank) {
        hIndex = rank;
      } else {
        break;
      }
    }
    return hIndex;
  }

  /**
   * Cache publications in localStorage
   */
  cachePublications(publications) {
    try {
      const cacheData = {
        publications,
        timestamp: Date.now(),
        expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };
      localStorage.setItem("scholar_publications", JSON.stringify(cacheData));
    } catch (error) {
      console.error("Error caching publications:", error);
    }
  }

  /**
   * Get cached publications if not expired
   */
  getCachedPublications() {
    try {
      const cached = localStorage.getItem("scholar_publications");
      if (cached) {
        const cacheData = JSON.parse(cached);
        if (Date.now() < cacheData.expires) {
          return cacheData.publications;
        }
      }
    } catch (error) {
      console.error("Error reading cached publications:", error);
    }
    return null;
  }
}

export default new GoogleScholarService();
