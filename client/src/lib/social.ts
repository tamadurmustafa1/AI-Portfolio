export type SharedComment = {
  id: number;
  work_id: string;
  body: string;
  visitor_id: string;
  created_at: string;
};

export type SocialSnapshot = {
  comments: SharedComment[];
  likes: number;
  likedByVisitor: boolean;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
const VISITOR_KEY = "ai-portfolio-visitor-id";

export const socialReady = Boolean(SUPABASE_URL && SUPABASE_KEY);

function visitorId() {
  const existing = localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem(VISITOR_KEY, id);
  return id;
}

function headers(extra: Record<string, string> = {}) {
  return {
    apikey: SUPABASE_KEY || "",
    Authorization: `Bearer ${SUPABASE_KEY || ""}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

async function request(path: string, init?: RequestInit) {
  if (!socialReady) throw new Error("Social service is not configured");
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: headers((init?.headers || {}) as Record<string, string>),
  });
  if (!response.ok) throw new Error(await response.text());
  return response;
}

export async function loadSocial(workId: string): Promise<SocialSnapshot> {
  const encoded = encodeURIComponent(workId);
  const [commentsResponse, likesResponse, mineResponse] = await Promise.all([
    request(`portfolio_comments?select=id,work_id,body,visitor_id,created_at&work_id=eq.${encoded}&order=created_at.desc&limit=50`),
    request(`portfolio_likes?select=id&work_id=eq.${encoded}`),
    request(`portfolio_likes?select=id&work_id=eq.${encoded}&visitor_id=eq.${encodeURIComponent(visitorId())}&limit=1`),
  ]);
  return {
    comments: await commentsResponse.json(),
    likes: (await likesResponse.json()).length,
    likedByVisitor: (await mineResponse.json()).length > 0,
  };
}

export async function addComment(workId: string, body: string) {
  await request("portfolio_comments", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ work_id: workId, body: body.trim(), visitor_id: visitorId() }),
  });
}

export async function addLike(workId: string) {
  await request("portfolio_likes", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
    body: JSON.stringify({ work_id: workId, visitor_id: visitorId() }),
  });
}
