const SESSION_KEY = "jl:auth:session";
const USERS_KEY = "jl:auth:users";

const demoUsers = [
  {
    id: "demo-seeker",
    name: "Alex Seeker",
    email: "seeker@demo.com",
    password: "password123",
    role: "seeker",
  },
  {
    id: "demo-employer",
    name: "Erica Employer",
    email: "employer@demo.com",
    password: "password123",
    role: "employer",
  },
];

const delay = (ms = 550) => new Promise((resolve) => setTimeout(resolve, ms));

const persist = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn("Unable to persist auth data", err);
  }
};

const read = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.warn("Unable to read auth data", err);
    return fallback;
  }
};

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const loadUsers = () => {
  const stored = read(USERS_KEY, []);
  const merged = [...demoUsers];

  stored.forEach((u) => {
    if (!merged.find((d) => normalizeEmail(d.email) === normalizeEmail(u.email))) {
      merged.push(u);
    }
  });

  return merged;
};

const persistUsers = (users) => {
  const nonDemo = users.filter(
    (u) =>
      !demoUsers.find(
        (demo) => normalizeEmail(demo.email) === normalizeEmail(u.email)
      )
  );
  persist(USERS_KEY, nonDemo);
};

const createToken = () =>
  `jl_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;

const setSession = (user) => {
  const token = createToken();
  const session = { user, token };
  persist(SESSION_KEY, session);
  return session;
};

export const getSession = () => read(SESSION_KEY, null);

export const logout = () => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (err) {
    console.warn("Unable to clear session", err);
  }
};

export async function register({ name, email, password, role = "seeker" }) {
  await delay();
  const users = loadUsers();
  const normalizedEmail = normalizeEmail(email);

  if (users.some((u) => normalizeEmail(u.email) === normalizedEmail)) {
    const error = new Error("An account with this email already exists.");
    error.code = "EMAIL_EXISTS";
    throw error;
  }

  if (!name || !normalizedEmail || !password) {
    const error = new Error("Please complete all fields.");
    error.code = "MISSING_FIELDS";
    throw error;
  }

  const user = {
    id: `user_${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
    role,
    createdAt: new Date().toISOString(),
  };

  const updated = [...users, user];
  persistUsers(updated);
  return setSession({ ...user, password: undefined });
}

export async function login({ email, password }) {
  await delay();
  const users = loadUsers();
  const normalizedEmail = normalizeEmail(email);

  const user = users.find((u) => normalizeEmail(u.email) === normalizedEmail);
  if (!user || user.password !== password) {
    const error = new Error("Invalid email or password.");
    error.code = "INVALID_CREDENTIALS";
    throw error;
  }

  return setSession({ ...user, password: undefined });
}

export const upsertDemoUsers = () => {
  const users = loadUsers();
  persistUsers(users);
};

