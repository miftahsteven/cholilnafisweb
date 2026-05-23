export type AgentRouteInput = {
  message: string;
  agent?: 'general' | 'maktabah_syamilah';
  channel: 'web' | 'whatsapp';
  sessionId?: string;
  userId?: string;
  channelUserId?: string;
  userName?: string;
  userEmail?: string;
  metadata?: Record<string, any>;
};

export type ChatSourcePayload = {
  type: string;
  title?: string | null;
  url?: string | null;
  author?: string | null;
  chapter?: string | null;
  page?: number | null;
  volume?: number | null;
  excerpt?: string | null;
  referenceId?: string | null;
  metadata?: Record<string, any>;
};

export type AgentRouteResult = {
  success: boolean;
  agent: 'general' | 'maktabah_syamilah';
  channel: 'web' | 'whatsapp';
  language?: string;
  answer: string;
  sources?: ChatSourcePayload[];
  confidence?: number;
  error?: string;
  mode?: string;
  chatId?: string;
};

export interface KiAiAgent {
  handle(input: AgentRouteInput): Promise<AgentRouteResult>;
  stream?(input: AgentRouteInput): AsyncGenerator<string, void, unknown>;
}
