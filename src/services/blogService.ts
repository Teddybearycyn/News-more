import { 
  collection, 
  query, 
  getDocs, 
  getDoc, 
  doc, 
  orderBy, 
  limit, 
  where,
  Timestamp,
  setDoc
} from "firebase/firestore";
import { db } from "../lib/firebase.ts";
import { BlogPost, BLOG_POSTS } from "../data/blogs.ts";

const BLOGS_COLLECTION = "blogs";

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const blogsQuery = query(collection(db, BLOGS_COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(blogsQuery);
    
    if (snapshot.empty) {
      // If Firestore is empty, we return static data as a fallback
      // The server is responsible for seeding the database
      return BLOG_POSTS;
    }
    
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as BlogPost));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return BLOG_POSTS; // Fallback to static data
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // 1. Try to fetch directly by ID (since new logic uses slug as ID)
    const docRef = doc(db, BLOGS_COLLECTION, slug);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        id: docSnap.id
      } as BlogPost;
    }

    // 2. Fallback: Search by slug field (for older entries)
    const q = query(collection(db, BLOGS_COLLECTION), where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      return {
        ...snapshot.docs[0].data(),
        id: snapshot.docs[0].id
      } as BlogPost;
    }
    
    // 3. Last fallback: static data
    return BLOG_POSTS.find(p => p.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return BLOG_POSTS.find(p => p.slug === slug) || null;
  }
}

export async function isAIEnabled(): Promise<boolean> {
  try {
    const configDoc = await getDoc(doc(db, "config", "system"));
    return configDoc.exists() ? configDoc.data()?.aiEnabled !== false : true;
  } catch (error) {
    console.error("Error checking AI status:", error);
    return true;
  }
}
