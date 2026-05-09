import { 
  collection, 
  query, 
  getDocs, 
  getDoc, 
  doc, 
  orderBy, 
  limit, 
  where
} from "firebase/firestore";
import { db, auth } from "../lib/firebase.ts";
import { BlogPost, BLOG_POSTS } from "../data/blogs.ts";

const BLOGS_COLLECTION = "blogs";

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const blogsQuery = query(collection(db, BLOGS_COLLECTION), orderBy("createdAt", "desc"));
    let snapshot;
    try {
      snapshot = await getDocs(blogsQuery);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, BLOGS_COLLECTION);
      return BLOG_POSTS;
    }
    
    if (snapshot.empty) {
      return BLOG_POSTS;
    }
    
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as BlogPost));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return BLOG_POSTS;
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const docRef = doc(db, BLOGS_COLLECTION, slug);
    let docSnap;
    try {
      docSnap = await getDoc(docRef);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, `${BLOGS_COLLECTION}/${slug}`);
      return BLOG_POSTS.find(p => p.slug === slug) || null;
    }
    
    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        id: docSnap.id
      } as BlogPost;
    }

    const q = query(collection(db, BLOGS_COLLECTION), where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      return {
        ...snapshot.docs[0].data(),
        id: snapshot.docs[0].id
      } as BlogPost;
    }
    
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
