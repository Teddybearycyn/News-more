import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

if (admin.apps.length === 0) {
  admin.initializeApp({
    projectId: "gen-lang-client-0344393891",
  });
}

const firestore = getFirestore("ai-studio-e1ebeb53-03c3-46eb-8c2b-7c4bfeeb0d47");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function addTenBlogs() {
  console.log("Starting generation of 10 high-performing SEO blogs...");

  const prompt = `Generate 10 unique, high-performing SEO blog posts for an IT Services and Technical Engineering company.
  Focus on trending keywords with high search volume (e.g., Cloud Migration, AI Automation, Cybersecurity, DevOps, Remote Infrastructure).
  
  Each post must have:
  - id: unique string
  - title: catchy SEO title
  - slug: url-friendly slug
  - excerpt: 2-3 sentence summary
  - content: Deep technical article in Markdown (approx 800 words)
  - date: Current date in format "Month DD, YYYY"
  - author: "AI SEO Master"
  - category: One of [IT Support, Engineering, Cloud, Security, Productivity]
  - image: "https://picsum.photos/seed/[slug]/1200/630"
  - keywords: Array of 5-8 relevant SEO keywords
  - faqs: Array of {question, answer} objects (3-5 per post)

  Return strictly as a JSON array of objects.`;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });

    const blogs = JSON.parse(result.text);
    console.log(`Generated ${blogs.length} blogs. Pushing to Firestore...`);

    const batch = firestore.batch();
    for (const blog of blogs) {
      const docRef = firestore.collection("blogs").doc(blog.id);
      batch.set(docRef, {
        ...blog,
        createdAt: admin.firestore.Timestamp.now()
      });
    }

    await batch.commit();
    console.log("Successfully added 10 SEO blogs to Firestore.");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error generating or saving blogs:", error.message);
    } else {
      console.error("Error generating or saving blogs:", error);
    }
  }
}

addTenBlogs();
