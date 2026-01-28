import { UserRole, AgentProfile, PendingUpdate } from './types';

// 1. Initial State (Source of Truth)
let currentRole: UserRole = 'agent';
let profile: AgentProfile = {
  id: "AGT-8829",
  fullName: "Ines Umuta", // Locked
  displayName: "Ines U.",
  avatarUrl: "https://i.pravatar.cc/150?u=ines"
};
let pendingUpdate: PendingUpdate | null = null;

// 2. DOM Elements (Strictly Typed)
const roleSelect = document.getElementById('roleSelect') as HTMLSelectElement;
const adminBar = document.getElementById('adminApprovalBar') as HTMLDivElement;
const modal = document.getElementById('profileModal') as HTMLDivElement;
const msgInput = document.getElementById('msgInput') as HTMLInputElement;
const messagesContainer = document.getElementById('messages') as HTMLDivElement;

// 3. Update UI Mode (Agent vs Admin)
const updateView = () => {
  currentRole = roleSelect.value as UserRole;
  // Admin bar only shows if there is a pending request and user is Admin
  adminBar.style.display = (currentRole === 'admin' && pendingUpdate) ? 'flex' : 'none';
};

// 4. Modal Logic
const toggleModal = (show: boolean) => {
  if (show) {
    (document.getElementById('agentIdField') as HTMLInputElement).value = profile.id;
    (document.getElementById('fullNameField') as HTMLInputElement).value = profile.fullName;
    (document.getElementById('editDisplayName') as HTMLInputElement).value = profile.displayName;
    (document.getElementById('editAvatarUrl') as HTMLInputElement).value = profile.avatarUrl;
    modal.style.display = 'block';
  } else {
    modal.style.display = 'none';
  }
};

// 5. Profile Update Logic
const submitUpdateRequest = () => {
  pendingUpdate = {
    displayName: (document.getElementById('editDisplayName') as HTMLInputElement).value,
    avatarUrl: (document.getElementById('editAvatarUrl') as HTMLInputElement).value
  };
  (document.getElementById('pendingBadge') as HTMLDivElement).style.display = 'inline-block';
  toggleModal(false);
  updateView();
};

const handleApproval = (approve: boolean) => {
  if (approve && pendingUpdate) {
    profile.displayName = pendingUpdate.displayName;
    profile.avatarUrl = pendingUpdate.avatarUrl;
    // Update Sidebar UI
    (document.getElementById('sidebarDisplayName') as HTMLDivElement).innerText = profile.displayName;
    (document.getElementById('sidebarAvatar') as HTMLImageElement).src = profile.avatarUrl;
  }
  pendingUpdate = null;
  (document.getElementById('pendingBadge') as HTMLDivElement).style.display = 'none';
  updateView();
};

// 6. Chat Logic
const sendMessage = () => {
  const text = msgInput.value.trim();
  if (!text) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = 'message agent-msg';
  msgDiv.innerHTML = `
    <img src="${profile.avatarUrl}" alt="Avatar">
    <div><strong>${profile.displayName}:</strong> ${text}</div>
  `;
  
  messagesContainer.appendChild(msgDiv);
  msgInput.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

// 7. Event Listeners
roleSelect.addEventListener('change', updateView);
document.getElementById('profileTrigger')?.addEventListener('click', () => toggleModal(true));
document.getElementById('closeModalBtn')?.addEventListener('click', () => toggleModal(false));
document.getElementById('submitProfileBtn')?.addEventListener('click', submitUpdateRequest);
document.getElementById('approveBtn')?.addEventListener('click', () => handleApproval(true));
document.getElementById('rejectBtn')?.addEventListener('click', () => handleApproval(false));
document.getElementById('sendBtn')?.addEventListener('click', sendMessage);
msgInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());
