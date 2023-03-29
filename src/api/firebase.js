import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { signUp } from './signup';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export async function login() {
  const result = await signInWithPopup(auth, provider).catch(console.error);
  console.log(result);
  const isNewUser = getAdditionalUserInfo(result).isNewUser;
  // 최초 가입 된 사용자만 db에 저장
  if (isNewUser) {
    signup(result);
  }
}

function signup(result) {
  const uuid = result.user.uid;
  const nick = result.user.displayName;
  console.log(uuid + ' ' + nick);
  signUp(uuid, nick);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    callback(user);
  });
}
