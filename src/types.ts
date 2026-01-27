// Defines the two possible views for the dashboard
export type UserRole = 'agent' | 'admin';

// The "Source of Truth" for the Agent
export interface AgentProfile {
  readonly id: string;       // 'readonly' makes this Locked in TypeScript
  readonly fullName: string; // 'readonly' makes this Locked in TypeScript
  displayName: string;       // Can be updated (Pending Approval)
  avatarUrl: string;         // Can be updated (Pending Approval)
}

// Data structure for an update request
export interface PendingUpdate {
  displayName: string;
  avatarUrl: string;
}

// Structure for chat messages
export interface ChatMessage {
  id: string;
  sender: 'customer' | 'agent';
  senderName: string;
  text: string;
  timestamp: string;
}
